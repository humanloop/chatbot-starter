import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const chatResponse = await openai.chat.completions.create({
    messages,
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      stream: true
  })

  return new StreamingTextResponse(OpenAIStream(chatResponse))
}