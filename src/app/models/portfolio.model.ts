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

export interface BlackLittermanPortfolio {
  'tan_ret': number;
  'tan_stdev': number;
  'tan_weights': [
    {
      'isin': string;
      'weight': number;
    }
    ];
  'front_ret': number[];
  'front_stdev': number[];
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

export interface BlackLittermanInput {
  'symbols': string[];
  'views': ViewInput[];
  'date_from': any;
  'date_to': any;
  'rf': number;
  'tau': number;
  'shrinkage': boolean;
}

export interface ViewInput {
  'isin1': string;
  'operator': string;
  'isin2': string;
  'adjustment': number;
}
