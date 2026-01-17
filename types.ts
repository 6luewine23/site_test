
export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Logo' | 'Web' | 'Brand';
  imageUrl: string;
  description: string;
}

export interface SiteSettings {
  siteName: string;
  heroTitle: string;
  heroSubTitle: string;
  primaryColor: string;
  contactEmail: string;
}

export interface AppState {
  settings: SiteSettings;
  portfolio: PortfolioItem[];
  setSettings: (settings: SiteSettings) => void;
  setPortfolio: (items: PortfolioItem[]) => void;
}

export enum PageType {
  HOME = 'HOME',
  PORTFOLIO = 'PORTFOLIO',
  ADMIN = 'ADMIN'
}
