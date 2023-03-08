import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import GoogleLogin from 'components/GoogleLogin';
import { Url } from 'url';
import useRedirect from 'utils/hooks/useRedirect';

function Main() {
  const { push } = useRouter();
  useRedirect('/LoggedInMap' as unknown as Url);

  return (
    <MainContainer>
      <MainLogoContainer onClick={() => push('/Map')}>
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
      <GoogleLogin />
    </MainContainer>
  );
}

export default Main;

const MainLogoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
