import axios from 'axios';
import User from '../models/User';

export interface UserGatewayInterface {
  getUsers(): Promise<User[]>;
}

export class UserGateway implements UserGatewayInterface {
  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');

      return response.data;
    } catch (err) {
      throw new Error('Failed to retrieve users.');
    }
  }
}

export const userGateway = new UserGateway();
