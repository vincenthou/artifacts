"use client"

import type { FC } from "react"
import { useState } from "react"

interface PasteCodeProps {
  onDeploy?: (code: string) => void
}

export const PasteCode: FC<PasteCodeProps> = ({ onDeploy }) => {
  const [code, setCode] = useState('')

  const handleDeploy = () => {
    onDeploy?.(code)
  }

  return (
    <div className="h-full w-full p-4 flex flex-col rounded-[16px]">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border-none text-sm p-4 flex-1 resize-none focus:outline-none h-full pb-4"
        placeholder="Paste your HTML or TSX code here..."
      />
      <div className="flex justify-end gap-4">
        <button
          onClick={handleDeploy}
          disabled={!code}
          className="cursor-pointer px-4 h-10 flex items-center justify-center font-inter tracking-tight bg-black text-white disabled:bg-[rgba(0,0,0,0.06)] disabled:text-white/50 disabled:cursor-not-allowed rounded-full transition-colors"
        >
          Deploy Code
        </button>
      </div>
    </div>
  )
}