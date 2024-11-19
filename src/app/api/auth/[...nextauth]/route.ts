import NextAuth from "next-auth/next";
//import { authOptions } from "@/lib/api/auth/auth";
import { authOptions } from "~/lib/cors/auth/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };