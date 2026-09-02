// ===================== COMBAT =====================
function setPortraitState(side, state, duration = 360) {
  const el = document.getElementById(side === 'p1' ? 'p1Portrait' : 'p2Portrait');
  if (!el) return;
  clearTimeout(el._stateTimer);
  el.dataset.state = state;
  if (state !== 'ready') el._stateTimer = setTimeout(() => { el.dataset.state = 'ready'; }, duration);
}

function beginCombatAttack(attackerNum, type) {
  if (gameState !== 'PLAYING' || roundLocked) return false;
  const actor = attackerNum === 1 ? player : ai;
  const rule = COMBAT_RULES[type];
  if (!rule) return false;
  const now = performance.now();
  if (now < actor.attackLockUntil) {
    if (attackerNum === 1) setCombatPhase('RECOVERY', 'RECOVERY — WAIT...', 'text-slate-400');
    return false;
  }
  actor.lastAttackTime = now;
  actor.attackLockUntil = now + rule.cooldown;
  actor.stance = type;
  setPortraitState(attackerNum === 1 ? 'p1' : 'p2', 'attack', Math.min(320, rule.cooldown));
  setTimeout(() => {
    if (actor.stance === type && !actor.isGuarding && !actor.isCrouching) actor.stance = 'READY';
  }, Math.min(260, rule.cooldown - 40));
  return true;
}

function incrementCombo() {
  combo++;
  const el = document.getElementById('comboDisplay');
  const numEl = document.getElementById('comboNumber');
  el.classList.add('active');
  numEl.textContent = combo;
  sound.playCombo(combo);
  clearTimeout(comboTimer);
  comboTimer = setTimeout(() => { combo = 0; el.classList.remove('active'); }, 1800);
}

function triggerHitStop(frames) { hitStopFrames = Math.max(hitStopFrames, frames); }
function applyKnockback(target, attackerIsP1, amount) { target.knockback = amount * (attackerIsP1 ? 1 : -1); }

function executePlayerPunch(attackerNum, damageMultiplier = 1.0) {
  if (!beginCombatAttack(attackerNum, 'PUNCH')) return;
  sound.playPunch();
  const isP1 = attackerNum === 1;
  const target = isP1 ? ai : player;
  const attackerChar = isP1 ? selectedP1Char : selectedP2Char;
  if (isP1) { incrementCombo(); ai.history.PUNCH = (ai.history.PUNCH || 0) + 1; }
  const rule = COMBAT_RULES.PUNCH;
  if (isP1) playerScore += 1; else aiScore += 1;
  let damage = rule.damage * damageMultiplier;
  const counterReady = isP1 && player.counterUntil > performance.now();
  if (counterReady) { damage = rule.counterDamage * damageMultiplier; player.counterUntil = 0; setCombatPhase('COUNTER', 'COUNTER! +' + Math.ceil(damage), 'text-amber-300'); }
  // Combo damage multiplier: +5% per combo hit (caps at+50%)
  if (isP1 && combo > 1) damage *= 1 + Math.min(combo - 1, 10) * 0.05;

  if (target === player && Math.abs(player.dodgeZ) > 0.75 && !target.isGuarding) {
    setCombatPhase('DODGE', 'DODGED!', 'text-lime-300');
    addFloatingText('DODGED!', 0.3, 0.4, '#a3e635');
    updateHud(); checkWinLoss(); return;
  }
  if (target.isGuarding) {
    damage = 0; target.ki = Math.min(100, target.ki + rule.guardKi); sound.playBlock();
    setPortraitState(isP1 ? 'p2' : 'p1', 'guard', 520);
    create3DHitSparks(target.x, 1.7, 0, 0x93c5fd, 8);
    addFloatingText('BLOCKED', isP1 ? 0.7 : 0.3, 0.4, '#38bdf8');
    if (target === player) { player.counterUntil = performance.now() + 700; setCombatPhase('BLOCK', 'BLOCKED — COUNTER READY', 'text-indigo-400'); }
    else setCombatPhase('BLOCK', 'AI BLOCKED', 'text-indigo-400');
    triggerHitStop(3);
  } else {
    setCombatPhase('CONTACT', '-' + Math.ceil(damage) + ' HP', 'text-emerald-400');
    sound.playHit(); target.hp = Math.max(0, target.hp - damage);
    setPortraitState(isP1 ? 'p2' : 'p1', 'hit');
    create3DHitSparks(target.x, 1.7, 0, attackerChar.colorHex, 14);
    addFloatingText('-' + Math.ceil(damage), isP1 ? 0.7 : 0.3, 0.4, '#f43f5e');
    target.hitFlash = 1; applyKnockback(target, isP1, 0.18); triggerHitStop(4); flashScreen(0.08);
    speedLinesActive = true; speedLinesTimer = 8;
  }
  updateHud(); checkWinLoss();
}

