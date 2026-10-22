import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { deskHome } from "@/lib/roles";

export default async function AdminIndexPage() {
  const session = await getServerSession(authOptions);
  redirect(deskHome(session?.user?.role));
}
