
import React, { useState, useEffect, useRef } from 'react'

export default function VoraCompanion() {
  const [messages, setMessages] = useState([
    { sender: 'vora', text: 'Hello, I’m VORA. Ask me anything about NAVORA.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messageEndRef = useRef(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { sender: 'user', text: input.trim() }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    const response = await fetch('/api/ask-vora', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage.text })
    })
    const data = await response.json()

    setMessages(prev => [...prev, { sender: 'vora', text: data.reply }])
    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      <header className="p-4 text-center font-semibold text-xl border-b">NAVORA AI Companion – Powered by VORA</header>
      <div className="flex-1 p-6 overflow-y-scroll">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 ${msg.sender === 'vora' ? 'text-left' : 'text-right'}`}>
            <div className={`inline-block px-4 py-2 rounded-lg ${msg.sender === 'vora' ? 'bg-blue-100 text-gray-900' : 'bg-gray-900 text-white'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <footer className="p-4 border-t flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask me anything about NAVORA..."
          className="flex-1 p-2 border rounded-md shadow-sm"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </footer>
    </div>
  )
}
