import axios, { AxiosResponse } from 'axios';
import { UserResponse } from '../utils/types/index';

class User {
  signUp(email: string, name: string, pictureURI: string) {
    axios.post(
      'http://localhost:4000/users',
      {
        id: email,
        name: name,
        picture_uri: pictureURI,
        like_store: []
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  async getUser(email: string): Promise<AxiosResponse<UserResponse>> {
    return axios.get(`http://localhost:4000/users/${email}`);
  }
}

export default new User();
