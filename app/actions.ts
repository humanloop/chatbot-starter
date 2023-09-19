'use server'

import { type Chat } from '@/lib/types'

export async function shareChat(chat: Chat) {
  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  return payload
}
