# Logo Components

This directory contains all the logo variants for the Omar Nour Portfolio.

## Components

### 1. Logo.tsx
Main logo component with multiple variants:
- `default`: Full logo with gradient background and decorative elements
- `minimal`: Clean, simple version
- `animated`: Enhanced version with animations

**Props:**
- `size`: "sm" | "md" | "lg" (default: "md")
- `variant`: "default" | "minimal" | "animated" (default: "default")
- `className`: Additional CSS classes

### 2. LogoSimple.tsx
Simplified logo component:
- Clean design
- Optional tagline
- Perfect for headers and navigation

**Props:**
- `size`: "sm" | "md" | "lg" (default: "md")
- `showTagline`: boolean (default: true)
- `className`: Additional CSS classes

### 3. LogoIcon.tsx
Standalone icon component:
- Square format
- Multiple variants
- Perfect for favicons and small spaces

**Props:**
- `size`: "sm" | "md" | "lg" | "xl" (default: "md")
- `variant`: "default" | "minimal" | "glow" (default: "default")
- `className`: Additional CSS classes

### 4. TypingText.tsx
Typing animation component:
- Simulates typewriter effect
- Customizable speed and behavior
- Perfect for hero sections and dynamic text

**Props:**
- `text`: string - The text to type
- `speed`: number - Typing speed in milliseconds (default: 120)
- `showCursor`: boolean - Show blinking cursor (default: true)
- `repeat`: boolean - Repeat the animation (default: false)
- `delay`: number - Delay before repeating in milliseconds (default: 1000)
- `className`: string - Additional CSS classes

## Usage Examples

```tsx
// Main logo
<Logo variant="animated" size="lg" />

// Simple logo without tagline
<LogoSimple showTagline={false} />

// Icon only
<LogoIcon variant="glow" size="xl" />

// Typing animation
<TypingText text="Creative Developer" speed={100} />

// Repeating typing animation
<TypingText text="Full Stack Developer" speed={80} repeat={true} delay={2000} />
```

## Design Features

- **Gradient Backgrounds**: Uses the portfolio's primary color scheme
- **Responsive Sizing**: Multiple size options for different contexts
- **Hover Effects**: Subtle animations on hover
- **Accessibility**: High contrast and readable text
- **Consistent Styling**: Follows the portfolio's design system
- **Typing Animation**: Smooth typewriter effect with customizable options

## Color Scheme

- **Primary**: Purple gradient (#A855F7)
- **Accent**: Cyan (#22D3EE)
- **Background**: Dark theme compatible
- **Text**: High contrast white/foreground colors

## Demo

Visit `/logos` route to see all logo variants and typing animations in action.