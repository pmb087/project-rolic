import { AxiosResponse } from 'axios';
import client from './CustomAxios';
import { UserResponse } from '../types/index';

class User {
  signUp(
    email: string,
    name: string,
    pictureURI: string
  ): Promise<AxiosResponse<UserResponse>> {
    return client.post(
      '/users',
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
    return client.get(`/users/${email}`);
  }

  getAdmin(): Promise<AxiosResponse<string[]>> {
    return client.get('/admin');
  }

  likeStore(
    userEmail: string,
    storeId: number,
    likeStore: number[]
  ): Promise<AxiosResponse<UserResponse>> {
    return client.patch(
      `/users/${userEmail}`,
      {
        like_store: [...likeStore, storeId]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  unLikeStore(
    userEmail: string,
    storeId: number,
    likeStoreArr: number[]
  ): Promise<AxiosResponse<UserResponse>> {
    return client.patch(
      `/users/${userEmail}`,
      {
        like_store: likeStoreArr.filter((el) => el !== storeId)
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export default new User();
