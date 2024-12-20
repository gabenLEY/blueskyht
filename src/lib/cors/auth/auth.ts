import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { Session, User, NextAuthOptions } from 'next-auth';
import { loadService } from '~/app/api/auth/indentity/loadService';
import { createAgent } from '~/lib/cors/agent/createAgent';
import { jwtDecode } from 'jwt-decode';
import { JWT } from 'next-auth/jwt';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ExtendedJWT extends JWT {
  id: string;
  service: string;
  handle: string;
  email: string;
  emailConfirmed: boolean;
  bskySession: any; 
}
/* eslint-disable @typescript-eslint/no-explicit-any */

interface Credentials {
  handle: string;
  password: string;
}

const handleAuthorization = async (credentials: Credentials | undefined): Promise<User | null> => {
  if (!credentials) return null;

  try {
    const service = await loadService(credentials.handle);
    const agent = await createAgent(service);
    const response = await agent.login({
      identifier: credentials.handle,
      password: credentials.password,
    });

    if (response.success && agent.session) {
      const user: User = {
        id: agent.did || "",
        service: service || "",
        handle: agent.session.handle || "",
        email: agent.session.email || "",
        emailConfirmed: agent.session.emailConfirmed ?? false,
        bskySession: agent.session || "",
      };
      return user;
    }
  } catch (error) {
    console.error('Authorization failed:', error);
  }

  return null;
};

const handleJwtCallback = async (token: ExtendedJWT, user?: User): Promise<ExtendedJWT> => {
  if (user && user.bskySession) {
    token.service = user.service;
    token.id = user.id;
    token.handle = user.handle;
    token.email = user.email;
    token.emailConfirmed = user.emailConfirmed;
    token.bskySession = user.bskySession;
  }

  return token;
};

const handleSessionCallback = async (session: Session, token: ExtendedJWT): Promise<Session> => {
  const agent = await createAgent(token.service);

  session.user.service = token.service;
  session.user.email = token.email;
  session.user.id = token.id;
  session.user.handle = token.handle;
  session.user.emailConfirmed = token.emailConfirmed;
  session.user.bskySession = token.bskySession;

  const refresh_token: { iat: number; exp: number } = jwtDecode(token.bskySession.refreshJwt);

  const now = Date.now();

  // Check if refresh token is expired
  if (now >= refresh_token.exp * 1000) {
    throw new Error("Refresh token expired");
  }

  // If access token is expired, refresh session
  if (now >= refresh_token.exp * 1000) {
    //console.log("Access token expired, refreshing");

    const { data } = await agent.com.atproto.server.refreshSession(
      undefined,
      {
        headers: {
          authorization: "Bearer " + session.user.bskySession.refreshJwt,
        },
      }
    );

    session.user.bskySession.refreshJwt = data.refreshJwt;
    session.user.bskySession.accessJwt = data.accessJwt;
    session.user.handle = data.handle;
    session.user.id = data.did;
  }

  return session;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "bluesky",
      name: 'Bsky',
      credentials: {
        handle: {
          label: 'Username',
          type: 'text'
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials | undefined): Promise<User | null> {
        return await handleAuthorization(credentials);
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      return await handleJwtCallback(token as ExtendedJWT, user);
    },

    async session({ session, token }) {
      return await handleSessionCallback(session, token as ExtendedJWT);
    },
  },
} satisfies NextAuthOptions;


const handler = NextAuth(authOptions);

export { handler as Get, handler as POST };