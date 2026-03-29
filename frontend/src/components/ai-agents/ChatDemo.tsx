import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STARTER_QUESTIONS = [
  'What can an AI agent do for my business?',
  'How much does an AI agent cost?',
  'How long does it take to set up?',
  'What kinds of tasks can it automate?',
]

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm the Echols & French AI assistant. Ask me anything about AI agents, web design, or how we can help your business — I'll give you a straight answer.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [backendDown, setBackendDown] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    const userMsg: Message = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setBackendDown(false)

    // Build history excluding the initial greeting
    const history = messages.slice(1)

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })

      if (!res.ok) throw new Error('backend_error')
      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ])
    } catch {
      setBackendDown(true)
      setMessages((prev) => prev.slice(0, -1)) // remove optimistic user message
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Zap className="h-4 w-4" />
            Live Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            Talk to an AI Agent Right Now
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            This is a real AI agent built on Claude. Ask it anything about AI automation or how we can help your business.
          </p>
        </div>

        {/* Chat window */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(15,23,42,0.8)' }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-3 px-5 py-3 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-white/40 text-xs font-medium ml-1">E&F AI Agent — Live Demo</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto px-5 py-5 flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: msg.role === 'assistant' ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {msg.role === 'assistant'
                    ? <Bot className="h-4 w-4 text-blue-400" />
                    : <User className="h-4 w-4 text-white/60" />
                  }
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'text-white rounded-tr-sm'
                      : 'text-white/80 rounded-tl-sm'
                  }`}
                  style={{
                    background: msg.role === 'user'
                      ? '#2563eb'
                      : 'rgba(255,255,255,0.07)',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(59,130,246,0.2)' }}
                >
                  <Bot className="h-4 w-4 text-blue-400" />
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                >
                  <Loader2 className="h-4 w-4 text-white/40 animate-spin" />
                  <span className="text-white/40 text-sm ml-1">Thinking…</span>
                </div>
              </div>
            )}

            {backendDown && (
              <div className="text-center text-white/40 text-sm py-2">
                The AI backend isn't running yet — Docker needs to be started first. Everything else on this page is fully functional!
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Starter chips */}
          {messages.length <= 1 && !loading && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs rounded-full px-3 py-1.5 text-white/60 hover:text-white transition-colors border"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="px-4 py-4 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about AI agents…"
                disabled={loading}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-blue-500/50 disabled:opacity-50"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                size="icon"
                className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-500 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
