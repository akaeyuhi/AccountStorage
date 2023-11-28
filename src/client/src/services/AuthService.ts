import BaseService from './BaseService';
import AuthError from './errors/AuthError';
import { AuthResponse } from 'features/account/types/AuthResponse';
import { LoginDto } from './interfaces/LoginDto';
import { RegisterDto } from './interfaces/RegisterDto';

export default class AuthService extends BaseService {
  async register(userData: RegisterDto): Promise<AuthResponse> {
    try {
      const response = await this.request<AuthResponse>('/register', 'POST', userData);
      if (response.accessToken) {
        this.setToken(response.accessToken);
      }
      return response;
    } catch (error) {
      throw new AuthError('Error registering: ' + (error as Error).message);
    }
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    try {
      const response = await this.request<AuthResponse>('/login', 'POST', { ...dto });
      if (response.accessToken) {
        this.setToken(response.accessToken);
      }
      return response;
    } catch (error) {
      throw new AuthError('Error logging in: ' + (error as Error).message);
    }
  }
}
