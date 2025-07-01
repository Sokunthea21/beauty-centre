// This layout will apply only to /admin and its nested routes

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      {/* Example: replace this with a sidebar or top nav */}
      {/* <aside className="sidebar">Admin Sidebar</aside> */}
      <main>{children}</main>
    </div>
  );
}
