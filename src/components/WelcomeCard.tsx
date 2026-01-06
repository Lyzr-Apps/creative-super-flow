'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface WelcomeCardProps {
  suggestedQuestions: string[]
  onSuggestedQuestion: (question: string) => void
}

export default function WelcomeCard({
  suggestedQuestions,
  onSuggestedQuestion
}: WelcomeCardProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md p-8 text-center border border-gray-200 shadow-sm bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hi! Welcome
          </h2>
          <p className="text-gray-600 text-sm">
            Ask me anything about my professional background, experience, skills, and education.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-4">
            Suggested questions
          </p>
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              onClick={() => onSuggestedQuestion(question)}
              variant="outline"
              className="w-full text-left justify-start h-auto py-2 px-3 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 whitespace-normal"
            >
              {question}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
