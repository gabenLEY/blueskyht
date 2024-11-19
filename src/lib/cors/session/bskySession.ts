import { isServer } from "../utils/isServer";
import { hasSessionExpired } from "../utils/hasSessionExpired";
import { getSession } from "next-auth/react";
import { backSession } from "./backSession";
import { createAgent } from "../agent/createAgent";

export const bskySession = async () => {
  try {


    const session = isServer()
      ? await backSession()
      : await getSession();
      
    if (!session?.user?.bskySession) {
      throw new Error("There is no Active Session");
    }

    const agent = await createAgent(session.user.service);

    const isExpired = hasSessionExpired(session.user.bskySession);
    if (isExpired) {
      const response = await agent.resumeSession(session.user.bskySession);
      if (!response.success) {
        throw new Error("Cannot resume the session");
      }
    }

    agent.sessionManager.session = session.user.bskySession;

    return agent;

  } catch (error) {
    console.error(error);
    throw new Error("Cannot get the Session");
  }
};
