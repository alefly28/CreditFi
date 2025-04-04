# CreditFi Video Graphics Specifications

## Brand Colors
Primary:
- Blue: #1976D2 (Professional, Trust)
- White: #FFFFFF (Clarity)
Secondary:
- Green: #388E3C (Success, Growth)
- Orange: #F57C00 (Warning, Activity)
Accent:
- Red: #D32F2F (Alerts, Important)
- Purple: #7B1FA2 (Premium features)

## Scene 1: Traditional DeFi vs CreditFi
### Split Screen Layout
```
┌─────────────┬─────────────┐
│ Traditional │   CreditFi  │
│    DeFi     │  Solution   │
├─────────────┼─────────────┤
│ $1500 ETH   │ $1000 ETH   │
│   locked    │  borrowed   │
└─────────────┴─────────────┘
```

### Required Icons
1. Locked ETH Icon:
   - Stack of ETH coins with lock overlay
   - Size: 128x128px
   - Colors: ETH logo (#627EEA) + Lock (#D32F2F)

2. Unlocked ETH Icon:
   - Stack of ETH coins with checkmark
   - Size: 128x128px
   - Colors: ETH logo (#627EEA) + Check (#388E3C)

## Scene 2: Logo Animation
### CreditFi Logo Elements
1. Credit Score Meter:
   ```
   ┌──────────────────┐
   │     0 - 850      │
   │ ╭────────────╮   │
   │ │████████░░░░│   │
   │ ╰────────────╯   │
   └──────────────────┘
   ```
   - Animate from 0 to 850
   - Color gradient: Red → Yellow → Green

2. Text Animation:
   - "Credit" slides in from left
   - "Fi" slides in from right
   - Both merge with glowing effect

## Scene 3: How It Works Flow
### Step Icons (64x64px each)
1. Wallet Connection:
   ```
   ╭─────────╮
   │  ┌───┐  │
   │  │ W │  │
   │  └───┘  │
   ╰─────────╯
   ```

2. Activity Building:
   ```
   ╭─────────╮
   │ ┌─┐     │
   │ │ │ ┌─┐ │
   │ └─┘ └─┘ │
   ╰─────────╯
   ```

3. Score Calculation:
   ```
   ╭─────────╮
   │ 850     │
   │ ▁▂▅▇█   │
   │         │
   ╰─────────╯
   ```

4. Better Terms:
   ```
   ╭─────────╮
   │   ★     │
   │  ╱│╲    │
   │ ╱ │ ╲   │
   ╰─────────╯
   ```

## Scene 4: Feature Cards
### Card Template
```
┌────────────────────┐
│      [ICON]        │
│                    │
│    Feature Title   │
│                    │
│    Description     │
└────────────────────┘
```
Size: 300x200px
Animation: Cards flip in sequence

### Required Feature Icons (48x48px each)
1. Credit Score Range:
   - Circular meter with needle
   - Numbers 0-850 around edge

2. Collateral Reduction:
   - Downward arrow with percentage
   - Lock breaking animation

3. Cross-chain:
   - Connected chain links
   - Multiple blockchain icons

4. Rewards:
   - Star with sparkles
   - Glowing effect animation

## Scene 5: Security Section
### Security Icons (64x64px each)
1. Audit Shield:
   ```
   ╭─────────╮
   │    ▲    │
   │  ╱─┼─╲  │
   │ ╱  │  ╲ │
   ╰─────────╯
   ```

2. Bug Bounty:
   ```
   ╭─────────╮
   │   🐛    │
   │   💰    │
   │         │
   ╰─────────╯
   ```

3. Emergency Stop:
   ```
   ╭─────────╮
   │    ⏹    │
   │    !    │
   │         │
   ╰─────────╯
   ```

## Scene 6: Interface Demo
### UI Mockup Frames
```
┌────────────────────────────┐
│ ╭──────╮  CreditFi        │
│ │ 750  │                  │
│ ╰──────╯                  │
│                           │
│ Available to Borrow:      │
│ ╭──────────────────────╮  │
│ │     1.5 ETH          │  │
│ ╰──────────────────────╯  │
│                           │
│ Collateral Required:      │
│ ╭──────────────────────╮  │
│ │     1.875 ETH        │  │
│ ╰──────────────────────╯  │
└────────────────────────────┘
```

### Call-to-Action Button
```
┌────────────────────┐
│   Try CreditFi     │
│    on Sepolia      │
└────────────────────┘
```
- Size: 200x60px
- Colors: Gradient from #1976D2 to #7B1FA2
- Hover effect: Glow animation

## Animation Transitions
1. Scene transitions: Smooth fade or slide
2. Text animations: Fade in/out
3. Icon animations: Bounce or float effect
4. Feature cards: Flip or slide
5. Final CTA: Pulse animation

## Export Formats
- Icons: SVG and PNG (2x resolution)
- Animations: JSON for Lottie
- UI Elements: PNG with transparency
- Full Scenes: 1920x1080px @ 60fps
- Vector assets: AI or EPS format

## Additional Notes
1. All text should use Poppins font family
2. Maintain 16:9 aspect ratio throughout
3. Use subtle shadows for depth
4. Include loading/buffer animations
5. Export with alpha channel where needed 