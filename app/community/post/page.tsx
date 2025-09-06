"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PostPage() {
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [images, setImages] = useState<File[]>([])
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).slice(0, 5 - images.length)
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // Save post data to localStorage (simulating profile storage)
    const existingPosts = JSON.parse(localStorage.getItem("userPosts") || "[]")
    const newPost = {
      id: Date.now(),
      caption,
      images: images.map((img) => URL.createObjectURL(img)),
      timestamp: new Date().toISOString(),
    }
    existingPosts.push(newPost)
    localStorage.setItem("userPosts", JSON.stringify(existingPosts))

    // Redirect to profile page
    router.push("/profile")
  }

  return (
    <div className="min-h-screen bg-[#fdfbf4] w-full">
      <div className="w-full bg-[#fdfbf4] flex flex-col relative">
        {/* Header with curved orange wave */}
        <header className="relative w-full h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 overflow-hidden">
          <h1
            className="absolute top-3 sm:top-5 md:top-6 lg:top-8 xl:top-10 left-6 sm:left-8 md:left-10 lg:left-12 xl:left-16 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#236483] z-10"
            style={{
              fontFamily: "Fredoka One, cursive",
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            ChoMee
          </h1>
          <svg
            className="absolute bottom-0 left-0 w-full h-full"
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
        <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 pb-32 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* User Profile Section */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
              <img
                src="/diverse-user-avatars.png"
                alt="User avatar"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-gray-300"
              />
              <div>
                <h2 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#236483]">
                  Mihaaa
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[#236483]">
                  タイトルをつけよう！
                </p>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <div className="relative bg-gray-400 rounded-2xl sm:rounded-3xl h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] flex items-center justify-center overflow-hidden">
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full h-full p-2 sm:p-3 md:p-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center text-xs sm:text-sm md:text-base"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2">
                      画像を追加（5枚まで）
                    </p>
                  </div>
                )}

                {images.length < 5 && (
                  <label className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-[#F49342] rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-colors">
                    <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                      +
                    </span>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* Caption Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <p className="text-center text-[#236483] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 sm:mb-3 md:mb-4">
                キャプションを書こう！
              </p>
              <p className="text-center text-[#236483] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-4 sm:mb-6 md:mb-8">
                （200文字まで）
              </p>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value.slice(0, 200))}
                placeholder="投稿の内容を書いてください..."
                className="w-full h-20 sm:h-24 md:h-32 lg:h-40 xl:h-48 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 border border-gray-300 rounded-lg sm:rounded-xl md:rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#F49342] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
              />
              <p className="text-right text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 mt-1 sm:mt-2">
                {caption.length}/200
              </p>
            </div>

            {/* Heart Icon */}
            <div className="flex justify-center mb-6 sm:mb-8 md:mb-12">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 text-[#F49342]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* Submit Button */}
            <div className="max-w-md mx-auto">
              <button
                onClick={handleSubmit}
                className="w-full bg-[#236483] text-white py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8 rounded-lg sm:rounded-xl md:rounded-2xl font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl hover:bg-blue-700 transition-colors"
              >
                投稿する
              </button>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0">
          <svg viewBox="0 0 400 100" className="w-full h-16 sm:h-20 md:h-24">
            <path d="M0,40 Q200,0 400,40 L400,100 L0,100 Z" fill="#6b9dc0" />
          </svg>
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-around items-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
            <Link href="/community">
              <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
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
            <Link href="/">
              <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full transform scale-140 mt-1"
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
            <Link href="/profile">
              <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
