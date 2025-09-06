"use client"

import { useState } from "react"
import Link from "next/link"

export default function ChoMeeApp() {
  const [activeButton, setActiveButton] = useState<string | null>(null)

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
        <main className="flex-1 flex justify-center items-center flex-col p-5 lg:p-12 xl:p-20 gap-12 lg:gap-16 xl:gap-24">
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24 items-center justify-center">
              {/* 趣味診断 Button */}
              <Link href="/diagnosis">
                <div className="relative group">
                  <svg
                    width="350"
                    height="220"
                    viewBox="0 0 350 220"
                    className="transition-all duration-300 hover:scale-115 active:scale-95 cursor-pointer"
                  >
                    <defs>
                      <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffc9a0" />
                        <stop offset="100%" stopColor="#ffb380" />
                      </linearGradient>
                      <linearGradient id="orangeGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff9d60" />
                        <stop offset="100%" stopColor="#ff8040" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M60,50 C95,25 145,35 185,30 C240,22 290,42 320,75 C335,100 330,140 310,165 C285,195 235,205 185,200 C135,195 85,175 55,145 C25,115 30,80 60,50 Z"
                      fill="url(#orangeGradient)"
                      className="drop-shadow-lg group-hover:fill-[url(#orangeGradientHover)] transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[#236483] font-bold text-2xl lg:text-3xl mb-3">趣味診断</span>
                    <svg className="w-10 h-10 text-[#236483]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* コミュニティに入る Button */}
              <Link href="/community">
                <div className="relative group">
                  <svg
                    width="370"
                    height="200"
                    viewBox="0 0 370 200"
                    className="transition-all duration-300 hover:scale-115 active:scale-95 cursor-pointer"
                  >
                    <defs>
                      <linearGradient id="orangeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffc9a0" />
                        <stop offset="100%" stopColor="#ffb380" />
                      </linearGradient>
                      <linearGradient id="orangeGradient2Hover" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff9d60" />
                        <stop offset="100%" stopColor="#ff8040" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M50,65 C85,35 135,25 185,40 C235,55 285,45 335,70 C360,85 355,120 340,145 C320,175 270,185 220,180 C170,175 120,170 85,150 C50,130 25,100 50,65 Z"
                      fill="url(#orangeGradient2)"
                      className="drop-shadow-lg group-hover:fill-[url(#orangeGradient2Hover)] transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[#236483] font-bold text-2xl lg:text-3xl mb-3">コミュニティに入る</span>
                    <svg className="w-10 h-10 text-[#236483]" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer with curved blue wave and navigation */}
        <footer className="relative w-full h-[160px] lg:h-[200px] xl:h-[250px] overflow-hidden">
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
