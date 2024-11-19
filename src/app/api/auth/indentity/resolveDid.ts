import { HandleResolver } from "@atproto/identity";

export const resolveDid = async (handle: string): Promise<string> => {

  if (typeof window !== "undefined") {
     throw new Error("resolveDid must be used in a server-side environment.");
  }

  const response = new HandleResolver({});
  const did = await response.resolve(handle);
  if (!did) {
    throw new Error("Failed to resolve DID from handle");
  }

  return did;
  };