export interface UserStore {
  email: string | null;
  isTokenProvided: boolean;
  loginTimestamp: number | null;
}
