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
          <span className="font-bold">AIHUB</span>
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

      <main className="flex-grow flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Vibe Coder&apos;s Instagram ☕️</h1>
        <p className="text-gray-600 m-8">Don&apos;t Keep Your Code to Yourself - Share It With the World</p>
        
        <Tabs className="w-full max-w-[1280px] md:w-4/5 xl:w-3/5 xl:p-0 2xl:w-1/2" />

        <div className="flex flex-col items-center justify-center my-8 gap-3">
          <div className="animate-bounce mb-2">
            <ChevronsDown className="w-6 h-6 text-[#1e1e1e]" />
          </div>
        </div>
        
        <div className='relative w-full'>
          <div className="absolute top-0 right-0 left-0 flex items-center justify-center px-10">
            <Image 
              src="/wheat.svg"
              alt=""
              width={60}
              height={90}
              loading="lazy"
              decoding="async"
              style={{ color: 'transparent' }}
            />
            <h2 className="text-center text-[28px] sm:text-[48px]">AI Hub Today</h2>
            <Image 
              src="/wheat.svg"
              alt=""
              width={60}
              height={90}
              loading="lazy"
              decoding="async"
              className="scale-x-[-1]"
              style={{ color: 'transparent' }}
            />
          </div>
          <div className="mx-auto mb-12 w-full max-w-[2000px] px-6 pt-24 md:px-10 xl:pt-0">
            <Cards data={mockCards} isToday />
          </div>
        </div>

        <div className='relative w-full'>
          <h2 className='mt-20 mb-8 text-center text-[32px] text-black/95'>CodeCamp</h2>
          <div className="mx-auto mb-12 w-full max-w-[2000px] px-6 pt-24 md:px-10 xl:pt-0">
            <Cards data={mockCards.slice(0, 3)} />
          </div>
        </div>
      </main>

      <footer className="py-4 sm:py-6 px-4 text-gray-600 border-t border-gray-200 text-xs sm:text-sm text-center w-full">
        <p>© 2025 REPORTER</p>
      </footer>
    </div>
  )
}
