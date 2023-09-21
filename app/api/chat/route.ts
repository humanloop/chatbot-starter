import { HumanloopStream } from '@/lib/humanloop-stream'
import { StreamingTextResponse } from 'ai'
import { Humanloop } from 'humanloop'

export const runtime = 'edge'

const humanloop = new Humanloop({
  useFetch: true, // useFetch must be "true" for humanloop to work in Next.js edge runtime,
  openaiApiKey: process.env.OPENAI_API_KEY,
  apiKey: process.env.HUMANLOOP_API_KEY
})

export async function POST(req: Request) {
  const { messages } = await req.json()
 
  const chatResponse = await humanloop.chatStream({
    project: 'sdk-example',
    messages,
    model_config: {
      model: 'gpt-3.5-turbo',
      temperature: 0.7
    }
  })

  return new StreamingTextResponse(HumanloopStream(chatResponse.data))
}
