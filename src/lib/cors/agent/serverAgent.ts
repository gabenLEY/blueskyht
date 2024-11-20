import { bskySession } from "../session";

export const serverAgent = async function(){
    try {
        const agent = await bskySession();
        return agent;
    } catch (error) {
        console.log(error)
        throw new Error("Cannot get agent");
    }
}