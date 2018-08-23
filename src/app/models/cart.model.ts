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


export interface CartItemOld {
  isin: string;
  issuer: string;
  currency: string;
  ter: number;
  distribution: string;
  replication: string;
  aum_mn_eur: number;
  asset_class: string;
  region: string;
  country: string;
  sector: string;
  inception: string;
  index_name: string;
  name: string;
  replication_detail: string;
  replication_kind: string;
  added: boolean;
}

export interface CartStateOld {
  loaded: boolean;
  products: CartItemOld[];

}

export class Product {
  constructor(
    public isin: string, public first_name: String, public added: boolean, public last_name: String,
    public current_location: String,
    public current_company: String,
    public total_experience: String,
    profile_picture: String, current_role: String) {}
}

