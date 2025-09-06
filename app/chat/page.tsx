"use client"

import type React from "react"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"

interface Message {
  id: number
  user: string
  message: string
  timestamp: string
  avatar: string
}

export default function ChatRoomPage() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get("roomId") || "1"
  const roomName = searchParams.get("roomName") || "トークルーム"
  const hobby = searchParams.get("hobby") || "趣味"
  const personalityType = searchParams.get("type") || ""

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "田中さん",
      message: "こんにちは！よろしくお願いします",
      timestamp: "14:30",
      avatar: "👨",
    },
    {
      id: 2,
      user: "佐藤さん",
      message: "初心者ですが、教えてください",
      timestamp: "14:32",
      avatar: "👩",
    },
    {
      id: 3,
      user: "山田さん",
      message: "みなさん、今日もよろしくお願いします！",
      timestamp: "14:35",
      avatar: "🧑",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [members] = useState(45)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        user: "あなた",
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
        avatar: "😊",
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-[#fdfbf4] flex flex-col">
      {/* Header */}
      <header className="relative w-full h-[120px] lg:h-[150px] xl:h-[180px] overflow-hidden">
        <h1
          className="absolute top-5 left-10 lg:left-16 xl:left-24 font-bold text-4xl lg:text-5xl xl:text-6xl text-[#236483] z-10"
          style={{
            fontFamily: "Fredoka One, cursive",
            textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          ChoMee
        </h1>
        <svg
          className="absolute bottom-0 left-0 w-full h-[120px] lg:h-[150px] xl:h-[180px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            fill="#F49342"
            fillOpacity="0.53"
            d="M0,100 C240,200 480,0 720,100 C960,200 1200,0 1440,100 L1440,0 L0,0 Z"
          ></path>
        </svg>
      </header>

      {/* Chat Room Info */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-4 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{roomName}</h2>
          <p className="text-sm sm:text-base text-gray-600">
            {hobby} • {members}人が参加中
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-4 pb-32 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.user === "あなた" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${message.user === "あなた" ? "order-2" : "order-1"}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{message.avatar}</span>
                  <span className="text-sm font-medium text-gray-700">{message.user}</span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <div
                  className={`p-3 rounded-2xl ${
                    message.user === "あなた" ? "bg-blue-500 text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  <p className="text-sm sm:text-base">{message.message}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="fixed bottom-[160px] lg:bottom-[200px] xl:bottom-[250px] left-0 right-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-medium transition-colors"
          >
            送信
          </button>
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed bottom-[200px] lg:bottom-[240px] xl:bottom-[290px] left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16 2xl:left-24 2xl:right-24">
        <div className="max-w-4xl mx-auto">
          <Link href={`/hobby-rooms?hobby=${hobby}${personalityType ? `&type=${personalityType}` : ""}`}>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors">
              ← トークルーム一覧に戻る
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full h-[160px] lg:h-[200px] xl:h-[250px] overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-[160px] lg:h-[200px] xl:h-[250px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            fill="#1C668B"
            fillOpacity="0.53"
            d="M0,100 C240,0 480,200 720,100 C960,0 1200,200 1440,100 L1440,200 L0,200 Z"
          ></path>
        </svg>

        <div className="absolute bottom-5 lg:bottom-8 w-full flex justify-around items-center px-8 lg:px-16">
          {/* Search Icon */}
          <Link href="/search">
            <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
              <svg className="w-9 h-9 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </Link>

          {/* Profile + Arrow Icon */}
          <Link href="/community">
            <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
              <div className="w-10 h-10 lg:w-14 lg:h-14">
                <svg
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full transform scale-140 mt-2"
                >
                  <circle cx="32" cy="16" r="11" fill="none" stroke="white" strokeWidth="6" />
                  <path
                    d="M25 25 Q20 40 21 48 M41 25 Q46 40 45 48"
                    fill="none"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <line x1="4" y1="28" x2="15" y2="28" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <polyline
                    points="9,23 4,28 9,33"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </Link>

          {/* Profile Icon */}
          <Link href="/profile">
            <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
              <svg className="w-8 h-8 lg:w-11 lg:h-11 text-white mt-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>
      </footer>
    </div>
  )
}
