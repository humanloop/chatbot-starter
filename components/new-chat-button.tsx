'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { buttonVariants } from './ui/button'

export function NewChatButton() {
  const router = useRouter()

  return (
    <button
      onClick={e => {
        e.preventDefault()
        router.refresh()
        router.push('/')
      }}
      className={cn(
        buttonVariants({ size: 'sm', variant: 'outline' }),
        'flex gap-2'
      )}
    >
      Reset Chat
    </button>
  )
}
