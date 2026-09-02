// ===================== CAMERA ONBOARDING =====================
let onboardingShown = false;
function showCameraOnboarding() {
  if (onboardingShown) return;
  onboardingShown = true;

  // Create onboarding overlay on camera preview
  const panel = document.getElementById('cameraFeedPanel');
  if (!panel) return;

  const guide = document.createElement('div');
  guide.id = 'cameraOnboarding';
  guide.style.cssText = 'position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(2,6,23,0.8);border-radius:14px;padding:12px;text-align:center;animation:fadeIn 0.5s ease;';
  guide.innerHTML = `
    <div style="font-family:Orbitron;font-size:10px;color:#38bdf8;letter-spacing:0.1em;margin-bottom:8px;">WEBCAM GUIDE</div>
    <div style="font-size:11px;color:#cbd5e1;line-height:1.5;max-width:200px;">
      <div style="margin-bottom:6px;">👋 <strong style="color:#38bdf8;">Stand back</strong> until you see your full body</div>
      <div style="margin-bottom:6px;">🎯 <strong style="color:#10b981;">Green dots</strong> = body parts detected</div>
      <div style="margin-bottom:6px;">🔴 <strong style="color:#ef4444;">Red dots</strong> = move into view</div>
      <div style="margin-bottom:6px;">👊 <strong style="color:#fbbf24;">Punch forward</strong> to attack</div>
      <div>🛡️ <strong style="color:#818cf8;">Hands up</strong> to guard</div>
    </div>
    <button onclick="this.parentElement.remove()" style="margin-top:10px;padding:6px 16px;background:rgba(56,189,248,0.2);border:1px solid rgba(56,189,248,0.4);border-radius:8px;color:#38bdf8;font-family:Orbitron;font-size:9px;cursor:pointer;letter-spacing:0.05em;">GOT IT</button>
  `;
  panel.appendChild(guide);

  // Auto-dismiss after 8 seconds
  setTimeout(() => { guide.remove(); }, 8000);
}
