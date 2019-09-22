export interface Env {
  production: boolean;
  assets: string;
  apiUrl: string;
}

export const environment: Env = {
  production: false,
  assets: '/src/app/services/data',
  apiUrl: 'http://localhost:5000/api/etf'
};
