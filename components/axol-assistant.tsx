"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  X,
  Send,
  Gamepad2,
  Code,
  Wrench,
  HelpCircle,
  Bot,
  Database,
  BarChart3,
  Wifi,
  WifiOff,
  RefreshCw,
} from "lucide-react"

interface AIMessage {
  id?: string
  content: string
  isUser: boolean
  timestamp: Date
  sessionId: string
}

class AIService {
  private sessionId: string

  constructor() {
    this.sessionId = Math.random().toString(36).substring(7)
  }

  getSessionId(): string {
    return this.sessionId
  }

  isConnected(): boolean {
    return false // Offline mode
  }

  async refreshConnection(): Promise<boolean> {
    return false // Always offline for now
  }

  async getAnalytics(): Promise<any> {
    return {
      totalMessages: 0,
      sessionsToday: 1,
    }
  }

  async generateResponse(input: string): Promise<{ content: string }> {
    const responses = [
      "That's a great question! Xeno Interactions is focused on creating innovative gaming experiences with VR technology.",
      "I'd be happy to help you learn more about our projects like Tropik, The Waking Soul, and our upcoming releases.",
      "Our team is passionate about game development and we're always working on exciting new features and immersive experiences.",
      "Feel free to explore our projects page to see what we're currently working on! We have some amazing VR games in development.",
      "Is there anything specific about our games, development process, or team you'd like to know more about?",
      "We're building the future of gaming with cutting-edge VR technology and innovative gameplay mechanics.",
      "Our mod editor for Unity is coming soon with Tropik, which will allow players to create their own content!",
    ]

    return {
      content: responses[Math.floor(Math.random() * responses.length)],
    }
  }
}

