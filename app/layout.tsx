import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal — Telecom Retention Intelligence",
  description: "A portfolio dashboard for telecom churn, survival, revenue at risk, and customer value analysis.",
  icons: {
    icon: process.env.GITHUB_PAGES === "true" ? "/telecom-churn-analytics/icon.svg" : "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
