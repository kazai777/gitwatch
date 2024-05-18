import { Inter } from "next/font/google";
import Navbar from './components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GitWatch",
  description: "Trend GitHub OpenSource Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
