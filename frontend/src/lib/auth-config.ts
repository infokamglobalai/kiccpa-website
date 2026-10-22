import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { timingSafeEqual } from "crypto";

function safeEqual(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "utf8");
    const bb = Buffer.from(b, "utf8");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase() ?? "";
        const password = credentials?.password ?? "";
        if (!email || !password) return null;

        const api = process.env.BACKEND_PROXY_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000";
        try {
          const response = await fetch(`${api.replace(/\/$/, "")}/api/staff/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          if (response.ok) {
            const staff = (await response.json()) as { id: string; email: string; name: string; role: string };
            return { id: staff.id, email: staff.email, name: staff.name, role: staff.role };
          }
        } catch (error) {
          console.error("[auth] Staff directory unavailable:", error);
        }

        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const adminPass = process.env.ADMIN_PASSWORD ?? "";
        if (!adminEmail || !adminPass) return null;
        if (!safeEqual(email, adminEmail)) return null;
        if (!safeEqual(password, adminPass)) return null;
        return { id: "superadmin", name: "Super admin", email: adminEmail, role: "superadmin" };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "hr";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
