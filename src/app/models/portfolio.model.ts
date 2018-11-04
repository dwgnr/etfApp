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

export interface BacktestingInput {
  'initial_investment': number;
  'brownian_motion': boolean;
  'num_simulations': number;
  'predicted_days': number;
  'date_from': any;
  'date_to': any;
  'portfolios': BlackLittermanPortfolio[];
  'alpha': number;
  'lookback_days': number;
  'convergence_days': number;
}

export interface BacktestingResults {
  'mc_value_at_risk': any[];
  'dates': any[];
  'historical_performances': any[];
  'hist_value_at_risk': number[];
  'hist_cvar': number[];
  'hist_var_series': any[];
  'hist_stationary_process': boolean[];
  'hist_normal': boolean[];
  'bootstrap_results': BootstrapResults[];
}

export interface BootstrapResults {
  'lower_quantile': number[];
  'average_quantile': number[];
  'upper_quantile': number[];
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

export interface BootstrapInput {
  'num_simulations': number;
  'price': string;
  'date_from': any;
  'date_to': any;
  'etfs': string[];
  'weights': number[];
}
