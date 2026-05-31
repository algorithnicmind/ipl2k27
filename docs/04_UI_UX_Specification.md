# UI/UX Specification Document
## Cricket Intelligence AI Platform (CIAP)

### 1. Design Philosophy
The design philosophy of CIAP is "Complex Data, Simple Interactions." The platform must take massive amounts of statistical data and machine learning outputs and present them in a clean, digestible, and visually stunning manner. The aesthetics should feel premium, dynamic, and state-of-the-art.

### 2. Design Principles
- **Clarity Over Clutter:** Use progressive disclosure. Show top-level predictions first, allow users to drill down for granular stats.
- **Dynamic & Alive:** Real-time data should pulse and update smoothly without jarring page reloads. Micro-animations indicate live status.
- **Trust through Transparency:** AI predictions must always have a highly visible "Why?" or "Explain" button.
- **Conversational First:** The AI chat interface should be accessible from anywhere in the application.

### 3. Brand Guidelines
- **Brand Name:** CIAP (Cricket Intelligence AI Platform)
- **Tone:** Authoritative, analytical, precise, yet accessible and conversational.

### 4. Typography
- **Primary Font:** *Inter* or *Roboto* for data tables, metrics, and chat interfaces (high legibility).
- **Display Font:** *Outfit* for large headings, team names, and win probabilities (modern, geometric).
- **Hierarchy:**
  - H1: 32px/40px (Bold)
  - H2: 24px/32px (SemiBold)
  - Body: 16px/24px (Regular)
  - Metadata/Labels: 12px/16px (Medium)

### 5. Color System
- **Background:** Sleek Dark Mode (Primary background: `#0F172A`, Surface/Card: `#1E293B`).
- **Primary Accent:** Vivid Indigo (`#4F46E5`) for primary buttons and AI elements.
- **Secondary Accent:** Emerald Green (`#10B981`) for positive indicators (win probability, good form).
- **Alert/Danger:** Rose Red (`#E11D48`) for negative indicators (wickets, poor form).
- **Text:** White (`#FFFFFF`) for primary text, Slate (`#94A3B8`) for secondary text.
- **Team Colors:** Custom HEX codes mapped to IPL franchises (e.g., RCB: Red/Gold, MI: Blue/Gold).

### 6. Spacing System
- 8pt grid system.
- Standard padding/margins: 8px, 16px, 24px, 32px, 48px.
- High whitespace around critical predictions to draw focus.

### 7. Component Library
- **Glassmorphism Cards:** Semi-transparent backgrounds with background blur for data widgets.
- **Probability Bars:** Smoothly animated progress bars for team win chances.
- **Radar Charts:** For Team Strength matrices (Batting, Bowling, Fielding).
- **AI Chat Bubbles:** Distinct styling for User vs. AI, with typing indicators and markdown support.
- **Skeleton Loaders:** Used universally during data fetching.

### 8. Layout System
- **Desktop Design:** Sidebar navigation (left), Main content area (center), AI Assistant drawer (right collapsible).
- **Tablet Design:** Bottom navigation bar, floating action button (FAB) for AI Assistant.
- **Mobile Design:** Single column layout, swipeable data cards, full-screen AI chat overlay.

### 9. Dashboard Design
- **Header:** Live global stats, user profile.
- **Hero Section:** Prominent carousel of Live/Upcoming matches with ML predictions.
- **Grid:** Quick links to Tournament Predictor, Top Performers, Team Rankings.

### 10. Prediction Screen & Match Analysis Screen Design
- **Top Bar:** Live score, current over, run rate.
- **Centerpiece:** Large Win Probability dual-bar (e.g., RCB 64% | MI 36%).
- **XAI Section:** "Prediction Reasons" card immediately below probability, listing bulleted factors.
- **Tabs:** Head-to-Head, Venue Stats, Team Matchups, Live AI Chat.

### 11. AI Chat Screen Design
- Floating or embedded chat window.
- Quick-action chips at the bottom (e.g., "Compare Teams", "Why this prediction?", "Key Player").
- Integrated data visualization (AI can render small charts inside the chat bubble).

### 12. Accessibility Guidelines & UX Best Practices
- Minimum contrast ratio of 4.5:1 for text.
- ARIA labels for all dynamic data charts and real-time updates.
- Keyboard navigability for all chat and prediction exploration interfaces.
