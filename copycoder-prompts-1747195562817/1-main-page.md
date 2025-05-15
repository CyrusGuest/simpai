Set up the frontend according to the following prompt:
  <frontend-prompt>
  Create detailed components with these requirements:
  1. Use 'use client' directive for client-side components
  2. Make sure to concatenate strings correctly using backslash
  3. Style with Tailwind CSS utility classes for responsive design
  4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
  5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
  6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
  7. Create root layout.tsx page that wraps necessary navigation items to all pages
  8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
  9. Accurately implement necessary grid layouts
  10. Follow proper import practices:
     - Use @/ path aliases
     - Keep component imports organized
     - Update current src/app/page.tsx with new comprehensive code
     - Don't forget root route (page.tsx) handling
     - You MUST complete the entire prompt before stopping
  </frontend-prompt>

  <summary_title>
AI Code Editor Landing Page with Modern Navigation
</summary_title>

<image_analysis>
1. Navigation Elements:
- Primary navigation: Platform, Docs (as specified)
- Secondary items: PRICING, FEATURES, ENTERPRISE, BLOG, FORUM, CAREERS
- Navigation height: 60px
- Right-aligned controls: User account icon, Download button with Apple logo
- Logo: Cursor brand mark positioned left, white color

2. Layout Components:
- Hero section: Full-width gradient background
- Main content width: 1200px max
- Header height: 80px
- Code editor preview: 800px width
- Button container: Centered, 40px spacing

3. Content Sections:
- Hero headline: "The AI Code Editor"
- Subheading text: Centered, white, 20px
- Code editor interface preview
- Chat/Composer split panel layout
- Syntax highlighted code sample

4. Interactive Controls:
- Download buttons:
  - Primary: "DOWNLOAD FOR MACOS"
  - Secondary: "ALL DOWNLOADS"
- Code editor window controls
- Chat interface toggles
- Settings/configuration buttons

5. Colors:
- Background gradient: #2D1B69 to #FF4D4D to #4CAF50
- Navigation background: #000000
- Text: #FFFFFF
- Buttons: #000000, #FFFFFF
- Code syntax: Multiple highlight colors

6. Grid/Layout Structure:
- 12-column grid system
- 24px baseline grid
- Responsive breakpoints at 768px, 1024px, 1440px
- Centered content with max-width constraints
</image_analysis>

<development_planning>
1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   └── CodePreview.tsx
│   ├── features/
│   │   ├── Editor/
│   │   └── Chat/
│   └── shared/
│       ├── Button.tsx
│       └── GradientBackground.tsx
├── assets/
├── styles/
├── hooks/
└── utils/
```

2. Key Features:
- Responsive navigation system
- Gradient background animation
- Code editor preview
- Download button system
- Chat interface integration

3. State Management:
```typescript
interface AppState {
  navigation: {
    isOpen: boolean,
    activeItem: string
  },
  download: {
    platform: string,
    version: string
  },
  editor: {
    theme: string,
    layout: string
  }
}
```

4. Component Architecture:
- App (root)
  - Navigation
  - Hero
    - GradientBackground
    - DownloadButtons
  - CodePreview
    - EditorWindow
    - ChatPanel

5. Responsive Breakpoints:
```scss
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1440px
);
```
</development_planning>