import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../utils/store/index';
import useScript from '../utils/hooks/useScript';
import jwt_decode from 'jwt-decode';
import { GApiResponse, DecodedResponse } from '../utils/types/index';
import { useRouter } from 'next/router';
import UserService from '../utils/UserService';

declare global {
  interface Window {
    google: any;
  }
}

function GoogleLogin() {
  const route = useRouter();
  const googleSignInButton = useRef<HTMLDivElement>(null);
  const setUserInfo = useSetRecoilState(userInfoState);

  const useCredential = (response: GApiResponse) => {
    const { email, name, exp, picture }: DecodedResponse = jwt_decode(
      response.credential
    );
    setUserInfo({
      email: email,
      expiredTime: exp,
      isLoggedIn: true
    });
    UserService.signUp(email, name, picture);
    route.push('/LoggedInMap');
  };

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: useCredential
    });
    window.google.accounts.id.renderButton(googleSignInButton.current, {
      size: 'large',
      text: '구글 계정으로 로그인',
      width: '400',
      shape: 'circle',
      theme: 'filled_blue'
    });
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 'calc((100% - 400px) / 2)',
        bottom: '200px'
      }}
      ref={googleSignInButton}
    ></div>
  );
}

export default GoogleLogin;
