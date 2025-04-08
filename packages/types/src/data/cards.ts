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