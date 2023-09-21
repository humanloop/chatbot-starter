/**
 * Converts the Humanloop stream to a stream of just text
 * 
 * (This is only necessary to make this work nicely with the ai package's useChat hook)
 * 
 * @param input a stream of Humanloop responses { output: string, id: string}
 * @returns a stream of just text
 */
export function HumanloopStream(input: ReadableStream): ReadableStream {
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
  