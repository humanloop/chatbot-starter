import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { Humanloop } from 'humanloop'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const humanloop = new Humanloop({
  useFetch: true, // useFetch must be "true" for humanloop to work in Next.js edge runtime,
  openaiApiKey: process.env.OPENAI_API_KEY,
  apiKey: process.env.HUMANLOOP_API_KEY
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages,
  //   temperature: 0.7,
  //   stream: true
  // })
  // // console.log(response)

  const chatResponse = await humanloop.chatStream({
    project: 'sdk-example',
    messages,
    model_config: {
      model: 'gpt-3.5-turbo',
      temperature: 0.7
    }
  })

  // const stream = OpenAIStream(esponse)
  // const stream2 = OpenAIStream(chatResponse.data)
  return new StreamingTextResponse(processStream(chatResponse.data))
}

type StreamData = {
  output: string
  id: string
}

function processStream(input: ReadableStream<StreamData>): ReadableStream {
  const reader = input.getReader()
  const encoder = new TextEncoder()

  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await reader.read()
      if (done) {
        controller.close()
        return
      }

      const decoded = new TextDecoder().decode(value)
      const chunks = decoded
        .split('}')
        .filter(Boolean)
        .map(chunk => JSON.parse(chunk + '}'))

      chunks.forEach(chunk => controller.enqueue(encoder.encode(chunk.output)))
    }
  })
}
