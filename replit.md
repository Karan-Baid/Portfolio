# Portfolio Website

## Overview

A personal portfolio website built as a full-stack TypeScript application. The project showcases professional experience, skills, projects, and certifications with a modern, animated UI. It features a contact form for visitor messages and uses a PostgreSQL database for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming (dark mode by default)
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for complex reveal animations and layout transitions
- **Type Effects**: react-type-animation for hero section typing effect
- **State Management**: TanStack React Query for server state and data fetching
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with tsx for development execution
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Definition**: Centralized in `shared/schema.ts` using Drizzle's pgTable definitions

### Data Storage
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema Tables**:
  - `projects`: Portfolio projects with title, description, tech stack, URLs, and highlights
  - `skills`: Technical skills with category and proficiency rating
  - `experience`: Work experience entries with company, role, period, and descriptions
  - `certifications`: Professional certifications with issuer and verification URL
  - `messages`: Contact form submissions with name, email, message, and timestamp

### Project Structure
- `/client`: React frontend application
  - `/src/components`: Reusable UI components including Shadcn/ui
  - `/src/pages`: Page components (Home, NotFound)
  - `/src/hooks`: Custom hooks for data fetching and utilities
  - `/src/lib`: Utility functions and query client configuration
- `/server`: Express backend
  - `index.ts`: Server entry point with middleware setup
  - `routes.ts`: API route handlers
  - `storage.ts`: Database access layer implementing IStorage interface
  - `db.ts`: Database connection setup
- `/shared`: Code shared between frontend and backend
  - `schema.ts`: Drizzle table definitions and Zod insert schemas
  - `routes.ts`: API route definitions with type schemas
- `/migrations`: Drizzle database migrations

### Build Process
- Development: `npm run dev` runs tsx with hot reload via Vite
- Production build: `npm run build` compiles frontend with Vite and bundles server with esbuild
- Database sync: `npm run db:push` pushes schema changes to PostgreSQL

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection string via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migration and schema push tooling

### UI Libraries
- **Radix UI**: Accessible primitive components (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **Vaul**: Drawer component
- **cmdk**: Command palette component

### Development Tools
- **Vite**: Frontend build tool with React plugin
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **ESBuild**: Server bundling for production with dependency allowlist for optimized cold starts

### Fonts
- Inter: Primary sans-serif font
- JetBrains Mono: Monospace font for code elements
- Google Fonts integration via CDN