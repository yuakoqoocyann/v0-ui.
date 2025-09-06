"use client"

import { useState } from "react"
import Link from "next/link"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState<"people" | "communities">("people")

  // Mock data for demonstration
  const mockPeople = [
    { id: 1, name: "Mihaaa", bio: "キャンプ飯上げがちです", avatar: "/placeholder.svg?height=50&width=50" },
    { id: 2, name: "もなか", bio: "今年初？", avatar: "/placeholder.svg?height=50&width=50" },
    { id: 3, name: "Takumi", bio: "ピースで", avatar: "/placeholder.svg?height=50&width=50" },
    { id: 4, name: "よう", bio: "飛騨高山行きました！", avatar: "/placeholder.svg?height=50&width=50" },
  ]

  const mockCommunities = [
    { id: 1, name: "キャンプ愛好会", members: 1234, description: "アウトドア好きが集まるコミュニティ" },
    { id: 2, name: "編み物サークル", members: 567, description: "手作り作品を共有しましょう" },
    { id: 3, name: "盆栽の会", members: 890, description: "盆栽の育て方を学ぼう" },
    { id: 4, name: "ピアノ愛好者", members: 432, description: "ピアノ演奏を楽しむ仲間たち" },
  ]

  const filteredPeople = mockPeople.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.bio.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCommunities = mockCommunities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#fdfbf4]">
      <div className="w-full bg-[#fdfbf4] flex flex-col">
        {/* Header with curved orange wave */}
        <header className="relative w-full h-[200px] lg:h-[250px] xl:h-[300px] overflow-hidden">
          <h1
            className="absolute top-5 left-10 lg:top-8 lg:left-16 xl:top-12 xl:left-24 font-bold text-4xl lg:text-6xl xl:text-8xl text-[#236483] z-10"
            style={{
              fontFamily: "Fredoka One, cursive",
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            ChoMee
          </h1>
          <svg
            className="absolute bottom-0 left-0 w-full h-[200px] lg:h-[250px] xl:h-[300px]"
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

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 xl:p-12 pb-48 lg:pb-56 xl:pb-64">
          <div className="w-full">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#236483] mb-6 lg:mb-8 text-center">検索</h2>

            {/* Search Input */}
            <div className="mb-6 lg:mb-8">
              <input
                type="text"
                placeholder="人やコミュニティを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 lg:p-6 text-lg lg:text-xl rounded-2xl border-2 border-gray-300 focus:border-[#236483] focus:outline-none"
              />
            </div>

            {/* Search Type Toggle */}
            <div className="flex mb-6 lg:mb-8 bg-gray-200 rounded-2xl p-2">
              <button
                onClick={() => setSearchType("people")}
                className={`flex-1 py-3 lg:py-4 px-6 lg:px-8 rounded-xl font-semibold text-lg lg:text-xl transition-all ${
                  searchType === "people" ? "bg-[#236483] text-white" : "text-[#236483] hover:bg-gray-300"
                }`}
              >
                人
              </button>
              <button
                onClick={() => setSearchType("communities")}
                className={`flex-1 py-3 lg:py-4 px-6 lg:px-8 rounded-xl font-semibold text-lg lg:text-xl transition-all ${
                  searchType === "communities" ? "bg-[#236483] text-white" : "text-[#236483] hover:bg-gray-300"
                }`}
              >
                コミュニティ
              </button>
            </div>

            {/* Search Results */}
            <div className="space-y-4 lg:space-y-6">
              {searchType === "people"
                ? filteredPeople.map((person) => (
                    <div
                      key={person.id}
                      className="bg-white rounded-2xl p-4 lg:p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-4 lg:space-x-6">
                        <img
                          src={person.avatar || "/placeholder.svg"}
                          alt={person.name}
                          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg lg:text-xl text-[#236483]">{person.name}</h3>
                          <p className="text-gray-600 text-sm lg:text-base">{person.bio}</p>
                        </div>
                        <button className="bg-[#F49342] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                          フォロー
                        </button>
                      </div>
                    </div>
                  ))
                : filteredCommunities.map((community) => (
                    <div
                      key={community.id}
                      className="bg-white rounded-2xl p-4 lg:p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg lg:text-xl text-[#236483] mb-2">{community.name}</h3>
                          <p className="text-gray-600 text-sm lg:text-base mb-2">{community.description}</p>
                          <p className="text-gray-500 text-xs lg:text-sm">{community.members}人のメンバー</p>
                        </div>
                        <button className="bg-[#236483] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                          参加
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </main>

        {/* Footer with curved blue wave and navigation */}
        <footer className="fixed bottom-0 left-0 right-0 w-full h-[160px] lg:h-[200px] xl:h-[250px] overflow-hidden">
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
                <svg
                  className="w-9 h-9 lg:w-12 lg:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
    </div>
  )
}
