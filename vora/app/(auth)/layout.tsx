import Navbar from "@/components/layout/Navbar"
import { ReactNode } from "react"
export default function RootLayout({ children }: { children: ReactNode }) {
  return(
    <html>
      <body className="flex flex-col min-h-screen">
        <Navbar></Navbar>
        <main className="grow bg-white">{children}</main>
      </body>
    </html>
  )
}