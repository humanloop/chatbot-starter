import { HumanloopStream } from '@/lib/humanloop-stream'
import { StreamingTextResponse } from 'ai'
import { HumanloopClient } from 'humanloop'

export const runtime = 'edge'

const HUMANLOOP_API_KEY = process.env.HUMANLOOP_API_KEY

const client = new HumanloopClient({
  apiKey: HUMANLOOP_API_KEY || ''
})

export async function POST(req: Request) {
  if (!HUMANLOOP_API_KEY) {
    return new Response('Missing HUMANLOOP_API_KEY environment variable', {
      status: 500,
      statusText: 'Missing Humanloop API key'
    })
  }

  const { messages } = await req.json()


  const chatResponse = await client.prompts.callStream({
    path: 'sdk-example',
    messages
  })

  return new StreamingTextResponse(HumanloopStream(chatResponse))
}
