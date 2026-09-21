import "./globals.css";

export const metadata = {
  title: "Automation Hub",
  description: "Configure workflows, generate blueprints, and activate integrations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
