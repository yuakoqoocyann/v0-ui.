"use client"

import { useState } from "react"
import Link from "next/link"

export default function CommunityPage() {
  const [posts] = useState([
    {
      id: 1,
      user: { name: "Mihaaa", avatar: "/diverse-user-avatars.png", subtitle: "今年も来ました！" },
      image: "/IMG_0438.jpg",
      likes: 12,
    },
    {
      id: 2,
      user: { name: "ゆあ", avatar: "/diverse-user-avatars.png", subtitle: "今年初？" },
      image: "/IMG_0784.jpg",
      likes: 8,
    },
    {
      id: 3,
      user: { name: "しおり", avatar: "/diverse-user-avatars.png", subtitle: "ピーヌで" },
      image: "/mountain-landscape-view.png",
      likes: 15,
    },
    {
      id: 4,
      user: { name: "よう", avatar: "/diverse-user-avatars.png", subtitle: "城に行きました！" },
      image: "/DSC_2345.jpg",
      likes: 20,
    },
    {
      id: 5,
      user: { name: "あかり", avatar: "/diverse-user-avatars.png", subtitle: "たまや～" },
      image: "/IMG_0687.jpg",
      likes: 6,
    },
    {
      id: 6,
      user: { name: "Takuro", avatar: "/diverse-user-avatars.png", subtitle: "ガンダム実写版" },
      image: "/DSC_1744.jpg",
      likes: 11,
    },
    {
      id: 7,
      user: { name: "Takumi", avatar: "/diverse-user-avatars.png", subtitle: "海辺キャンプ" },
      image: "/beach-camping-ocean-view.jpg",
      likes: 18,
    },
    {
      id: 8,
      user: { name: "ひな", avatar: "/diverse-user-avatars.png", subtitle: "めっちゃおいしかった！" },
      image: "/IMG_9817.jpg",
      likes: 9,
    },
  ])

  const [talkRooms] = useState([
    {
      id: 1,
      name: "キャンプ初心者の部屋",
      description: "キャンプを始めたい人、始めたばかりの人集まれ！",
      members: 124,
      lastMessage: "テント選びのコツを教えて！",
      isActive: true,
    },
    {
      id: 2,
      name: "料理レシピ交換",
      description: "アウトドア料理のレシピをシェアしよう",
      members: 89,
      lastMessage: "簡単スキレット料理のレシピ",
      isActive: true,
    },
    {
      id: 3,
      name: "関東キャンプ場情報",
      description: "関東近郊のおすすめキャンプ場について",
      members: 156,
      lastMessage: "今度の週末空いてるキャンプ場ある？",
      isActive: false,
    },
    {
      id: 4,
      name: "ソロキャンプ愛好会",
      description: "一人キャンプを楽しむ人たちの集まり",
      members: 67,
      lastMessage: "ソロキャンプの魅力について語ろう",
      isActive: true,
    },
  ])

  const [activeTab, setActiveTab] = useState("posts")

  return (
    <div className="min-h-screen bg-[#fdfbf4] w-full">
      <div className="w-full bg-[#fdfbf4] flex flex-col shadow-xl relative">
        {/* Header with curved orange wave */}
        <header className="relative w-full h-[120px] overflow-hidden">
          <h1
            className="absolute top-5 left-10 font-bold text-4xl text-[#236483] z-10"
            style={{
              fontFamily: "Fredoka One, cursive",
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            ChoMee
          </h1>
          <svg
            className="absolute bottom-0 left-0 w-full h-[120px]"
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

        {/* Tab Navigation */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 pt-4">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                activeTab === "posts" ? "bg-[#F49342] text-white" : "bg-white text-[#236483] border border-[#236483]"
              }`}
            >
              投稿
            </button>
            <button
              onClick={() => setActiveTab("talkRooms")}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                activeTab === "talkRooms"
                  ? "bg-[#F49342] text-white"
                  : "bg-white text-[#236483] border border-[#236483]"
              }`}
            >
              トークルーム
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 xl:p-16 pb-32 overflow-y-auto">
          {activeTab === "posts" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className={`bg-white rounded-2xl shadow-md overflow-hidden ${index % 3 === 0 ? "row-span-2" : ""}`}
                >
                  <div className="relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full h-32 md:h-36 lg:h-40 object-cover"
                    />
                    <button className="absolute bottom-2 left-2 text-orange-500 hover:text-orange-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={post.user.avatar || "/placeholder.svg"}
                        alt={post.user.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-sm text-[#236483]">{post.user.name}</p>
                        <p className="text-xs text-gray-600">{post.user.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {talkRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-[#236483]">{room.name}</h3>
                        {room.isActive && <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                      <p className="text-gray-500 text-xs mb-2">最新メッセージ: {room.lastMessage}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                          </svg>
                          {room.members}人
                        </span>
                      </div>
                    </div>
                    <button className="bg-[#F49342] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-500 transition-colors">
                      参加
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Floating Action Button */}
        <Link
          href="/community/post"
          className="fixed bottom-28 right-6 md:right-8 lg:right-12 xl:right-16 w-16 h-16 bg-[#F49342] rounded-full shadow-lg flex items-center justify-center text-white text-3xl font-bold hover:bg-orange-500 transition-colors z-10"
        >
          +
        </Link>

        {/* Footer with curved blue wave and navigation */}
        <footer className="fixed bottom-0 left-0 w-full h-[160px] overflow-hidden">
          <svg
            className="absolute top-0 left-0 w-full h-[160px]"
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

          <div className="absolute bottom-5 w-full flex justify-around items-center px-8">
            {/* Search Icon */}
            <Link href="/community">
              <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <Link href="/">
              <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                <div className="w-10 h-10">
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
                <svg className="w-8 h-8 text-white mt-3" fill="currentColor" viewBox="0 0 20 20">
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
