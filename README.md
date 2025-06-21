# Astronautical Apogee

A modern, performance-focused portfolio website showcasing professional web development expertise. Built with cutting-edge technologies including Astro, Lit Web Components, and TypeScript.

## 🚀 Overview

Astronautical Apogee is a professional portfolio website that demonstrates modern web development practices and showcases expertise in full-stack development, UI/UX design, and web performance optimization. The site features a component-driven architecture with a focus on accessibility, performance, and maintainability.

## ✨ Features

- **Modern Architecture**: Built with Astro for optimal performance and Lit for reusable web components
- **Component-Driven Design**: Modular, reusable components with scoped styling
- **Theme System**: Dynamic light/dark theme switching with CSS custom properties
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance Optimized**: Static site generation with selective hydration
- **Accessibility First**: Semantic HTML, proper ARIA attributes, and keyboard navigation
- **TypeScript**: Full type safety across the entire codebase
- **Modern Tooling**: ESLint, Prettier, Husky for code quality and consistency

## 🛠 Technology Stack

### Core Framework

- **[Astro 5.7.10](https://astro.build/)** - Static site generator with component islands
- **[Lit 3.3.0](https://lit.dev/)** - Lightweight web components library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for code quality
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image optimization

### Deployment

- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Static site hosting
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - Deployment tooling

## 📁 Project Structure

```
astronautical-apogee/
├── src/
│   ├── components/          # Reusable web components
│   │   ├── base/           # Base component classes
│   │   ├── button/         # Button components
│   │   ├── card/           # Card layouts
│   │   ├── navigation/     # Navigation components
│   │   └── theme/          # Theme system
│   ├── layouts/            # Astro layout components
│   ├── pages/              # Site pages and routes
│   │   ├── blog/           # Blog posts
│   │   ├── portfolio/      # Portfolio projects
│   │   └── services/       # Service offerings
│   ├── styles/             # Global styles and themes
│   ├── icons/              # SVG icon components
│   └── assets/             # Static assets
├── genaisrc/               # AI automation scripts
│   └── packages/           # Specialized AI tools
│       ├── comment/        # Code commenting
│       ├── commit/         # Git commit messages
│       ├── message/        # Message generation
│       ├── style/          # Code styling
│       └── utility/        # Shared utilities
└── public/                 # Static files
```

## 🎨 Design System

### Color Palette

- **Primary**: Modern, professional color scheme with CSS custom properties
- **Theme Support**: Dynamic light/dark theme switching
- **Accessibility**: WCAG-compliant contrast ratios

### Typography

- **Primary**: Noto Sans for body text
- **Secondary**: Poppins for headings
- **Loading**: Optimized web font loading with preconnect

### Components

- **Atomic Design**: Components built with composition over inheritance
- **Scoped Styles**: CSS-in-JS with Lit's styling system
- **Responsive**: Mobile-first responsive design patterns

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/anoblet/astronautical-apogee.git
   cd astronautical-apogee
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:4321
   ```

### Development Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting

# Deployment
pnpm deploy           # Deploy to Cloudflare Pages
```

## 🏗 Architecture

### Component System

The project uses a hybrid architecture combining:

- **Astro Components**: For static content and layouts
- **Lit Web Components**: For interactive, reusable UI elements
- **Base Classes**: Shared functionality and styling patterns

### Styling Approach

- **Global Styles**: CSS custom properties for theming
- **Component Styles**: Scoped CSS-in-JS with Lit
- **Utility Classes**: Atomic CSS classes for common patterns
- **Theme System**: Dynamic theme switching with local storage persistence

### Performance Strategy

- **Static Generation**: Pre-rendered HTML for optimal loading
- **Component Islands**: Selective hydration for interactivity
- **Image Optimization**: Automatic image processing with Sharp
- **Font Loading**: Optimized web font delivery

## 🤖 AI Integration

The project includes a sophisticated AI automation system powered by GenAIScript:

### GenAI Packages

- **Comment**: Automated code commenting and documentation
- **Commit**: Conventional commit message generation
- **Message**: Content and messaging assistance
- **Style**: Code style analysis and improvements
- **Utility**: Shared AI utilities and helpers

### Features

- **Code Analysis**: Automated code quality assessment
- **Content Generation**: AI-assisted content creation
- **Workflow Automation**: Streamlined development processes
- **Documentation**: Automated documentation generation

## 📄 Content Structure

### Portfolio

- **Professional Projects**: Enterprise-level web applications
  - CXL: E-learning platform development
  - Graduation Source: E-commerce solutions
  - Avanti Systems USA: Corporate web presence
- **Personal Projects**: Open-source contributions and side projects

### Services

- **Web Development**: Full-stack application development
- **UI/UX Design**: User interface and experience design
- **Consultation**: Technical advisory and code reviews
- **Mentorship**: Developer coaching and career guidance

### Blog

- **Technical Articles**: Web development insights and tutorials
- **Industry Insights**: Trends and best practices
- **Project Case Studies**: In-depth project breakdowns

## 🔧 Configuration

### Environment Setup

The project includes comprehensive configuration for:

- **TypeScript**: Strict type checking
- **ESLint**: Custom rules for Astro and Lit
- **Prettier**: Code formatting standards
- **Git Hooks**: Pre-commit code quality checks

### Deployment

Configured for Cloudflare Pages with:

- **Automatic Builds**: Git-based deployment pipeline
- **Performance Optimization**: Edge caching and compression
- **Custom Domain**: Professional domain configuration

## 🎯 Performance

### Metrics

- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: Optimized for user experience
- **Bundle Size**: Minimal JavaScript footprint
- **Loading Speed**: Sub-second initial page loads

### Optimization Techniques

- **Static Site Generation**: Pre-rendered HTML
- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Component-level code splitting
- **Caching Strategy**: Aggressive caching with cache busting

## 🛡 Security

- **Content Security Policy**: Strict CSP headers
- **HTTPS Only**: Secure connection enforcement
- **Dependency Scanning**: Automated vulnerability detection
- **Safe Deployment**: Staging environment testing

## 🤝 Contributing

This is a personal portfolio project, but contributions are welcome for:

- Bug fixes and improvements
- Performance optimizations
- Accessibility enhancements
- Documentation updates

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Andrew Noblet**

- **GitHub**: [anoblet](https://github.com/anoblet)
- **Website**: [Astronautical Apogee](https://astronautical-apogee.pages.dev)
- **LinkedIn**: [Andrew Noblet](https://linkedin.com/in/andrewnoblet)

---

**Built with ❤️ using modern web technologies**
