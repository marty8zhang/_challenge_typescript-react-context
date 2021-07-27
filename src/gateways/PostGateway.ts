import axios from 'axios';
import Post from '../models/Post';

export interface PostGatewayInterface {
  getPostsByUserId(userId: number): Promise<Post[]>;
}

export class PostGateway implements PostGatewayInterface {
  async getPostsByUserId(userId: number): Promise<Post[]> {
    if (userId <= 0 || Math.floor(userId) !== userId) {
      throw new Error(`Received an invalid user id ${userId} while retrieving user posts.`);
    }

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      );

      return response.data;
    } catch (err) {
      throw new Error(`Failed to retrieve user posts for user id: ${userId}.`);
    }
  }
}

export const postGateway = new PostGateway();
