# FinGuard

A full-stack personal finance management application built with Next.js and Go that helps you track your income, expenses, and financial goals. This project was created for learning modern full-stack development and demonstrates best practices in building scalable web applications.

> **Note:** Account balances and transaction data are not encrypted as this is a learning project. While you can use this application with Neon DB for personal usage, please be aware of the security limitations. If you choose to use it with real financial information, do so at your own risk and consider implementing additional security measures.

## Features

- **Dashboard**: Overview of income, expenses, savings with charts and recent transactions
- **Transactions**: Manage and filter transactions by date, category, and type
- **Categories**: Create and manage custom expense and income categories
- **Reports & Analytics**: View financial reports with charts and download options
- **Budget Planning**: Set monthly budgets per category and track spending
- **Accounts**: Manage bank accounts, cash, and credit cards
- **Profile & Settings**: Customize app settings and manage user information
- **Authentication**: Sign up, sign in, and password reset functionality with NextAuth.js

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript, React
- **Styling**: Tailwind CSS
- **Charts**: react-chartjs-2 + chart.js
- **Icons**: Heroicons
- **Forms**: react-hook-form
- **Authentication**: NextAuth.js
- **State Management**: React Hooks, Context API
- **Dark Mode**: Fully supported with toggle functionality

### Backend
- **Language**: Go (v1.20+)
- **Framework**: net/http (Standard Library)
- **Database**: PostgreSQL (via Neon DB)
- **Email Service**: RESEND (for password reset)
- **Configuration**: Go-Dotenv

### Database
- **Primary**: PostgreSQL (via Neon DB)
- **ORM**: Custom Go handlers with SQL queries

## Getting Started

### Prerequisites

- Node.js (v18+)
- Go (v1.20+)
- PostgreSQL database (Neon DB recommended)
- RESEND account for email functionality
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MenaraPereraa/FinGuard.git
   cd FinGuard
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   # or
   yarn
   ```

3. Set up the backend:
   ```bash
   cd ../backend
   go mod download
   ```

4. Configure environment variables:
   
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL="http://localhost:8080"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret"
   RESEND_API_KEY="your_resend_api_key"
   ```

   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL="your_neon_db_connection_string"
   PORT="8080"
   NEXTAUTH_SECRET="your_nextauth_secret"
   RESEND_API_KEY="your_resend_api_key"
   ```

### Running the Application

#### Backend (Go Server)
```bash
cd backend
go run cmd/server/main.go
```
The backend will be available at `http://localhost:8080`

#### Frontend (Next.js Development Server)
```bash
cd frontend
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Setting up Neon DB

1. Create an account at [Neon](https://neon.tech/)
2. Create a new project
3. Create a new database
4. Get your connection string from the dashboard
5. Replace the `DATABASE_URL` in your backend `.env` file with your Neon DB connection string

### Setting up RESEND for Email Functionality

1. Create an account at [RESEND](https://resend.com/)
2. Create an API key
3. Add the API key to both `.env` files as `RESEND_API_KEY`

## Project Structure

```
FinGuard/
├── backend/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go              # Go Server Entry Point
│   ├── internal/
│   │   ├── handlers/                # HTTP Request Handlers
│   │   ├── models/                  # Data Models
│   │   ├── middleware/              # Authentication & Middleware
│   │   └── services/                # Business Logic
│   ├── pkg/
│   │   └── database/                # Database Connection & Utilities
│   └── go.mod
├── frontend/
│   ├── src/
│   │   ├── app/                     # Next.js App Router
│   │   │   ├── (auth)/              # Authenticated Routes
│   │   │   │   ├── accounts/        # Accounts Pages
│   │   │   │   ├── budget/          # Budget Planning Pages
│   │   │   │   ├── categories/      # Categories Pages
│   │   │   │   ├── reports/         # Reports & Analytics Pages
│   │   │   │   ├── transactions/    # Transactions Pages
│   │   │   │   ├── profile/         # User Profile & Settings
│   │   │   │   └── dashboard/       # Main Dashboard
│   │   │   ├── auth/                # Authentication Pages (Login, Register)
│   │   │   ├── layout.tsx           # Root Layout
│   │   │   └── page.tsx             # Home/Landing Page
│   │   ├── components/              # Reusable UI Components
│   │   ├── lib/                     # Utility Functions & Helpers
│   │   ├── hooks/                   # Custom React Hooks
│   │   └── types/                   # TypeScript Interfaces
│   ├── public/                      # Static Assets
│   ├── package.json
│   └── next.config.ts
├── docker-compose.yml               # Docker Compose Configuration
└── LICENSE
```

## Database Schema

The application uses PostgreSQL with the following tables:

- **Users**: Stores user information and credentials
- **Accounts**: Tracks bank accounts, cash, and credit cards
- **Transactions**: Logs income and expense transactions
- **Categories**: Manages expense and income categories
- **Budgets**: Tracks monthly spending limits per category
- **Password Reset Tokens**: Handles password recovery tokens

## Customization

- **Theme**: You can customize the primary colors in the Tailwind configuration (`frontend/tailwind.config.ts`)
- **Currency**: Currency preferences can be changed in the user profile settings
- **Logo & Branding**: Update branding assets in the `frontend/public` directory

## Deployment

### Deploying to Vercel (Frontend)

1. Push your code to a Git repository
2. Import the project in Vercel
3. Set up environment variables in the Vercel dashboard
4. Deploy

### Deploying Backend with Docker

1. Build the Docker image:
   ```bash
   docker build -f backend/Dockerfile -t finguard-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 --env-file backend/.env finguard-backend
   ```

### Using Docker Compose

```bash
docker-compose up -d
```

This will start both the frontend and backend services.

## License

[MIT License](LICENSE) - See the LICENSE file for details.
