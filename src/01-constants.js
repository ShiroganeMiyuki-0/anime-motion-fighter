// ===================== CONSTANTS =====================
const CHARACTERS = {
  GONE:    { id:'GONE',    name:'G.ONE',    superName:'HART PLASMA BEAM',  colorHex:0x00e5ff, auraHex:0x38bdf8, desc:'Cyber HART Core Suit',     hairStyle:'HELMET' },
  KAKAROT: { id:'KAKAROT', name:'KAKAROT',  superName:'KAMEHA BLAST',     colorHex:0xeab308, auraHex:0xfef08a, desc:'Saiyan Martial Artist',    hairStyle:'SPIKY' },
  SHINOBI: { id:'SHINOBI', name:'SHINOBI',  superName:'RASENGAN SPHERE',  colorHex:0xf97316, auraHex:0xfdba74, desc:'Ninja Master',             hairStyle:'NINJA' },
  VOIDLORD:{ id:'VOIDLORD',name:'VOID LORD', superName:'HOLLOW PURPLE',   colorHex:0xa855f7, auraHex:0xc084fc, desc:'Infinity Sorcerer',        hairStyle:'WHITE' },
  RAONE:   { id:'RAONE',   name:'RA.ONE',   superName:'HART OVERDRIVE',   colorHex:0xff0055, auraHex:0xf43f5e, desc:'Dark Cyber Demon',         hairStyle:'HORNS' }
};

const COMBAT_RULES = {
  PUNCH: { damage:12, counterDamage:18, guardKi:8,  knockback:0.18, cooldown:330, hitStop:4, label:'PUNCH' },
  KICK:  { damage:22, counterDamage:30, guardKi:10, knockback:0.30, cooldown:420, hitStop:6, label:'KICK' },
  SUPER: { damage:45, cooldown:750, hitStop:8, label:'SUPER' }
};

const THREAT_TIERS = ['MINION BOT','ELITE GUARD','SHADOW ACE','OVERLORD PRIME','APEX ANNIHILATOR'];
function tierName(lvl) { return THREAT_TIERS[Math.min(lvl-1, THREAT_TIERS.length-1)]; }

const GAME_MODES = [
  { id:'1P',     name:'Solo vs AI',       icon:'fa-robot',          color:'cyan',    desc:'Fight an adaptive AI opponent with camera or keyboard' },
  { id:'2P',     name:'Local Versus',     icon:'fa-user-ninja',     color:'rose',    desc:'One camera player vs one keyboard player' },
  { id:'CAM2P',  name:'Shared Camera',    icon:'fa-people-arrows',  color:'emerald', desc:'Two players share one camera — limb contact blocks' },
  // Wizard Duel and Shooting Mode are listed in the modal but have no
  // game-loop implementation. They appear disabled so the user does not
  // think they're broken modes that silently fall back to Solo vs AI.
  { id:'WIZARD',  name:'Wizard Duel',     icon:'fa-wand-sparkles',  color:'purple',  desc:'Voice-controlled combat (coming soon)',   disabled: true },
  { id:'SHOOTING',name:'Shooting Mode',   icon:'fa-crosshairs',     color:'orange',  desc:'Energy-shot combat (coming soon)',         disabled: true },
];
