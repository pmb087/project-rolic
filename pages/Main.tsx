import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import GoogleLogin from '../components/GoogleLogin';
import LocalStorageService from '../utils/service/LocalStorageService';
import { GoogleLoginStyle } from '../utils/types';

function Main() {
  const route = useRouter();
  const googleLoginStyleOption: GoogleLoginStyle = {
    position: 'absolute',
    left: 'calc((100% - 400px) / 2)',
    bottom: '200px'
  };

  const goToMap = () => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser !== null) {
      route.push('/LoggedInMap');
    } else {
      route.push('/Map');
    }
  };

  useEffect(() => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser !== null) {
      route.push('/LoggedInMap');
    }
  }, []);

  return (
    <>
      <MainLogoContainer onClick={goToMap}>
        <Image
          src='/ROLIC_LOGO.svg'
          alt='Rolic Logo'
          width={1000}
          height={450}
          style={{
            position: 'absolute',
            left: 'calc((100% - 1000px) / 2)',
            top: 'calc((100vh - 450px) / 2 - 50px)'
          }}
        />
        <Image
          src='/MainText.svg'
          alt='text'
          width={1000}
          height={450}
          style={{
            position: 'absolute',
            left: 'calc((100% - 1000px) / 2)',
            top: 'calc((100vh - 450px) / 2 + 150px)'
          }}
        />
        <Image
          src='/MainClick.svg'
          alt='click'
          width={400}
          height={160}
          style={{
            position: 'absolute',
            left: 'calc((100% - 1000px) / 2 - 180px)',
            top: 'calc((100vh - 450px) / 2 - 20px)'
          }}
        />
      </MainLogoContainer>
      <GoogleLogin option={googleLoginStyleOption} />
    </>
  );
}

export default Main;

const MainLogoContainer = styled.div`
  position: relative;
`;
