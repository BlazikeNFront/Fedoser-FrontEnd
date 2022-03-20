export interface UserStore {
  username: string | null;
  isTokenProvided: boolean;
  loginTimestamp: number | null;
}
