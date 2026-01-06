'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { FiSend } from 'react-icons/fi'
import { FiLoader } from 'react-icons/fi'
import ChatMessage from './ChatMessage'
import WelcomeCard from './WelcomeCard'

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
}

const AGENT_ID = '695d066052ab53b7bf37679f'

const suggestedQuestions = [
  "What's your work experience?",
  "What skills do you have?",
  "Tell me about your education",
  "What are your key qualifications?"
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: AGENT_ID,
          message: text
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      let messageContent = 'Unable to process your question'

      // Extract the actual message content from the response
      if (data.response) {
        if (typeof data.response === 'string') {
          messageContent = data.response
        } else if (typeof data.response === 'object' && data.response !== null) {
          // Extract message from various possible response structures
          messageContent =
            data.response.message ||
            data.response.answer ||
            data.response.result ||
            data.response.response ||
            data.response.data ||
            JSON.stringify(data.response)
        }
      } else if (data.message && typeof data.message === 'string') {
        messageContent = data.message
      }

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: messageContent,
        sender: 'agent',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, agentMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: 'Sorry, I encountered an error processing your question. Please try again.',
        sender: 'agent',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="w-full max-w-2xl h-screen md:h-[90vh] md:max-h-[700px] flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Resume Chat</h1>
        <p className="text-sm text-gray-500 mt-1">Ask me anything about the professional background</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <WelcomeCard
            suggestedQuestions={suggestedQuestions}
            onSuggestedQuestion={handleSuggestedQuestion}
          />
        ) : (
          <>
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}
            {loading && (
              <div className="flex items-center space-x-2 text-gray-500 py-2">
                <FiLoader className="animate-spin" size={20} />
                <span className="text-sm">Thinking...</span>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !loading) {
                handleSendMessage(input)
              }
            }}
            placeholder="Ask about my resume..."
            disabled={loading}
            className="flex-1 bg-gray-50 border-gray-300"
          />
          <Button
            onClick={() => handleSendMessage(input)}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <FiSend size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}
