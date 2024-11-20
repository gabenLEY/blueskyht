/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string;
    handle: string;
    email: string;
    emailConfirmed: boolean;
    service: string;
    bskySession: AtpSessionData;
  }

  interface Session {
    user: User;
  }

  
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

//declare NextAuth;