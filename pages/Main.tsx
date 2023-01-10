import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import GoogleLogin from '../components/GoogleLogin';
import { userInfoState } from '../utils/store';

// 구글 로그인을 통해 지도에 접근 할 것인지, 아닌지 분기가 나뉘어지는 페이지
// 로고를 클릭하여 바로그인으로 지도에 접근 할 경우 '/Map' 으로
// 구글 로그인을 통해서 지도에 접근 할 경우 '/LoggedInMap' 으로 연결됨
// 해당 페이지에서 데이터를 페칭하는 등의 인터랙션은 없으므로 StaticProps 또는 ServerSideProps는 사용하지 않음.
function Main() {
  const route = useRouter();
  const { isLoggedIn } = useRecoilValue(userInfoState);

  const goToMap = (): void => {
    if (isLoggedIn) {
      route.push('/LoggedInMap');
    } else {
      route.push('/Map');
    }
  };

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
      <GoogleLogin />
    </>
  );
}

export default Main;

const MainLogoContainer = styled.div`
  position: relative;
`;
