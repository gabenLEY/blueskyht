import { AtpSessionData } from "@atproto/api";

export const hasSessionExpired = (session: AtpSessionData): boolean => {
  if (session.accessJwt) {
    const tokenParts = session.accessJwt.split(".");
    if (tokenParts.length === 3) {
      try {
        const decodedPayload = JSON.parse(atob(tokenParts[1]));
        if (decodedPayload.exp) {
          const expirationTime = decodedPayload.exp * 1000; // JWT exp is in seconds
          return Date.now() >= expirationTime;
        }
      } catch (e) {
        console.error("Failed to decode JWT payload:", e);
      }
    }
  }
  return false; // Return false if expiration can't be determined
};