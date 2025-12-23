import { PropsWithChildren } from "react";
import '@repo/ui/globals.css'
import "./globals.css";

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: PropsWithChildren) {
  return children;
}
