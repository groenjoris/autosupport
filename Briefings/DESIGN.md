---
name: The Friendly Pixel
colors:
  surface: '#f7fafd'
  surface-dim: '#d7dadd'
  surface-bright: '#f7fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f7'
  surface-container: '#ebeef1'
  surface-container-high: '#e5e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#181c1e'
  on-surface-variant: '#464556'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f4'
  outline: '#777588'
  outline-variant: '#c7c4d9'
  surface-tint: '#483ff0'
  primary: '#3d32e6'
  on-primary: '#ffffff'
  primary-container: '#5852ff'
  on-primary-container: '#f2eeff'
  inverse-primary: '#c2c1ff'
  secondary: '#006970'
  on-secondary: '#ffffff'
  secondary-container: '#00eefc'
  on-secondary-container: '#00686f'
  tertiary: '#a30075'
  on-tertiary: '#ffffff'
  tertiary-container: '#ce0095'
  on-tertiary-container: '#ffebf2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c2c1ff'
  on-primary-fixed: '#0c006a'
  on-primary-fixed-variant: '#2c18d9'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#00dbe9'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#ffd8e9'
  tertiary-fixed-dim: '#ffafd7'
  on-tertiary-fixed: '#3c0029'
  on-tertiary-fixed-variant: '#890062'
  background: '#f7fafd'
  on-background: '#181c1e'
  surface-variant: '#e0e3e6'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 40px
  gutter: 24px
  section-gap: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system establishes a "Retro-Modern" aesthetic that bridges the gap between nostalgic 8-bit gaming and contemporary SaaS professionalism. The brand personality is helpful, approachable, and technically proficient, designed specifically to reduce the stress of customer support for small business owners.

The visual style leans heavily into **Modern Minimalism** mixed with **Retro-Pixel accents**. It utilizes vast amounts of whitespace to ensure the AI's presence feels calm rather than cluttered. The emotional response should be one of "effortless assistance"—the user should feel like they have a friendly digital companion handling their workload. The central persona—a blocky, pixel-eyed agent—acts as the primary anchor for the UI, appearing in headers, empty states, and loading transitions to personify the AI.

## Colors

The palette revolves around a high-energy **Cyber Purple** (Primary) that signals intelligence and modern tech. This is paired with an **Electric Cyan** (Secondary) for interactive elements and a **Neon Magenta** (Tertiary) used sparingly for high-contrast alerts or notifications.

The "pixel" aspect of the aesthetic is grounded by a strict use of pure black (#000000) for "pixel-perfect" accents, such as the agent's eyes and thin borders. The background uses a soft, cool-toned neutral to prevent eye strain and ensure the vibrant primary colors pop without feeling aggressive. This balance maintains a professional atmosphere while allowing the "Retro" flair to shine through accent colors.

## Typography

The typographic scale relies on a high-contrast pairing. **Space Grotesk** is used for all headlines and labels; its geometric, technical structure provides the "blocky" feel requested while remaining modern and legible. It should be set with tight letter spacing for large displays to mimic the density of pixel clusters.

**Plus Jakarta Sans** serves as the primary body font. Its soft, rounded terminals complement the "friendly" direction of the design system. Large font sizes (18px for standard body text) are encouraged to maximize readability and maintain the "airy" feel of the interface. Use bold weights of Space Grotesk for callouts to emphasize the "Friendly Pixel" persona's voice.

## Layout & Spacing

The design system utilizes a **Fixed Grid** layout for dashboard views and a centered, single-column flow for settings and email drafting. A strict 8px base unit (the "pixel") governs all spacing, ensuring that even large-scale layouts feel mathematically aligned to a grid.

Generous whitespace is a core requirement; section gaps are intentionally wide (80px+) to allow the user to focus on one AI-generated task at a time. Gutters are kept wide to prevent the "pixelated" elements from feeling cluttered. Content containers should never feel cramped, favoring vertical stacks over complex horizontal multi-column layouts.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layers** and **Ambient Shadows**. Instead of heavy, realistic drop shadows, the system uses "Subtle Lift"—very soft, diffused shadows with a slight tint of the primary Cyber Purple (#5852FF) at low opacity (approx. 8%).

For the "Pixel" aesthetic, specific elements (like the agent's face or primary CTA cards) may use a "Double Border" technique: a thin 1px inner border of the primary color, and a 4px offset "hard shadow" of a neutral gray to give a blocky, tactile feel without looking dated. Interactive cards should feel like they are floating slightly above the neutral background.

## Shapes

The shape language is a deliberate paradox: **extremely rounded containers** housing **pixel-perfect square details**. 

Main UI containers, buttons, and input fields use a "Rounded" setting (0.5rem to 1.5rem corners). This softens the "tech" feel and makes the AI agent appear more approachable. However, the internal details—such as icons, the agent's eyes, and progress bar segments—remain sharp-edged squares. This contrast between the soft outer shell and the blocky inner core defines the "Friendly Pixel" aesthetic.

## Components

### The Agent Face
The most critical component. It is a simple square container with rounded corners (rounded-lg) containing two "pixel" eyes. The eyes should animate (blink or squint) based on the AI's "status"—scanning, typing, or successful completion.

### Buttons
Buttons are pill-shaped (rounded-xl) with a bold background of Cyber Purple or Electric Cyan. They feature a subtle 2px bottom "hard shadow" to give them a tactile, pressable feel.

### Input Fields
Inputs use a soft neutral background with a 1px border that turns Cyber Purple on focus. The corner radius must be consistent with the 0.5rem base.

### Cards
Cards are the primary container for email threads. They use a white background, subtle purple-tinted ambient shadows, and a "status pixel" in the top right corner (green for sent, yellow for draft, red for needs attention).

### Chips
Chips (for tags like "Refund" or "Inquiry") use a high-contrast, blocky appearance with 0px or 4px roundedness, creating a visual distinction from the rounded buttons to emphasize their informational nature.