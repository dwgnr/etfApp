export interface Portfolio {
  'ret': number;
  'stdev': number;
  'sharpe': number;
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
