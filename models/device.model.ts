export interface Device {
  user: string;
  product: string;
  os: string;
  url: string;
  type: 'unix' | 'win',
}