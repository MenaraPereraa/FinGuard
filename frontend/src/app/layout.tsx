import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers"; 

export const metadata: Metadata = {
  title: "FinGuard - Real-Time Fraud Detection & Risk Scoring Engine",
  description: "Enterprise-grade real-time fraud detection platform built with Next.js, Go, Kafka, and PostgreSQL.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}