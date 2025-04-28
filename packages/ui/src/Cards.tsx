import type { FC } from "react"
import type { Card } from "@monorepo/types"

interface CardsProps {
  data: Card[];
  isToday?: boolean;
}

export const Cards: FC<CardsProps> = ({ data, isToday = false }) => {

  return (
    <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${isToday ? 'xl:grid-cols-4 xl:grid-rows-2' : 'xl:grid-cols-3'}`}>
      {data.map((card, index) => (
        <div 
          key={card.id}
          className={`${isToday && index === 0 ? 'col-span-1 flex md:col-span-2 xl:col-span-2 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:pt-[130px]' : ''}`}
        >
          <div className="w-full bg-white rounded-[20px] cursor-pointer">
            <div className="p-4 flex flex-col gap-4">
              {/* Image */}
              <div className="rounded-[8px] border border-black/3">
                <div className="aspect-[16/9] rounded-[8px] overflow-hidden">
                  <img 
                    src={card.image} 
                    alt="" 
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-102 rounded-[8px]"
                  />
                </div>
              </div>

              {/* Author and Reactions */}
              <div className="px-1 flex items-start justify-between">
                <div className="flex items-center cursor-pointer">
                  <img src={card.author.avatar} alt="User avatar" className="w-7 h-7 rounded-full mr-2" />
                  <span className="text-sm font-medium text-gray-800 truncate">{card.author.name}</span>
                </div>
                
                <div className="w-[60%] ml-auto">
                  <div className="flex flex-wrap gap-[6px] justify-end">
                    {card.emojis.map((emoji) => (
                      <div key={emoji.type} className="flex items-center gap-1 rounded-full py-1 px-2 bg-[rgba(30,30,30,0.06)]">
                        <img src={emoji.icon} alt={emoji.type} className="w-4 h-4" />
                        <span className="text-xs font-medium text-black">{emoji.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full flex border-t pt-3 px-4 pb-4 border-black/3 justify-between items-center">
              {card.isOriginal ? (
                <div className="text-[10px] text-black/30">Original</div>
              ) : (
                <div className="text-[10px] text-green-600/60">AI Generated</div>
              )}
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2">
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <div className="text-xs font-medium text-black/30">{card.views}</div>
                </div>
                <button className="flex items-center justify-center py-1.5 px-2.5 rounded-full border border-black/6 gap-1 hover:bg-black/5 transition-all duration-300">
                  <span className="text-xs font-medium text-black/95">Remix {card.remixCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};