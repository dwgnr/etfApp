// import {Deserializable} from './deserializable.model';
//
// export class EtfInfo implements Deserializable {
//   isin: string;
//   profile: string;
//   issuer: string;
//   wkn: string;
//   currency: string;
//   ter: number;
//   distribution: string;
//   replication: string;
//   aum_mn_eur: number;
//   pdf: string;
//
//   public deserialize(input: any) {
//     Object.assign(this, input);
//     return this;
//   }
// }

export interface EtfInfo {
  isin: string;
  profile: string;
  issuer: string;
  wkn: string;
  currency: string;
  ter: number;
  distribution: string;
  replication: string;
  aum_mn_eur: number;
  product_type: string;
  asset_class: string;
  region: string;
  country: string;
  sector: string;
  company: string;
  fund_currency: string;
  inception: any;
  index_name: string;
  index_replication: string;
  index_type: string;
  lending_counterpart: string;
  name: string;
  replication_detail: string;
  replication_kind: string;
  sale_permit: string;
  securities_lending: string;
  securities_manager: string;
  strategy: string;
  swap_counterpart: string;
  trade_currency: string;
  market_cap_eur: number;
  pdf: string;
  added: boolean;

}

export interface EtfInfoResponse {
  etf_infos: EtfInfo[];
  item_count: number;
}

export interface CartState {
  loaded: boolean;
  products: EtfInfo[];

}

export interface InfoState {
  loaded: boolean;
  products: EtfInfo[];

}

export interface Region {
  'region': string[];
}

export interface InfoFilter {
  region: string;
  age: any;
  profit_use: string;
  fund_size: number;
  ter: number;
  search: string;

}


