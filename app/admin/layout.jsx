import AdminShell from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Admin Console | Apollo JBP Hospitals Jabalpur",
  description:
    "Manage doctors, appointments, events, case studies, health library and banners.",
};

export default async function AdminLayout({ children }) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/login");
  }

  return <AdminShell initialUser={session}>{children}</AdminShell>;
}
