# Anime Motion Fighter mechanics audit

## Why the current combat feels wrong

The current camera loop treats almost any sufficiently fast hand or foot movement as an attack. It does not require the movement to be directed toward the opponent, does not require the limb to be extended from a neutral position, and does not provide a real wind-up-to-contact decision. The collision check then uses a generous 3D distance gate around the opponent, so the player can receive a hit result without feeling that they intentionally reached the target.

The game also has different rules in different paths. Camera mode uses velocity plus a broad spatial distance check, manual mode directly executes punch and kick actions, and two-person mode uses landmark torso boxes. This makes the same gesture mean different things depending on the selected mode. Blocking is understandable in two-person mode and manual mode, but camera mode does not yet give the player a reliable defensive action.

## Next mechanical contract

The first camera duel should recognize **intent**, not just motion. A hand or foot must begin from a neutral position, extend toward the opponent’s side of the arena, cross an impact gate, and then enter a short recovery window. A movement that is fast but retracts, travels sideways, or never reaches the extension gate is a miss or movement—not a free hit.

Every strike should move through four readable stages: READY, WIND-UP, CONTACT or MISS, and RECOVERY. Only the transition into CONTACT can deal damage. A blocked or invalid movement must not silently damage either fighter. The existing manual fallback and two-person landmark-box mode remain supported and are not removed.

## Acceptance checks

A stationary pose must never score. A fast movement away from the opponent must not score. One forward extension must produce at most one contact. Returning to neutral must re-arm the limb. A camera permission failure must still leave manual controls usable. The player should be able to explain why a result occurred by reading the visible combat phase.

## Browser verification

The new opening and fighter-selection flow load without visible runtime failure. The player-facing promise is clearer, but the selection screen still reveals the central product risk: the game advertises hand/foot contact combat, while the camera implementation previously recognized raw movement plus a broad spatial distance gate. The next mechanics patch therefore prioritizes intent gating over additional modes, characters, or effects. Existing mode choices and camera preferences remain in place.

## Arena verification

After entering a fresh arena, both fighters remained at full health and the center state read “STEP INTO FRAME OR USE MANUAL,” confirming the readiness gate still works. The shared arena framing kept both fighters readable. Opening Manual Controls exposed the existing P1/P2 action controls without removing camera or view preferences, confirming the fallback path remains available while camera mechanics are tightened.

## Defensive response

The camera duel now recognizes a simple guard posture: both hands raised above the shoulders holds the player in GUARD and displays “GUARD — HOLD YOUR GROUND.” This gives the player a clear answer to the AI telegraph without adding a complicated evade system. The posture is intentionally conservative so ordinary arm movement does not silently become a shield.
