import type { RequestHandler } from "@sveltejs/kit"
import { OPENAI_KEY } from '$env/static/private'

export const POST: RequestHandler =async ({ request }) => {
    try {
        if (!OPENAI_KEY) {
            throw new Error('OPENAI_KEY env var not set')
        }

        const requestData = await request.json()
    } catch (err) {

    }
    return new Response();
    
}
