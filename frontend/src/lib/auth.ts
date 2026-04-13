import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is a placeholder for actual DB verification
        // In a real app, you would check the password against the password in the DB
        if (credentials?.email === "admin@kiccpa.com" && credentials?.password === "admin123") {
          return { id: "1", name: "Admin", email: "admin@kiccpa.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt" as const,
  },
};

export const handler = NextAuth(authOptions);
