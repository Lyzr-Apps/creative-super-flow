'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: {
    id: string
    content: string
    sender: 'user' | 'agent'
    timestamp: Date
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={cn(
      'flex w-full',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'max-w-xs lg:max-w-md px-4 py-3 rounded-lg',
        isUser
          ? 'bg-blue-600 text-white rounded-br-none'
          : 'bg-gray-100 text-gray-900 rounded-bl-none'
      )}>
        <p className="text-sm md:text-base break-words whitespace-pre-wrap">
          {message.content}
        </p>
        <span className={cn(
          'text-xs mt-1 block',
          isUser ? 'text-blue-100' : 'text-gray-500'
        )}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  )
}
