import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Providers } from "@/components/auth/Providers"
import { Toaster } from "react-hot-toast"
import "./globals.css"
import { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar></Navbar>
          <main className="grow bg-white">{children}</main>
          <Footer></Footer>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}