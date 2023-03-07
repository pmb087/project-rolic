import React, { useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Url } from 'url';
import GoogleLogin from '../components/GoogleLogin';
import { GoogleLoginStyle } from '../utils/types';
import useRedirect from '../utils/hooks/useRedirect';

function Main() {
  const {switchUrlByResult, goToMapByLoginStatus} = useRedirect();
  const googleLoginStyleOption: GoogleLoginStyle = {
    position: 'absolute',
    left: 'calc((100% - 400px) / 2)',
    bottom: '100px'
  };
  
  useEffect(() => goToMapByLoginStatus('/LoggedInMap' as unknown as Url), []);

  return (
    <>
      <MainLogoContainer onClick={switchUrlByResult}>
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
          src='/mainClick.svg'
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
