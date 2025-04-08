import Image from 'next/image'
import { ChevronsDown, MessageSquare, Share2 } from 'lucide-react'
import { Tabs } from "@monorepo/ui/components/Tabs"
import { Cards } from "@monorepo/ui/components/Cards"

import { mockCards } from "./mock"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F8]">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <span className="font-bold">YOURWARE</span>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">Alpha</span>
        </div>
        <nav className="flex items-center space-x-2">
          <a className="p-1.5 flex items-center justify-center cursor-pointer hover:bg-[rgba(30,30,30,0.06)] hover:text-black/95 transition-all rounded-full">
            <Share2 className="w-5 h-5" />
          </a>
          <a className="p-1.5 flex items-center justify-center cursor-pointer hover:bg-[rgba(30,30,30,0.06)] hover:text-black/95 transition-all rounded-full">
            <MessageSquare className="w-5 h-5" />
          </a>
          <a className="px-3 py-1.5 flex items-center justify-center cursor-pointer font-medium text-[14px] bg-[#1E1E1E] text-white rounded-full font-outfit">
            Sign up
          </a>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Vibe Coder&apos;s Instagram ☕️</h1>
        <p className="text-gray-600 m-8">Don&apos;t Keep Your Code to Yourself - Share It With the World</p>
        
        <Tabs className="w-full" />

        <div className="flex flex-col items-center justify-center my-8 gap-3">
          <div className="animate-bounce mb-2">
            <ChevronsDown className="w-6 h-6 text-[#1e1e1e]" />
          </div>
        </div>
        
        <h2 className="text-3xl font-semibold text-white font-montserrat flex items-center justify-center m-4">
          <Image 
            src="/today.svg"
            alt="Leaf icon"
            width={411}
            height={115}
            className="w-[30%] max-w-[411px] min-w-[280px]"
            priority
          />
        </h2>

        <Cards data={mockCards} />
      </main>

      <footer className="py-4 sm:py-6 px-4 text-gray-600 border-t border-gray-200 text-xs sm:text-sm text-center w-full">
        <p>© 2025 REPORTER</p>
      </footer>
    </div>
  )
}
