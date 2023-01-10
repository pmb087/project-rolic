import { atom } from 'recoil';
import { CurrentUser } from '../types';

export const userInfoState = atom<CurrentUser>({
  key: 'userInfo',
  default: {
    email: '',
    isLoggedIn: false
  }
});
