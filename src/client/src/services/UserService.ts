import BaseService from './BaseService';
import UserError from 'services/errors/UserError';
import { User } from 'services/interfaces/User';

export default class UserService extends BaseService {
  async getUser(id: number): Promise<User> {
    try {
      return await this.request<User>(`/${id}`, 'GET');
    } catch (error) {
      throw new UserError('Error getting user: ' + (error as Error).message);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.request<User[]>('/', 'GET');
    } catch (error) {
      throw new UserError('Error getting users: ' + (error as Error).message);
    }
  }
}
