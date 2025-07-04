export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* No Navbar or Footer here */}
        {children}
      </body>
    </html>
  );
}
