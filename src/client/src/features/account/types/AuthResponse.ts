export interface AuthResponse {
  accessToken: string;
  user: {
    role: string;
    email: string;
  };
}
