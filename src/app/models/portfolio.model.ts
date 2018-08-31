export interface Portfolio {
  'ret': number;
  'stdev': number;
  'sharpe': number;
  'is_max_sharpe': boolean;
  'is_min_vol': boolean;
  'weights': [
    {
      'isin': string;
      'weight': number;
    }
    ];
}

export interface PortfolioWeight {
  isin: string;
  weight: number;
}

export interface PortfolioInput {
  'num_portfolios': number;
  'price': string;
  'date_from': any;
  'date_to': any;
  'etfs': string[];
}
