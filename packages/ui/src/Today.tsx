export interface CardEmoji {
  type: string;
  count: number;
  icon: string;
}

export interface Card {
  id: string;
  image: string;
  author: {
    avatar: string;
    name: string;
  };
  emojis: CardEmoji[];
  views: number;
  remixCount: number;
  isOriginal?: boolean;
}

export const mockCards: Card[] = [
  {
    id: '1',
    image: 'https://s3.us-west-2.amazonaws.com/yourware-assets/image/b8f32453-fb0d-4565-97d8-f17326aeb947/bur9x326kq.png',
    author: {
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKBdTegVE_h2KRs1xCBKRqz4Mb_jLLET50sM6BiWgWrpZvbxxmW=s400-c',
      name: 'Chloe Harper'
    },
    emojis: [
      { type: 'rofl', count: 4, icon: 'https://public.yourware.so/emoji/rofl.svg' },
      { type: '100', count: 4, icon: 'https://public.yourware.so/emoji/100.svg' },
      { type: 'salute', count: 3, icon: 'https://public.yourware.so/emoji/salute.svg' },
      { type: 'clap', count: 3, icon: 'https://public.yourware.so/emoji/clap.svg' }
    ],
    views: 483,
    remixCount: 0,
    isOriginal: true
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1682687220742-aba19b51f36d',
    author: {
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Emma Wilson'
    },
    emojis: [
      { type: 'heart', count: 8, icon: 'https://public.yourware.so/emoji/heart.svg' },
      { type: 'fire', count: 5, icon: 'https://public.yourware.so/emoji/fire.svg' }
    ],
    views: 267,
    remixCount: 2,
    isOriginal: false
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1682687221038-404670f09514',
    author: {
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'James Chen'
    },
    emojis: [
      { type: 'star', count: 12, icon: 'https://public.yourware.so/emoji/star.svg' },
      { type: 'clap', count: 7, icon: 'https://public.yourware.so/emoji/clap.svg' }
    ],
    views: 892,
    remixCount: 5,
    isOriginal: true
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1682687220509-61b8a906ca19',
    author: {
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      name: 'Sophie Taylor'
    },
    emojis: [
      { type: 'rocket', count: 6, icon: 'https://public.yourware.so/emoji/rocket.svg' },
      { type: 'heart', count: 9, icon: 'https://public.yourware.so/emoji/heart.svg' }
    ],
    views: 345,
    remixCount: 1,
    isOriginal: false
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1682687221038-404670f09514',
    author: {
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      name: 'Alex Johnson'
    },
    emojis: [
      { type: 'fire', count: 15, icon: 'https://public.yourware.so/emoji/fire.svg' },
      { type: '100', count: 8, icon: 'https://public.yourware.so/emoji/100.svg' }
    ],
    views: 567,
    remixCount: 3,
    isOriginal: true
  }
];

export const Today = () => {
  const cards: Card[] = mockCards;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      {cards.map((card, index) => (
        <div 
          key={card.id}
          className={`${index === 0 ? 'col-span-1 md:col-span-2' : ''}`}
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
              {card.isOriginal && (
                <div className="text-[10px] text-black/30">Original</div>
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