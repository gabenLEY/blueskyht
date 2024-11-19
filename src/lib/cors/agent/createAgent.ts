import AtpAgent from "@atproto/api";

export const createAgent = async (service: string) => {
    return new AtpAgent({
        service,
    });
}