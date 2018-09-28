export interface PriceResponse {
  'date': any;
  'first': number;
  'last': number;
  'high': number;
  'low': number;
  'numberPrices': number;
  'totalMoney': number;
  'totalVolume': number;
  'isin': string;
  'id': number;
}

export interface MAResponse {
  'date': any;
  'price': number;
  'ma_30': number;
  'ma_90': number;
}

export interface PerformanceResponse {
  'mean': number;
  'std': number;
  'sharpe': number;
}

export interface PriceUpdate {
  'skipped': number;
  'errors': number;
  'updated': number;
  'total': number;
  'success': boolean;
}
