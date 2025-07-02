import { ReactNode } from "react";

export default function Layout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="p-8">
      <h1 className="text-center uppercase text-[var(--primary)] text-lg mb-6">{title}</h1>
      {children}
    </div>
  );
}
