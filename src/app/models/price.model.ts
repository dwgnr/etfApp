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

export interface TrackingErrorResponse {
  'etf_isin': string;
  'etf_name': string;
  'bm_id': number;
  'bm_name': string;
  'te': number;
}

export interface TrackingErrorInput {
  'date_from': any;
  'date_to': any;
  'etfs': string[];
}
