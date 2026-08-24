# ⚡ ANIME MOTION FIGHTER

**3D body-controlled fighting game — your body is the controller.**

Play in your browser with webcam motion tracking, keyboard controls, or mobile touch buttons. Fight an adaptive AI opponent, challenge a friend in local multiplayer, or cast voice-controlled spells in Wizard Mode.

🎮 **[Play Now](https://anime-motion-fighter.vercel.app)**

---

## ✨ Features

- **Webcam Motion Tracking** — Uses MediaPipe Pose to track your body movements in real-time. Punch, kick, guard, and charge by moving your actual body.
- **Adaptive AI** — The AI opponent reads your move patterns and counters your strategy. Mix up your attacks to win.
- **Multiple Game Modes** — Solo vs AI, Local Versus, Shared Camera 2P, Wizard Spell Duel, and Shooting Mode.
- **5 Unique Fighters** — Choose from G.ONE, KAKAROT, SHINOBI, VOID LORD, and RA.ONE, each with unique super attacks.
- **3D Arena** — Full Three.js-powered 3D environment with toon shading, particle effects, and dynamic camera angles.
- **Mobile Touch Controls** — On-screen buttons for phone and tablet players.
- **Keyboard Fallback** — Full keyboard controls when camera isn't available.
- **Best-of-3 Rounds** — Structured match play with escalating difficulty.
- **Ki System** — Charge energy to unleash devastating super beam attacks.
- **Counter System** — Successful guards open a counter-attack window for bonus damage.

---

## 🎮 Controls

### Keyboard (Player 1)
| Key | Action |
|-----|--------|
| `J` | Punch |
| `I` | Kick |
| `K` | Guard |
| `S` | Duck / Crouch |
| `L` | Charge Ki |
| `Space` | Super Attack (requires 100% Ki) |

### Keyboard (Player 2)
| Key | Action |
|-----|--------|
| `1` | Punch |
| `2` | Kick |
| `3` | Guard |
| `4` | Charge Ki |
| `5` | Duck |
| `0` | Super Attack |

### Webcam Gestures
| Gesture | Action |
|---------|--------|
| Snap fist forward | Punch |
| Raise knee/ankle high | Kick |
| Both hands raised above shoulders | Guard |
| Hands together near abdomen | Charge Ki |
| Lower hips / squat | Duck |
| At 100% Ki, thrust both palms forward | Super Beam |

---

## 🏗️ Game Modes

| Mode | Description |
|------|-------------|
| **Solo vs AI** | Fight an adaptive AI that learns your patterns |
| **Local Versus** | One camera player vs one keyboard player |
| **Shared Camera** | Two players share one webcam — limb contact blocks |
| **Wizard Duel** | Speak spells like "Expecto Patronum" to cast attacks |
| **Shooting Mode** | Extend hands to fire energy shots, crouch to hide |

---

## 🚀 Quick Start

No build step required — it's a static site.

```bash
# Local development
npx serve . -p 3000 -s

# Or just open index.html in a browser
```

### Requirements
- Modern browser (Chrome, Edge, Firefox, Safari)
- Webcam (optional — keyboard/touch controls work without camera)
- HTTPS for webcam access (Vercel provides this automatically)

---

## 📁 Project Structure

```
anime-motion-fighter/
├── index.html          # Complete game (single-file architecture)
├── assets/
│   ├── motion-duel-cyan.png    # P1 fighter portrait
│   └── motion-duel-crimson.png # P2 fighter portrait
├── docs/
│   ├── mechanics-audit.md      # Combat system design notes
│   ├── minimum-combat-spec.md  # Minimum viable combat contract
│   ├── product-combat-loop.md  # Combat loop product spec
│   ├── product-critique.md     # Design critique & iterations
│   └── usability-test.md       # Usability testing protocol
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

- **Three.js** — 3D rendering, toon shading, particle effects
- **MediaPipe Pose** — Real-time body landmark detection
- **Tailwind CSS** — Utility-first styling
- **Web Audio API** — Procedural sound effects
- **Vanilla JS** — Zero framework dependencies

---

## 🎯 Combat System

The combat system is designed around **intent recognition**, not just motion detection:

1. **READY** — Standing neutral, waiting for input
2. **WIND-UP** — Motion detected, limb extending
3. **STRIKE** — Attack committed and resolving
4. **CONTACT** — Hit landed on target
5. **RECOVERY** — Cooldown before next attack

### Damage Values
| Attack | Damage | Counter Damage | Ki on Block |
|--------|--------|----------------|-------------|
| Punch | 12 | 18 | 8 |
| Kick | 22 | 30 | 10 |
| Super | 45 | — | 15 |

---

## 📱 Mobile Support

The game automatically detects mobile devices and shows touch controls:
- **D-pad** (left side) — Charge, Duck, Guard
- **Action buttons** (right side) — Punch, Kick, Super

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

Built with ⚡ by [ShiroganeMiyuki-0](https://github.com/ShiroganeMiyuki-0)
