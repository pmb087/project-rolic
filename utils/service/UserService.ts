import axios, { AxiosResponse } from 'axios';
import { UserResponse } from '../types/index';

class User {
  signUp(
    email: string,
    name: string,
    pictureURI: string
  ): Promise<AxiosResponse<UserResponse>> {
    return axios.post(
      'https://project-rolic-json-server.herokuapp.com/users',
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
    return axios.get(
      `https://project-rolic-json-server.herokuapp.com/users/${email}`
    );
  }

  getAdmin(): Promise<AxiosResponse<string[]>> {
    return axios.get('https://project-rolic-json-server.herokuapp.com/admin');
  }

  likeStore(
    userEmail: string,
    storeId: number,
    likeStore: number[]
  ): Promise<AxiosResponse<UserResponse>> {
    return axios.patch(
      `https://project-rolic-json-server.herokuapp.com/users/${userEmail}`,
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
    return axios.patch(
      `https://project-rolic-json-server.herokuapp.com/users/${userEmail}`,
      {
        like_store: likeStoreArr.filter((el) => el !== storeId)
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export default new User();
