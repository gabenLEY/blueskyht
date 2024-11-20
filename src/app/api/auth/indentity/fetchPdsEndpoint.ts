export const fetchPdsEndpoint = async (did: string) => {
    const response = await fetch(`https://plc.directory/${did}`);
    if (!response.ok) {
      throw new Error("Failed to fetch DID document");
    }
  
    const didDocument = await response.json();
    const service = didDocument.service?.find((entry: any) => entry.id === "#atproto_pds");
  
    if (!service || !service.serviceEndpoint) {
      throw new Error("PDS service not found in DID document");
    }
  
    return service.serviceEndpoint;
  };