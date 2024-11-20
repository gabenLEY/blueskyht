import { resolveDid } from "./resolveDid";
import { fetchPdsEndpoint } from "./fetchPdsEndpoint";

export const loadService = async (handle: string) => {
    try {
      const did = await resolveDid(handle);
      const service = await fetchPdsEndpoint(did);
      return service;
    } catch (error) {
      //console.error("Error in loadService:", error);
      throw new Error(`loadService failed: ${error}`);
    }
};