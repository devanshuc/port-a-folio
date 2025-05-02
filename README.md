CodeCosmos Portfolio Website
Description
CodeCosmos is a minimalist, clean, and cozy portfolio website designed for Devanshu Chicholikar, a master’s student at Northeastern University transitioning from full-stack development to DevOps and cloud engineering. The website showcases his technical expertise, projects, skills, professional journey, blog, and contact information in a visually appealing, interactive, and mobile-friendly interface. With a cosmic theme inspired by top websites like Stripe, Cal.com, shad.cn, and examples from Octet Design Journal, it balances simplicity with subtle surprises, such as comet animations and a mock CI/CD pipeline, to reflect Devanshu’s DevOps aspirations. Hosted for free on Vercel with MongoDB Atlas for storage, it ensures zero costs, aligning with Devanshu’s student budget. The site is SEO-friendly, accessible (WCAG 2.1 compliant), and extensible for future projects.
Purpose
The primary goal of CodeCosmos is to serve as a professional portfolio that highlights Devanshu’s full-stack development skills (e.g., Next.js, React, TypeScript) and emerging DevOps expertise (e.g., Terraform, Docker, GitHub Actions) to potential employers and collaborators. It aims to stand out through a clean, cozy aesthetic, intuitive navigation, and innovative features that demonstrate technical proficiency and creativity.
Features
Core Sections

Homepage:
A starry welcome with a dark navy-to-indigo gradient background, featuring Devanshu’s name, tagline (“Crafting Scalable Code Universes”), and a pulsing cyan CTA button.
Includes a “System Status: Online” badge, mimicking a server health check for a DevOps touch.


Projects:
A responsive grid of project cards (e.g., SecureScale, GoHaul) with modals displaying:
2D architecture diagrams (e.g., mock AWS VPC, EC2) using vis.js.
Measurable metrics (e.g., “85% faster deployment”).
A “Deploy” button triggering a mock CI/CD animation (CSS progress bar) linked to GitHub Actions YAML.




Skills:
A constellation-style visualization of technical skills (e.g., Next.js, Terraform, Docker) with interactive tooltips showing proficiency and project links.
Includes a mock Terraform configuration file demo (syntax-highlighted with Prism.js) to showcase Infrastructure as Code (IaC) knowledge.


Journey:
A scrollable timeline of professional milestones (e.g., Jaksh Enterprise, Northeastern MS) with animated, rounded cards detailing achievements (e.g., “Increased user engagement by 35%”).


Blog:
Card-based blog posts (e.g., “Docker 101”) with syntax-highlighted code snippets and mock container spin-up animations.


Contact:
A retro terminal-style form with a warm glow, submitting messages via Vercel serverless functions.
Features a “Message Launched” animation with a rocket trail.



Interactive Surprises

Comet Trail: Clicking the homepage tagline spawns a comet animation trailing to the CTA.
Build Log: Double-tapping a project card reveals an animated “build log” with a playful project story.
Hidden Control Panel: Accessible by typing “devops” in the contact form, it displays a mock dashboard with static metrics (e.g., “API Latency: 50ms”) and a “Health Check” animation.
Easter Eggs:
Voice Command: Saying “Launch Cosmos” (Web Speech API) triggers a “system boot” animation.
AR Project View: A WebXR toggle for mobile users to view a project’s architecture in augmented reality.
Retro 90s Mode: Long-tapping the logo toggles a CRT aesthetic with pixel fonts and scanlines.
Skill Hint: Double-tapping the tagline suggests a DevOps skill (e.g., “Try ArgoCD”) using static JSON.



Technical Features

Mobile-First: Responsive grids, touch gestures, and fast load times (<2s, Core Web Vitals).
Accessibility: WCAG 2.1 compliant with ARIA labels, keyboard navigation, and high-contrast text.
SEO-Friendly: Static generation with Next.js, meta tags, and structured data.
PWA Support: Offline access and app-like experience.
Performance: Lazy-loaded assets, optimized images, and Vercel CDN for global delivery.
Error Tracking: Integrated with Sentry’s free tier for frontend monitoring.

Technologies Used
The tech stack is selected for compatibility, performance, and alignment with Devanshu’s skills, using stable versions as of May 2025.



Category
Tool
Version
Purpose



Frontend
Next.js
14.2.3
Static-site generation, server-side rendering, SEO



