

# AI Resume & Portfolio Builder (AI Domain Only)

## Overview
A colorful, friendly, step-by-step wizard app where students/professionals in the AI/ML field can create polished resumes and portfolio pages. Users create accounts to save and revisit their data. Resumes download as PDF, and portfolios get a shareable live URL.

## Pages & Flow

### 1. Landing Page
- Bright, welcoming hero section explaining the tool
- "Get Started" CTA → leads to signup/login
- Show sample resume & portfolio previews

### 2. Authentication
- Sign up / Log in with email (using Supabase Auth)
- User profiles stored in database (name, email, saved resume data)

### 3. Dashboard
- List of user's saved resumes & portfolios
- "Create New" button
- Edit or delete existing documents

### 4. Builder Wizard (Step-by-step form)
A friendly multi-step form with progress indicator:
- **Step 1 — Personal Details**: Name, email, phone, location, LinkedIn, GitHub
- **Step 2 — Education**: Degree, college, graduation year, CGPA
- **Step 3 — Target Role**: Pick from AI-specific roles (AI Engineer, ML Engineer, Data Scientist, GenAI Developer, NLP Engineer, etc.)
- **Step 4 — Skills**: Programming languages, AI/ML skills, tools, frameworks, databases
- **Step 5 — Projects**: Add AI projects with title, problem, tech stack, contributions, outcomes
- **Step 6 — Experience** (optional): Internships or work experience
- **Step 7 — Certifications**: Certifications and achievements
- **Step 8 — Choose Output**: Resume, Portfolio, or Both + select template style

### 5. Template Selection
**Resume Templates:**
- R1: "Classic ATS" — Single column, simple, ATS-optimized
- R2: "Modern AI" — Slightly modern with strong project focus
- R3: "Fresher AI" — Designed for no-experience candidates, projects & certs heavy

**Portfolio Templates:**
- P1: "Minimal AI" — Clean, minimal sections
- P2: "Modern AI Developer" — Hero + Skills + Projects + Timeline
- P3: "AI Research Style" — Research-oriented with publications section

### 6. Preview Page
- Live preview of the generated resume and/or portfolio using the selected template
- All user data populated into the chosen template
- Switch between templates without re-entering data

### 7. Download & Share
- **Resume**: Download as PDF (generated from HTML in-browser)
- **Portfolio**: Get a shareable live URL (public portfolio page hosted within the app)

## Database (Supabase / Lovable Cloud)
- **profiles** table: user info linked to auth
- **resumes** table: saved resume data (JSON), selected template, linked to user
- **portfolios** table: saved portfolio data, template choice, public URL slug

## Key Features
- All content is strictly AI/ML domain — role options, skill suggestions, and project examples are AI-focused
- Form validation ensures completeness before preview
- Data auto-saves as users progress through the wizard
- Colorful, friendly UI with a step-by-step wizard feel, progress bar, and helpful tooltips
- Responsive design for mobile and desktop

## Public Portfolio Pages
- Each portfolio gets a unique URL slug (e.g., `/portfolio/john-doe-ai`)
- Publicly accessible without login
- Renders the selected portfolio template with the user's data

