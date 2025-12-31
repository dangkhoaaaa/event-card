export enum CardType {
  WEDDING = 'wedding',
  BIRTHDAY = 'birthday',
  ANNIVERSARY = 'anniversary',
  BABY_SHOWER = 'baby_shower',
  OTHER = 'other',
}

export interface Template {
  _id: string;
  name: string;
  type: CardType;
  thumbnail: string;
  design: {
    backgroundImage?: string;
    backgroundColor?: string;
    textStyles: {
      [key: string]: {
        fontFamily: string;
        fontSize: number;
        color: string;
        fontWeight: string;
        position: { x: number; y: number };
      };
    };
    imagePlaceholders: Array<{
      id: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
    }>;
  };
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Card {
  _id: string;
  templateId: string | Template;
  title: string;
  content: {
    [key: string]: string | { url: string; publicId?: string };
  };
  hostName: string;
  isPublished: boolean;
  viewCount: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardDto {
  templateId: string;
  title: string;
  content: {
    [key: string]: string | { url: string; publicId?: string };
  };
  hostName: string;
  isPublished?: boolean;
}

export interface Guest {
  _id: string;
  cardId: string;
  name: string;
  email?: string;
  hasViewed: boolean;
  viewedAt?: string;
  hasResponded: boolean;
  response?: 'attending' | 'not_attending' | 'maybe';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGuestDto {
  cardId: string;
  name: string;
  email?: string;
}

export interface GuestStatistics {
  total: number;
  viewed: number;
  responded: number;
  attending: number;
  notAttending: number;
  maybe: number;
}



