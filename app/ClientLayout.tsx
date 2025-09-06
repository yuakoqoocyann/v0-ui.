"use client"

import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Fredoka as Fredoka_One } from "next/font/google"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import "./globals.css"

const fredokaOne = Fredoka_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka-one",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()

  return (
    <html lang="ja" className={fredokaOne.variable}>
      <body className={`antialiased font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
