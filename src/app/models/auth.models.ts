export interface User {
    id: number;
    username: string;
    photoUrl: string;
    balance: number;
}
export interface Recipient {
  recipient: string;
  photo: string;
  name: string;
}
export interface TonRate {
  "tonRate": number;
}
