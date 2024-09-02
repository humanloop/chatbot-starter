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
    throw new Error('HUMANLOOP_API_KEY is not set')
  }

  const { messages } = await req.json()

  const chatResponse = await client.prompts.callStream({
    path: 'sdk-example',
    messages
  })

  return new StreamingTextResponse(HumanloopStream(chatResponse))
}
