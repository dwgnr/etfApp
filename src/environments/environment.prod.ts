export interface Env {
  production: boolean;
  assets: string;
  apiUrl: string;
}

export const environment: Env = {
  production: true,
  assets: 'http://etf.dominikwagner.myds.me/assets',
  apiUrl: 'http://dominikwagner.myds.me:5555/api/etf'
};
