import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Common layout elements can go here, e.g., navbar */}
        {children}  {/* This renders the page.tsx content */}
      </body>
    </html>
  );
}
