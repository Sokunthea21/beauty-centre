// This file redirects to the dashboard
import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('admin/dashboard');
}
// src/app/admin/dashboard/page.tsx
