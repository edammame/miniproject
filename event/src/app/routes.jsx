"use client";

import { ThemeProvider } from "@material-tailwind/react";

export default function ThemeClient({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
