import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client-layout"
import "./globals.css" // Import globals.css at the top of the file

export const metadata: Metadata = {
  title: "ChoMee App",
  description: "Japanese hobby and community app",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
