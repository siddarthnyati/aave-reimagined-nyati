
export interface NFTItem {
  id: number;
  name: string;
  collection: string;
  image: string;
  floorPrice: string;
  maxLoan: string;
  status: string;
  lender?: string;
  loanProgress?: number;
  activeUntil?: string;
  interest: string;
  duration: string;
}

export interface LoanHistoryItem {
  date: string;
  amount: string;
  duration: string;
  status: string;
  lender: string;
}

export interface TraitItem {
  trait: string;
  value: string;
  rarity: string;
}
