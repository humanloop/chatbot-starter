import { PromptCallStreamResponse } from 'humanloop/api'
import { Stream } from 'humanloop/core/streaming-fetcher/Stream'

/**
 * Converts the Humanloop stream to a stream of just text
 *
 * (This is only necessary to make this work nicely with the ai package's useChat hook)
 *
 * @param input a stream of Humanloop responses { output: string, id: string }
 * @returns a stream of just text
 */
export function HumanloopStream(
  input: Stream<PromptCallStreamResponse>
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()

  return new ReadableStream({
    async pull(controller) {
      for await (const value of input) {
        if (typeof value.output === 'string') {
          const encodedValue = encoder.encode(value.output)
          controller.enqueue(encodedValue)
        }
      }
      controller.close()
    }
  })
}
