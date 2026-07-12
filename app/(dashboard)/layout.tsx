import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { Sidebar } from "@/components/Sidebar";
import { Providers } from "@/components/Providers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <Providers>
      <div className="flex min-h-screen bg-zinc-50">
        <Sidebar role={session.role} name={session.name} email={session.email} />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </Providers>
  );
}