function executePlayerKick(attackerNum, damageMultiplier = 1.0) {
  if (!beginCombatAttack(attackerNum, 'KICK')) return;
  sound.playKick();
  const isP1 = attackerNum === 1;
  const target = isP1 ? ai : player;
  const attackerChar = isP1 ? selectedP1Char : selectedP2Char;
  if (isP1) { incrementCombo(); ai.history.KICK = (ai.history.KICK || 0) + 1; }
  const rule = COMBAT_RULES.KICK;
  if (isP1) playerScore += 2; else aiScore += 2;
  let damage = rule.damage * damageMultiplier;
  const counterReady = isP1 && player.counterUntil > performance.now();
  if (counterReady) { damage = rule.counterDamage * damageMultiplier; player.counterUntil = 0; setCombatPhase('COUNTER', 'COUNTER KICK! +' + Math.ceil(damage), 'text-amber-300'); }
  // Combo damage multiplier: +5% per combo hit (caps at+50%)
  if (isP1 && combo > 1) damage *= 1 + Math.min(combo - 1, 10) * 0.05;

  if (target === player && Math.abs(player.dodgeZ) > 0.75 && !target.isGuarding) {
    setCombatPhase('DODGE', 'DODGED!', 'text-lime-300');
    addFloatingText('DODGED!', 0.3, 0.4, '#a3e635');
    updateHud(); checkWinLoss(); return;
  }
  if (target.isGuarding) {
    damage = 0; target.ki = Math.min(100, target.ki + rule.guardKi); sound.playBlock();
    setPortraitState(isP1 ? 'p2' : 'p1', 'guard', 520);
    create3DHitSparks(target.x, 1.7, 0, 0x93c5fd, 10);
    addFloatingText('BLOCKED', isP1 ? 0.7 : 0.3, 0.4, '#38bdf8');
    if (target === player) { player.counterUntil = performance.now() + 700; setCombatPhase('BLOCK', 'BLOCKED — COUNTER READY', 'text-indigo-400'); }
    else setCombatPhase('BLOCK', 'AI BLOCKED', 'text-indigo-400');
    triggerHitStop(4);
  } else {
    setCombatPhase('CONTACT', '-' + Math.ceil(damage) + ' KICK!', 'text-emerald-400');
    sound.playHit(); target.hp = Math.max(0, target.hp - damage);
    setPortraitState(isP1 ? 'p2' : 'p1', 'hit');
    create3DHitSparks(target.x, 1.7, 0, attackerChar.colorHex, 20);
    addFloatingText('-' + Math.ceil(damage) + ' KICK!', isP1 ? 0.7 : 0.3, 0.4, '#10b981');
    target.hitFlash = 1; applyKnockback(target, isP1, 0.3); triggerHitStop(6); flashScreen(0.14); triggerImpactFrame();
    speedLinesActive = true; speedLinesTimer = 12;
  }
  updateHud(); checkWinLoss();
}

function executePlayerSuper(attackerNum) {
  if (!beginCombatAttack(attackerNum, 'SUPER')) return;
  const isP1 = attackerNum === 1;
  const attacker = isP1 ? player : ai;
  const target = isP1 ? ai : player;
  const attackerChar = isP1 ? selectedP1Char : selectedP2Char;
  attacker.ki = 0; sound.playBeam();
  triggerCharacterSuperFX(attackerChar, attacker.x, target.x);
  speedLinesActive = true; speedLinesTimer = 30;
  triggerHitStop(8); flashScreen(0.22); triggerImpactFrame(); triggerSlowMotion(600);
  let damage = COMBAT_RULES.SUPER.damage;

  if (target.isCrouching) {
    setCombatPhase('DODGE', 'DUCKED THE SUPER!', 'text-lime-300');
    addFloatingText('DUCKED!', isP1 ? 0.7 : 0.3, 0.4, '#a855f7');
    damage = 0;
  } else if (target.isGuarding) {
    setCombatPhase('BLOCK', 'SUPER BLOCKED!', 'text-indigo-400');
    damage = 0; target.ki = Math.min(100, target.ki + 15); sound.playBlock();
    addFloatingText('BLOCKED +15 KI', isP1 ? 0.7 : 0.3, 0.4, '#38bdf8');
    if (target === player) player.counterUntil = performance.now() + 900;
  } else {
    setCombatPhase('CONTACT', attackerChar.superName + '! -' + damage, 'text-amber-400');
    addFloatingText('-' + damage + ' ' + attackerChar.superName + '!', isP1 ? 0.7 : 0.3, 0.4, '#f43f5e');
    target.hitFlash = 1; applyKnockback(target, isP1, 0.5);
  }
  target.hp = Math.max(0, target.hp - damage);
  updateHud(); checkWinLoss();
}
