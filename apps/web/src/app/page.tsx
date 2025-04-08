import Image from 'next/image'
import { ChevronsDown, MessageSquare, Share2 } from 'lucide-react'
import { Button } from "@monorepo/ui/components/Button"
import { Tabs } from "@monorepo/ui/components/Tabs"
import { Today } from "@monorepo/ui/components/Today"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F8]">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <span className="font-bold">YOURWARE</span>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">Alpha</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" size="sm"><Share2 className="w-4 h-4 mr-2" />Share</Button>
          <Button variant="ghost" size="sm"><MessageSquare className="w-4 h-4 mr-2" />Feedback</Button>
          <Button variant="ghost" size="sm">Sign up</Button>
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

        <Today />
      </main>
    </div>
  )
}
