import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// GET
export const GET = async ( req, {params} ) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")

        if (!prompt) return new Response("Prompt not found!", {status: 404});
        
        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to get prompt", {
            status: 500
        })
    }
}
export const PATCH = async(req, {params}) => {
    const {prompt, tag} = await req.json();
    try {
        await connectToDB()

        const existsPrompt = await Prompt.findById(params.id)

        if (!existsPrompt) return new Response("Prompt not found!", {status: 404});

        existsPrompt.prompt = prompt;
        existsPrompt.tag = tag;

        await existsPrompt.save();

        return new Response(JSON.stringify(existsPrompt), {status: 200})

    } catch {
        return new Response("Failed to update prompt", {
            status: 500
        })
    }
}
// Delete
export const DELETE = async (req, {params}) => {
    try {
        await connectToDB()

        await Prompt.findByIdAndRemove(params.id)

        return new Response("Prompt delete successfully!", {status: 200})

    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500})        
    }
}