React
18.3.1
Reusable components



TypeScript
5.4.5
Type safety



Tailwind CSS
3.4.3
Polished, responsive UI



vis.js
4.21.0
2D visualizations (constellations, diagrams)



Framer Motion
11.2.6
Smooth animations (ripples, fades)



react-particles
2.12.2
Lightweight starfield effects (with tsparticles v3.4.0)



Prism.js
1.29.0
Syntax-highlighted code snippets


Backend
Node.js
20.12.2
APIs for contact form, blog comments



Express
4.19.2
Lightweight API routes



MongoDB (Atlas)
7.0.8
Free-tier database for blog/contact



mongoose
8.3.4
MongoDB schema modeling


Infrastructure
Vercel
Latest
Free hosting, CI/CD, serverless functions



GitHub Actions
Latest
Free CI/CD pipeline



Docker
26.1.0
Local development



Terraform
1.8.2
Mock IaC demo


Tools
Sentry
7.114.0
Free-tier error tracking



ESLint (eslint-config-next)
8.57.0
Code linting



Prettier
3.2.5
Code formatting



Vitest
1.6.0
Unit testing


Project Structure

pages/: Main pages (e.g., index.tsx, projects.tsx, skills.tsx, journey.tsx, blog.tsx, contact.tsx).
components/: Reusable React components (e.g., ProjectCard.tsx, SkillNode.tsx, TimelineDot.tsx).
styles/: Global styles and Tailwind CSS configuration (tailwind.config.js).
lib/: Utility functions and API calls (e.g., api.ts for serverless functions).
data/: Static data for skills, projects, and blog posts (e.g., skills.ts, projects.ts, blog.ts).
public/: Static assets (e.g., images, fonts, favicons).
tests/: Unit tests for components and utilities.
.github/workflows/: GitHub Actions workflows for CI/CD.
Dockerfile: For local development with Docker.
.env.local: Environment variables (e.g., MongoDB URI).

Setup Instructions
Prerequisites

Node.js v20.12.2 or higher.
npm v10.x or higher.
A free MongoDB Atlas account.
A free Vercel account.
Docker (optional, for local development).
Git for version control.

Steps

Clone the Repository:
git clone https://github.com/devanshuchicholikar/codecosmos-portfolio.git
cd codecosmos-portfolio


Install Dependencies:
npm install

This installs all required packages, including Next.js, React, Tailwind CSS, and others listed in package.json.

Set Up Environment Variables:Create a .env.local file in the root directory with:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/codecosmos?retryWrites=true&w=majority
NEXT_PUBLIC_VERCEL_URL=https://your-vercel-app.vercel.app


Replace <username> and <password> with your MongoDB Atlas credentials.
Update NEXT_PUBLIC_VERCEL_URL with your deployed Vercel URL (optional for local dev).


Configure MongoDB Atlas:

Sign up at MongoDB Atlas.
Create a free-tier cluster (512 MB).
Set up a database named codecosmos with collections for posts (blog) and messages (contact).
Add your IP address to the network access whitelist.
Copy the connection string and paste it into .env.local.


Set Up Vercel:

Sign up at Vercel.
Connect your GitHub account.
Import the codecosmos-portfolio repository and deploy with default settings.
Vercel automatically handles CI/CD and domain setup.


(Optional) Set Up Docker for Local Development:

Ensure Docker is installed.
Build and run the Docker container:docker build -t codecosmos-portfolio .
docker run -p 3000:3000 --env-file .env.local codecosmos-portfolio


Access the site at `[invalid url, do not cite]



Running the Project
Local Development

Start the Next.js development server:
npm run dev

Access the site at `[invalid url, do not cite]

Run unit tests:
npm run test



Production Build

Build the project for production:
npm run build

This generates an optimized static site in the .next directory.

Start the production server:
npm start



Deployment

Vercel:

Push changes to your GitHub repository:git add .
git commit -m "Deploy updates"
git push origin main


