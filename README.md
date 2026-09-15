# Finance Tracker

A personal finance manager built with Next.js that helps you track your income, expenses, and financial goals. This project was created for learning Next.js and is not intended for production use with real financial data.

> **Note:** Account balances and transaction data are not encrypted as this is a learning project. While you can use this application with Neon DB for personal usage, please be aware of the security limitations. If you choose to use it with real financial information, do so at your own risk and consider implementing additional security measures.

## Features

- **Dashboard**: Overview of income, expenses, savings with charts and recent transactions
- **Transactions**: Manage and filter transactions by date, category, and type
- **Categories**: Create and manage custom expense and income categories
- **Reports & Analytics**: View financial reports with charts and download options
- **Budget Planning**: Set monthly budgets per category and track spending
- **Accounts**: Manage bank accounts, cash, and credit cards
- **Profile & Settings**: Customize app settings and manage user information
- **Authentication**: Sign up, sign in, and password reset functionality

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: react-chartjs-2 + chart.js
- **Icons**: Heroicons
- **Forms**: react-hook-form
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL (via Neon DB)
- **Email Service**: RESEND
- **State Management**: React Hooks, Context API
- **Dark Mode**: Fully supported with toggle functionality

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL database (Neon DB recommended)
- RESEND account for email functionality

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/hiranyasemindi/finance-tracker.git](https://github.com/hiranyasemindi/finance-tracker.git)
   cd finance-tracker