export default function AxolAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [aiService] = useState(() => new AIService())
  const [isConnected, setIsConnected] = useState(false)
  const [analytics, setAnalytics] = useState<any>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    initializeChat()
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initializeChat = async () => {
    try {
      console.log("Initializing Axol Assistant...")

      const connected = aiService.isConnected()
      setIsConnected(connected)
      console.log(`Connection status: ${connected ? "connected" : "offline"}`)

      const welcomeMessage: AIMessage = {
        content:
          "Hey! I'm Axol, your AI companion! 🐠 I'm currently running in offline mode, but I can still chat with you about our VR projects, team, and everything we're building at Xeno Interactions!",
        isUser: false,
        timestamp: new Date(),
        sessionId: aiService.getSessionId(),
      }
      setMessages([welcomeMessage])

      try {
        const analyticsData = await aiService.getAnalytics()
        setAnalytics(analyticsData)
        console.log("Analytics loaded:", analyticsData)
      } catch (error) {
        console.warn("Failed to load analytics:", error)
      }
    } catch (error) {
      console.error("Failed to initialize chat:", error)
      setIsConnected(false)

      setMessages([
        {
          id: "fallback",
          content:
            "Hey! I'm Axol, your AI companion! 🐠 I'm running in offline mode right now, but I can still chat with you about our amazing VR projects and team!",
          isUser: false,
          timestamp: new Date(),
          sessionId: aiService.getSessionId(),
        },
      ])
    }
  }

  const handleRefreshConnection = async () => {
    setIsRefreshing(true)
    try {
      console.log("Refreshing connection...")
      const connected = await aiService.refreshConnection()
      setIsConnected(connected)

      const analyticsData = await aiService.getAnalytics()
      setAnalytics(analyticsData)

      console.log(`Connection refreshed: ${connected ? "connected" : "offline"}`)
    } catch (error) {
      console.error("Failed to refresh connection:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: AIMessage = {
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
      sessionId: aiService.getSessionId(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      console.log("Generating AI response...")
      const response = await aiService.generateResponse(currentInput)

      setTimeout(
        () => {
          const aiMessage: AIMessage = {
            content: response.content,
            isUser: false,
            timestamp: new Date(),
            sessionId: aiService.getSessionId(),
          }

          setMessages((prev) => [...prev, aiMessage])
          setIsTyping(false)

          setIsConnected(aiService.isConnected())
          console.log("AI response generated successfully")
        },
        800 + Math.random() * 1200,
      )
    } catch (error) {
      console.error("Error generating response:", error)

      const fallbackMessage: AIMessage = {
        content:
          "I'm having some technical difficulties right now, but I'm still here to chat! 😅 Try asking me about our VR projects - I know a lot about Tropik, The Waking Soul, and our amazing team!",
        isUser: false,
        timestamp: new Date(),
        sessionId: aiService.getSessionId(),
      }

      setMessages((prev) => [...prev, fallbackMessage])
      setIsTyping(false)
    }
  }

  const handleQuickAction = async (action: string) => {
    const quickPrompts = {
      "game-help": "Tell me about your VR games!",
      "mod-help": "How does modding work with your games?",
      "dev-help": "What's your development process like?",
      "general-help": "What makes Xeno Interactions special?",
    }

    const prompt = quickPrompts[action as keyof typeof quickPrompts]
    if (prompt) {
      setInputValue(prompt)
      setTimeout(() => {
        handleSendMessage()
      }, 100)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Enhanced Floating Circle with Connection Status */}
      <div
        className={`fixed bottom-28 right-8 w-20 h-20 cursor-pointer z-[9997] transition-all duration-500 ease-out ${
          isOpen ? "scale-90 opacity-75" : "scale-100 opacity-100 hover:scale-110"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Main Circle */}
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl">
          {/* Pulse Rings - Slower animation */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-pulse-slow" />
          <div
            className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />

          {/* Inner Glow */}
          <div className="absolute inset-2 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full backdrop-blur-sm" />

          {/* Icon Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl animate-bounce-slow" style={{ animationDuration: "3s" }}>
              🐠
            </div>
          </div>

          {/* Connection Status Indicator */}
          <div
            className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
              isConnected
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : "bg-gradient-to-r from-orange-400 to-red-500"
            }`}
          >
            {isConnected ? <Wifi className="w-3 h-3 text-white" /> : <WifiOff className="w-3 h-3 text-white" />}
          </div>

          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <Database className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Chat Interface */}
      <div
        className={`fixed bottom-28 right-8 w-96 max-h-[36rem] bg-black/95 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl z-[9996] transition-all duration-500 ease-out transform-gpu ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0 rotate-0"
            : "scale-75 opacity-0 translate-y-8 rotate-3 pointer-events-none"
        }`}
      >
        {/* Enhanced Header with Connection Status */}
        <div className="flex items-center justify-between p-6 border-b border-blue-500/10 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <div className="flex items-center gap-4">
            {/* Avatar with Animation */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl animate-pulse">🐠</span>
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black animate-pulse ${
                  isConnected ? "bg-green-500" : "bg-orange-500"
                }`}
              />
            </div>

            {/* Info */}
            <div>
              <h4 className="text-white font-bold text-lg">Axol Assistant</h4>
              <div className="flex items-center gap-2 text-sm">
                {isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                <span className={`font-medium ${isConnected ? "text-green-400" : "text-orange-400"}`}>
                  {isConnected ? "Firebase Connected" : "Offline Mode"}
                </span>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={handleRefreshConnection}
              disabled={isRefreshing}
              title="Refresh connection"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
            {analytics && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                onClick={() => console.log("Analytics:", analytics)}
                title={`${analytics.totalMessages || 0} messages (local)`}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            )}
            <button
              className="p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <X
                size={20}
                className="text-gray-400 group-hover:text-red-400 group-hover:rotate-90 transition-all duration-200"
              />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <div
              key={message.id || index}
              className={`flex gap-3 animate-in slide-in-from-bottom-2 duration-300`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {!message.isUser && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                    <Bot size={16} className="text-white" />
                  </div>
                </div>
              )}

              <div className={`max-w-[80%] ${message.isUser ? "ml-auto" : ""}`}>
                <div
                  className={`p-3 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${
                    message.isUser
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-auto"
                      : "bg-gray-800/80 text-gray-100 border border-gray-700/50"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <div
                  className={`text-xs text-gray-500 mt-1 flex items-center gap-1 ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <WifiOff className="w-3 h-3" />
                  <span>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <Bot size={16} className="text-white" />
                </div>
              </div>
              <div className="bg-gray-800/80 border border-gray-700/50 p-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">Axol is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-blue-500/10">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              {
                key: "game-help",
                icon: Gamepad2,
                label: "Games",
                color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
              },
              {
                key: "mod-help",
                icon: Wrench,
                label: "Modding",
                color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
              },
              {
                key: "dev-help",
                icon: Code,
                label: "Development",
                color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
              },
              {
                key: "general-help",
                icon: HelpCircle,
                label: "Chat",
                color: "from-orange-500/20 to-red-500/20 border-orange-500/30",
              },
            ].map((action) => (
              <button
                key={action.key}
                className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-200 hover:scale-105 hover:shadow-lg group bg-gradient-to-r ${action.color}`}
                onClick={() => handleQuickAction(action.key)}
              >
                <action.icon size={16} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium text-white">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area with Connection Status */}
        <div className="p-4 border-t border-blue-500/10 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Chat with me about anything..."
              className="flex-1 bg-gray-800/50 border-gray-600/50 focus:border-blue-500/50 text-white placeholder-gray-400 rounded-xl transition-all duration-200"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-200 rounded-xl px-4 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTyping ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </Button>
          </div>

          {/* Connection Status */}
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <WifiOff className="w-3 h-3" />
              Offline Mode
            </span>
            {analytics && <span>{analytics.totalMessages} messages (local)</span>}
          </div>
        </div>
      </div>
    </>
  )
}
