export interface Env {
  production: boolean;
  assets: string;
  apiUrl: string;
}

// use 192.168.2.116:5555/api/etf if you want the gringotts diskstation
export const environment: Env = {
  production: false,
  assets: '/src/app/services/data',
  apiUrl: 'http://localhost:5000/api/etf'
};
