# Modern Portfolio Website

A sleek, customizable portfolio website built with Next.js, Tailwind CSS, and Shadcn UI components.

## Features

- 🎨 Clean, modern design with light/dark mode
- 📱 Fully responsive for all devices
- ✨ Smooth animations and transitions
- 🧩 Modular components for easy customization
- 📝 JSON-based content management
- 🚀 Fast performance with Next.js
- 🔍 SEO friendly

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn UI](https://ui.shadcn.com/) - UI component system
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Next Themes](https://github.com/pacocoursey/next-themes) - Theme management
- [Tabler Icons](https://tabler-icons.io/) - SVG icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Content

All content is stored in `src/data/portfolio-data.ts`. You can update this file to customize:

- Personal information
- Skills
- Experience
- Projects
- Education
- Resume link

### Styling

- Global styles are in `src/app/globals.css`
- Theme customization is in `components.json`
- Component-specific styles are in their respective files

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add it to the page in `src/app/page.tsx`

## Deployment

### Deploying to Vercel

The easiest way to deploy your portfolio:

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Deploy with a single click

### Custom Domain

To use your own domain:

1. Purchase a domain from a provider
2. Add it to your Vercel project settings
3. Follow Vercel's instructions to configure DNS settings

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful component system
- [Next.js](https://nextjs.org/) team for the amazing framework
