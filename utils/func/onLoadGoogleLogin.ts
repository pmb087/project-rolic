import { RefObject } from 'react';
import { GApiResponse } from '../types';

export default function onLoadGoogleLogin(
  useCredential: (response: GApiResponse) => void,
  googleSignInButton: RefObject<HTMLDivElement>
) {
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
}
