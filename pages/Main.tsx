import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

function Main() {
  const route = useRouter();

  const goToMap = () => {
    route.push('/Map');
  };

  return (
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
  );
}

export default Main;

const MainLogoContainer = styled.div`
  position: relative;
`;
