"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Post {
  id: number
  caption: string
  images: string[]
  timestamp: string
}

export default function ProfilePage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    // Load user posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem("userPosts") || "[]")
    setPosts(savedPosts)
  }, [])

  return (
    <div className="min-h-screen bg-[#fdfbf4] w-full">
      <div className="w-full bg-[#fdfbf4] flex flex-col">
        <div className="relative">
          <svg
            viewBox="0 0 400 120"
            className="w-full h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32"
            style={{ backgroundColor: "#f4a261" }}
          >
            <path d="M0,0 L400,0 L400,60 Q200,100 0,60 Z" fill="#f4a261" />
          </svg>
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-2 sm:pt-3">
            <div className="text-xs sm:text-sm font-medium text-gray-800">9:41</div>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-1 h-2 sm:h-3 bg-gray-800 rounded-full"></div>
                <div className="w-1 h-2 sm:h-3 bg-gray-800 rounded-full"></div>
                <div className="w-1 h-2 sm:h-3 bg-gray-800 rounded-full"></div>
                <div className="w-1 h-2 sm:h-3 bg-gray-600 rounded-full"></div>
              </div>
              <svg className="w-3 h-2 sm:w-4 sm:h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <div className="w-4 sm:w-6 h-2 sm:h-3 border border-gray-800 rounded-sm">
                <div className="w-3 sm:w-4 h-1 sm:h-2 bg-gray-800 rounded-sm m-0.5"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-6 sm:top-8 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600">ChoMee</h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 pb-32 flex-1">
          <div className="max-w-6xl mx-auto">
            {/* Profile Section */}
            <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mb-6 sm:mb-8 md:mb-12">
              <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <img
                    src="/diverse-user-avatars.png"
                    alt="User avatar"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full bg-gray-300"
                  />
                  <div>
                    <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-blue-600 mb-1 sm:mb-2">
                      Mihaaa
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-1">
                      大学生 関東住み
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700">
                      キャンプ飯上げがちです
                    </p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-6 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                  💬
                </button>
              </div>

              {/* Hobby Tags */}
              <div className="bg-orange-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 mb-4 sm:mb-6 md:mb-8">
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  {["キャンプ", "編み物", "盆栽", "車", "ピアノ"].map((hobby, index) => (
                    <span
                      key={index}
                      className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-orange-700 font-medium"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-orange-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-pink-500 rounded"></div>
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-600 font-medium">
                      miihhaaa24
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-black rounded"></div>
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-600 font-medium">
                      tomatogasuki_camp
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-blue-600 rounded"></div>
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-600 font-medium">
                      tomatoai_daisuki
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="aspect-square">
                    <img
                      src={post.images[0] || "/placeholder.svg"}
                      alt="User post"
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                    />
                  </div>
                ))
              ) : (
                // Default sample images when no posts exist
                <>
                  <div className="aspect-square">
                    <img
                      src="/forest-camping-tent.png"
                      alt="Camping"
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                    />
                  </div>
                  <div className="aspect-square">
                    <img
                      src="/cooking-recipe.png"
                      alt="Cooking"
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                    />
                  </div>
                  <div className="aspect-square">
                    <img
                      src="/knitting-yarn-and-needles.jpg"
                      alt="Knitting"
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                    />
                  </div>
                  <div className="aspect-square">
                    <img
                      src="/bonsai-tree-in-pot.jpg"
                      alt="Bonsai"
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

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
            <Link href="/community">
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
            <Link href="/">
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
