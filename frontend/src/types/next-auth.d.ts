import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isDarkMode: boolean;
      preferredCurrency: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    isDarkMode: boolean;
    preferredCurrency: string;
  }
}