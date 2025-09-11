# 📚 Halakah - Quran School Management System

A comprehensive full-stack web application for managing Quran schools, designed to support multiple user roles including Teachers, Admins, Parents, and Students. The platform enables streamlined class tracking, student progress monitoring, attendance recording, and reporting through an intuitive, responsive interface.

## 🏗️ Architecture

This is a monorepo containing both frontend and backend applications:

- **Client**: React-based frontend with modern tooling
- **Server**: Hono-based backend API with PostgreSQL database
- **Shared**: Common types and utilities between client and server

## 🌐 Tech Stack

### Frontend (`/client`)

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Ant Design (AntD)
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Localization**: i18next (Arabic + English support)
- **Styling**: SCSS with CSS modules

### Backend (`/server`)

- **Runtime**: Bun
- **Framework**: Hono
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **Language**: TypeScript

## 🧑‍🏫 Supported Roles and Features

### 1. **Teacher**

- View assigned classes (`/my-classes`)
- View students across all their classes (`/my-students`)
- Search students or classes (`/find-student`, `/find-class`)
- View class details (`/view-class/:id`)
- Export data to CSV format
- Run class sessions (planned)

### 2. **Parent / Student**

- View list of linked children/students on login
- Navigate to student report dashboard
- View Quran progress, success rate, attendance, class history
- Print or download student reports

### 3. **Admin**

- Add/manage users, roles, classes, and tasks
- Assign teachers to classes
- Review overall system reports and data exports

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/zurghani/halakaa.git
cd halakaa
```

### 2. Install dependencies

```bash
bun install
```

### 3. Environment Setup

#### Server Environment

Create `/server/.env` based on `/server/.env.example`:

```bash
cd server
cp .env.example .env
# Edit .env with your database and authentication settings
```

#### Client Environment

Create `/client/.env` if needed for client-specific environment variables.

### 4. Database Setup

```bash

# Push schema to database
bun run db:push

# Seed database with initial data
bun run db:seed
```

### 5. Development

#### Start both client and server concurrently:

```bash
bun run dev
```

#### Or start them individually:

```bash
# Start server (http://localhost:3000)
bun run dev:server

# Start client (http://localhost:5173)
bun run dev:client

```

## 🏗️ Build and Production

### Build both applications:

```bash
bun run build
```

### Build individually:

```bash
# Build server - you need to build this before you run the Client.
bun run build:server

# Build client
bun run build:client
```

## 🌍 Internationalization

The application supports both Arabic and English with automatic text direction handling:

```tsx
import { useTranslation } from "react-i18next";

const { i18n } = useTranslation();
i18n.changeLanguage("ar"); // Switch to Arabic
i18n.changeLanguage("en"); // Switch to English
```

## 📂 Project Structure

```
halakah/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── store/         # Redux store configuration
│   │   ├── locales/       # i18n translations
│   │   └── types.ts       # TypeScript definitions
│   └── package.json
├── server/                 # Hono backend application
│   ├── src/
│   │   ├── modules/       # API route modules
│   │   ├── db/           # Database schema and migrations
│   │   ├── middleware/   # Custom middleware
│   │   └── index.ts      # Server entry point
│   └── package.json
├── shared/                 # Shared utilities and types
└── package.json           # Root workspace configuration
```

## 🛠️ Available Scripts

### Root Level

- `bun run dev` - Start both client and server in development mode
- `bun run build` - Build both applications for production
- `bun run dev:client` - Start only the client application
- `bun run dev:server` - Start only the server application

### Server (`/server`)

- `bun run dev` - Start server in development mode
- `bun run build` - Build server for production
- `bun run db:reset` - Reset database
- `bun run db:gen` - Generate database migrations
- `bun run db:push` - Push schema changes to database
- `bun run db:seed` - Seed database with initial data

### Client (`/client`)

- `bun run dev` - Start client in development mode
- `bun run build` - Build client for production
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier
- `bun run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🔗 Links

- Frontend: http://localhost:3000 (development)
- Backend API: http://localhost:4000 (development)
