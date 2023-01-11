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
        like_store: [0]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  getUser(email: string): Promise<AxiosResponse<UserResponse>> {
    return axios.get(`http://localhost:4000/users/${email}`);
  }

  likeStore(userEmail: string, storeId: number, likeStore: number[]) {
    return axios.patch(
      `http://localhost:4000/users/${userEmail}`,
      {
        like_store: [...likeStore, storeId]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  unLikeStore(userEmail: string, storeId: number, likeStoreArr: number[]) {
    return axios.patch(
      `http://localhost:4000/users/${userEmail}`,
      {
        like_store: likeStoreArr.filter((el) => el !== storeId)
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export default new User();
