import { bskySession } from "../session";

export const serverAgent = async function(){
    try {
        const agent = await bskySession();
        if (!agent) {
            throw new Error("Agent initialization failed: No agent returned.");
        }
        return agent;
    } catch (error) {
        console.log(error)
        throw new Error("Cannot get agent");
    }
}