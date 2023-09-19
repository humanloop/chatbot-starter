'use client'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { buttonVariants } from './ui/button'
import { IconPlus } from './ui/icons'
import { useRouter } from 'next/navigation'

export function NewChatButton() {
  const router = useRouter()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
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
          <IconPlus />
          New Chat
          <span className="sr-only">New Chat</span>
        </button>
      </TooltipTrigger>
      <TooltipContent>New Chat</TooltipContent>
    </Tooltip>
  )
}
