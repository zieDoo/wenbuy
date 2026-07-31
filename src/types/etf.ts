// ETF types

export interface ETF {
  name: string;
  symbol: string;
  price: number;
  currency: string;
  changePercent: number;
  exchange: string;
  high52: number;
  low52: number;
  weight: number;
}
