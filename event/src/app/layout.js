import { Inter } from "next/font/google";
import "./globals.css";
import ThemeClient from "./routes/themeclient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event",
  description: "Event Miniproject",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeClient>
          <div>{children}</div>
        </ThemeClient>
      </body>
    </html>
  );
}
