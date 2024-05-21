import { Inter } from "next/font/google";
import NavbarNavigation from './components/Navbar';
import './globals.css';
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GitWatch",
  description: "Trend GitHub OpenSource Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <Providers>
          <NavbarNavigation />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
