import { bskySession } from "../session";

export const serverAgent = async function(){
    try {
        const agent = await bskySession();
        return agent;
    } catch (error : any) {
        console.log(error.message)
        throw new Error("Cannot get agent");
    }
}