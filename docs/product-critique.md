
## Live arena observation

In the live arena, split-screen is enabled by default and the camera framing places oversized fighter meshes in the foreground, partially obscuring the opponent. The result looks like a debug scene rather than a readable duel. The HUD is dense, the live-camera panel is visually weak, and the central interaction does not communicate a clear “ready / attack / block / recovery” rhythm. A single shared arena camera should be the default, with split POV retained as an optional preference. The fighters need more disciplined framing and spacing so the player can read both bodies and the contact zone at once.

## First redesign verification

After the first presentation patch, the opening frame is calmer and the onboarding copy is more player-oriented. The shared arena is now the default rather than split POV, and the camera monitor is demoted until a camera is actually active. The technical controls remain visible in the wide header, so the next refinement should group or collapse those controls into an Arena Settings surface while preserving access.

## Shared-arena verification

The single-arena camera is substantially more readable than the previous split POV: both fighters are visible at a sensible distance and the central contact space is clear. However, the scene still feels passive because the first visible combat event is an unexplained damage label and the player has no strong central instruction or stateful attack rhythm. The next mechanic patch should make readiness, strike intent, hit, block, and recovery explicit in the feedback layer.

## Fairness verification

After a fresh reload, the match begins with both fighters at full health and the center prompt “STEP INTO FRAME OR USE MANUAL.” The AI waits until the player becomes ready, fixing the earlier product-breaking behavior where the opponent could damage or defeat the player during setup. This makes the first interaction fair and understandable.
