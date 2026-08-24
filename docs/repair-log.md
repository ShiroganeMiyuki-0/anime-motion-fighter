# Repair log

Targeted fixes applied to `index.html` without rewriting the game logic.
Each item was found by reading the file end-to-end and is documented here
so future passes don't re-investigate the same areas.

## Bugs fixed

- **`drawSkeletonOverlay` glow alpha was a silent no-op.**
  The original code did
  `pt.color.replace(')', ', 0.3)').replace('rgb', 'rgba')` to dim the
  landmark glow. The `pt.color` strings are hex (`#38bdf8`, etc.), so the
  `.replace(')', …)` never matched and the glow drew at full opacity,
  making the camera-preview dots look harsh. Added a `hexToRgba` helper
  and used it directly.

- **`playKOSequence` had a dead ternary.**
  `koText.textContent = playerWon ? 'K.O.' : 'K.O.';` — both branches
  returned the same string. Collapsed to a single assignment; the colour
  branch below it already does the playerWon-aware work.

- **Phase reasons were missing entries used in the code.**
  `PHASE_REASONS` was missing `COUNTER`, `AI_GUARD`, and `AI_BLOCK`, so
  the explainer sub-text was blank during those phases. Added them.

- **Stale `speedMetric` write could throw.**
  `processPose` did `document.getElementById('speedMetric').textContent = …`
  with no null check. The element is present in `index.html`, but the
  guard is cheap and removes a sharp edge if the markup is ever trimmed.

- **`fxCanvas` was re-sized every frame.**
  Reassigning `width` / `height` clears the canvas and resets 2D context
  state. Now it only resizes when `clientWidth` / `clientHeight` actually
  change.

## Honest UI

- **Wizard Duel and Shooting Mode are listed in the mode grid but have
  no game-loop implementation.** Selecting them silently fell back to
  `1P` while showing descriptions that promised voice / shooting combat.
  Both are now marked `disabled: true`, get a `SOON` badge, render at
  50% opacity, and cannot be selected. The original cards' description
  text is replaced with a "(coming soon)" line so the UI does not lie.
  Re-enable by flipping `disabled: false` and writing the actual mode
  logic.

- **Usability observer panel from `docs/usability-test.md` is now
  implemented.** Append `?test=1` to the URL and a small panel appears
  in the bottom-left with a **RECORD** toggle and an **EXPORT LOG**
  button. Events captured: `observer_start`, `observer_stop`,
  `match_start`, `calibration_start`, and every `setCombatPhase` call.
  The export is a JSON download; nothing leaves the page until you
  click export.

## Things deliberately not changed

- The 2 600-line single-file structure, the global `let` state, and the
  inline `onclick` attributes are all kept as-is. Refactoring them is a
  separate project and would risk regressing a working game.
- The `?test=1` panel is intentionally minimal — record + export only,
  no live graphs, no camera/telemetry capture.
- The Tailwind CDN script and the MediaPipe CDN scripts are kept; this
  repair pass is not a build-system overhaul.

## Quick verification

```sh
python3 -m http.server 8765
# open http://127.0.0.1:8765/
```

- The mode grid now shows `SOON` badges on Wizard Duel and Shooting
  Mode, and clicking them does nothing.
- The skeleton overlay on the camera preview now has a soft glow
  around each tracked landmark instead of a hard fill.
- Append `?test=1` and the observer panel appears bottom-left.
