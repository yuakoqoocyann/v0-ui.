"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Post {
  id: number
  caption: string
  images: string[]
  timestamp: string
}

interface JoinedRoom {
  id: number
  name: string
  hobby: string
  members: number
  lastMessage: string
}

export default function ProfilePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [joinedRooms, setJoinedRooms] = useState<JoinedRoom[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Mihaaa",
    description: "大学生 関東住み",
    bio: "キャンプ飯上げがちです",
    hobbies: ["キャンプ", "編み物", "盆栽", "車", "ピアノ"],
    socialMedia: {
      instagram: "miihhaaa24",
      twitter: "tomatogasuki_camp",
      facebook: "tomatoai_daisuki",
    },
  })

  useEffect(() => {
    // Load user posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem("userPosts") || "[]")
    setPosts(savedPosts)

    const savedJoinedRoomDetails = JSON.parse(localStorage.getItem("joinedRoomDetails") || "[]")
    setJoinedRooms(savedJoinedRoomDetails)

    const savedProfile = JSON.parse(localStorage.getItem("profileData") || "{}")
    if (Object.keys(savedProfile).length > 0) {
      setProfileData(savedProfile)
    }
  }, [])

  const saveProfile = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData))
    setIsEditing(false)
  }

  const updateHobbies = (newHobbies: string) => {
    const hobbiesArray = newHobbies
      .split(",")
      .map((h) => h.trim())
      .filter((h) => h.length > 0)
    setProfileData({ ...profileData, hobbies: hobbiesArray })
  }

  return (
    <div className="min-h-screen bg-[#fdfbf4] w-full">
      <div className="w-full bg-[#fdfbf4] flex flex-col">
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

        {/* Content */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 pb-32 flex-1">
          <div className="max-w-6xl mx-auto">
            {/* Profile Section */}
            <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mb-6 sm:mb-8 md:mb-12">
              <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <img
                      src="/diverse-user-avatars.png"
                      alt="User avatar"
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full bg-gray-300"
                    />
                    {joinedRooms.length > 0 && (
                      <div className="mt-2 text-center">
                        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          {joinedRooms.length}ルーム参加中
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-blue-600 bg-white border rounded px-2 py-1 w-full"
                        />
                        <input
                          type="text"
                          value={profileData.description}
                          onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 bg-white border rounded px-2 py-1 w-full"
                        />
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 bg-white border rounded px-2 py-1 w-full"
                          rows={2}
                        />
                      </div>
                    ) : (
                      <div>
                        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-blue-600 mb-1 sm:mb-2">
                          {profileData.name}
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-1">
                          {profileData.description}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700">
                          {profileData.bio}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <button
                      onClick={saveProfile}
                      className="bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-6 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                      保存
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-orange-500 text-white px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-6 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                      編集
                    </button>
                  )}
                  
                </div>
              </div>

              {/* Hobby Tags */}
              <div className="bg-orange-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 mb-4 sm:mb-6 md:mb-8">
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.hobbies.join(", ")}
                    onChange={(e) => updateHobbies(e.target.value)}
                    placeholder="趣味をカンマ区切りで入力"
                    className="w-full bg-white border rounded px-3 py-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    {profileData.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-orange-700 font-medium"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Media Links */}
              <div className="bg-orange-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 mb-4 sm:mb-6 md:mb-8">
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-pink-500 rounded"></div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.socialMedia.instagram}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            socialMedia: { ...profileData.socialMedia, instagram: e.target.value },
                          })
                        }
                        className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-600 font-medium bg-white border rounded px-2 py-1 flex-1"
                      />
                    ) : (
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-600 font-medium">
                        {profileData.socialMedia.instagram}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-black rounded"></div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.socialMedia.twitter}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            socialMedia: { ...profileData.socialMedia, twitter: e.target.value },
                          })
                        }
                        className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-600 font-medium bg-white border rounded px-2 py-1 flex-1"
                      />
                    ) : (
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-600 font-medium">
                        {profileData.socialMedia.twitter}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-blue-600 rounded"></div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.socialMedia.facebook}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            socialMedia: { ...profileData.socialMedia, facebook: e.target.value },
                          })
                        }
                        className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-600 font-medium bg-white border rounded px-2 py-1 flex-1"
                      />
                    ) : (
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-600 font-medium">
                        {profileData.socialMedia.facebook}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {joinedRooms.length > 0 && (
                <div className="bg-blue-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
                  <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-blue-700 mb-3 sm:mb-4">
                    参加中のトークルーム ({joinedRooms.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {joinedRooms.map((room) => (
                      <Link
                        key={room.id}
                        href={`/hobby-rooms?hobby=${encodeURIComponent(room.hobby)}`}
                        className="block bg-white rounded-lg p-3 sm:p-4 hover:bg-blue-50 transition-colors border border-blue-200"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-xs sm:text-sm md:text-base text-blue-600 mb-1">
                              {room.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 mb-1">{room.hobby}</p>
                            <p className="text-xs text-gray-500 mb-1">{room.members}人参加中</p>
                            <p className="text-xs text-gray-400 truncate">{room.lastMessage}</p>
                          </div>
                          <svg
                            className="w-4 h-4 text-blue-400 flex-shrink-0 ml-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
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
