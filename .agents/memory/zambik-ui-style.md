---
name: Zambik UI style system
description: Design language decisions for Zambik streaming app — Uber-inspired, no cartoon styles.
---

## Rule
All UI across app.html must follow Uber design language: black/dark backgrounds, white text, `#06C167` green accent only, no gradients on UI chrome, no box-shadows with color, no bouncing/floating/wobble animations.

**Why:** User explicitly rejected MrBeast/cartoon aesthetics (orange/gold/pink gradients, neon green glows, animated borders) in favor of Uber minimal dark UI.

## How to apply
- Backgrounds: `#000000` (page), `#161616` (cards), `#1a1a1a` (inputs)
- Borders: `1px solid #2d2d2d` always (never thick or colored)
- Text: `#ffffff` primary, `#ababab` secondary, `#6b6b6b` tertiary
- Accent: `#06C167` green (Uber) for progress bars, toggles on-state, CTA buttons, icons-active
- Buttons: `background #06C167 / color #000000` for primary; `background #1a1a1a / color #ffffff` for secondary
- Border-radius: `8px` for cards/buttons, `50%` for icon buttons
- Animations: fade/opacity only — no scale-wobble, no floating, no rotation on hover
- Video player controls: transparent buttons, `rgba(0,0,0,0.9)` gradient overlays, `3px` progress bar in `#06C167`
- Toast notifications: bottom-positioned, dark `#1a1a1a` pill, not centered modal
- Toggle switches: 52×28px, `#3d3d3d` off / `#06C167` on, no border