Vercel automatically deploys the latest commit.
Access the deployed site at your Vercel-provided URL (e.g., https://codecosmos-portfolio.vercel.app).


Alternative Hosting:

Netlify: Import the repository at Netlify, configure build settings (npm run build, publish directory: .next), and deploy.
GitHub Pages: Export the static site with next export, push to a gh-pages branch, and enable GitHub Pages in repository settings.



Testing

Unit Tests: Run npm run test to execute Vitest tests for components and utilities.
Accessibility: Use axe DevTools browser extension to verify WCAG 2.1 compliance.
Performance: Test with Google PageSpeed Insights to ensure a score >90.
Cross-Browser: Test on Chrome, Firefox, Safari, and Edge using BrowserStack (free trial).
Mobile: Test responsiveness on iOS and Android devices via BrowserStack or Chrome DevTools.

Extending the Portfolio
Adding a New Project

Add project details to data/projects.ts:export const projects = [
  {
    id: 'new-project',
    name: 'New Project',
    description: 'Description of the new project.',
    technologies: ['Next.js', 'TypeScript'],
    metrics: ['50% performance improvement'],
    github: 'https://github.com/yourusername/new-project',
  },
  // Existing projects...
];


Update pages/projects.tsx to render the new project card.
Add any custom components or styles in components/ or styles/.

Adding a New Blog Post

Create a new markdown file in data/blog/ (e.g., new-post.md):---
title: New Blog Post
date: 2025-05-10
---
Content of the new blog post.


Update pages/blog.tsx to include the new post in the blogPosts array.
Add code snippets or animations as needed.

Adding a New Skill

Update data/skills.ts:export const skills = [
  {
    id: 'new-skill',
    name: 'New Skill',
    proficiency: 80,
    projects: ['new-project'],
  },
  // Existing skills...
];


Ensure the skill appears in the constellation in pages/skills.tsx.

Potential Challenges and Mitigations



Challenge
Description
Mitigation



Mobile Performance
Heavy animations (e.g., particles.js) may slow low-end devices.
Use lightweight particles.js (50 particles, no movement), lazy-load assets, optimize images with Next.js. Test on BrowserStack.


Accessibility Compliance
Visualizations (e.g., constellations) may lack screen-reader support.
Add ARIA labels, ensure keyboard navigation, provide text alternatives for SVGs. Use axe DevTools.


Learning Curve
vis.js and Framer Motion may be new despite JavaScript/TypeScript skills.
Use documented APIs, starter templates, and simple features (e.g., basic SVGs, fade animations).


Database Limits
MongoDB Atlas’s 512 MB free tier may fill up with blog posts/messages.
Limit initial blog posts to 5, use text-only comments. Switch to Supabase if needed.


Cross-Browser Issues
Animations/SVGs may render differently in Safari/Edge.
Use CSS fallbacks, test with BrowserStack, ensure vis.js is Webkit-compatible.


Time Constraints
Limited time as a student to build all features in 7 weeks.
Prioritize core features (Phase 1), use shad.cn components to save time.


SEO and Discoverability
Single-page app may rank poorly without SEO.
Use Next.js static generation, add meta tags, submit sitemap to Google Search Console.


Implementation Timeline

Phase 1: Foundation (Weeks 1–2):
Set up Next.js, TypeScript, Tailwind, and MongoDB Atlas.
Build and deploy homepage with starry background and nav.
Configure Vercel and GitHub Actions.


Phase 2: Core Features (Weeks 3–5):
Implement Projects, Skills, Journey, Blog, and Contact sections.
Add mock CI/CD, IaC, and basic surprises.
Test mobile responsiveness and accessibility.


Phase 3: Surprises and Polish (Weeks 6–7):
Add voice command, AR view, retro mode, and skill hint.
Build control panel and CLI.
Optimize performance, SEO, and accessibility.


Buffer (Week 8): Gather peer feedback (LinkedIn, X) and refine.

Contributing
Contributions are welcome, especially for bug fixes, performance improvements, or accessibility enhancements. To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request with a detailed description of changes.

Please adhere to the project’s coding standards (ESLint, Prettier) and ensure all tests pass.
License
This project is licensed under the MIT License - see the LICENSE.md file for details.
Contact
For inquiries, feedback, or collaboration opportunities, please contact:

Email: [your email]
LinkedIn: [your LinkedIn profile]
GitHub: https://github.com/devanshuchicholikar

Acknowledgments

Inspired by clean website designs from Octet Design Journal.
Built with open-source tools and libraries, including Next.js, Tailwind CSS, and MongoDB Atlas.
Special thanks to the developer community on LinkedIn and X for feedback and inspiration.
