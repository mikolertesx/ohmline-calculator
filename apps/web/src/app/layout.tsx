export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta property="og:title" content="Ohmline Calculator" />
      <body>{children}</body>
    </html>
  );
}
