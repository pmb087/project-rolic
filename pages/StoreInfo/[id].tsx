import Navbar from '../../components/Navbar';
import StoreService from '../../utils/service/StoreService';
import { StoreResponse, UserResponse } from '../../utils/types';
import styled from 'styled-components';
import StoreInfoLarge from '../../components/StoreInfoLarge';
import UserService from '../../utils/service/UserService';
import LocalStorageService from '../../utils/service/LocalStorageService';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
  storeData: StoreResponse;
}

// - 가게 추가 페이지 (관리자가 웹에서 처리할 수 있게, Request는 서버에 있음)
// - 가게 별 받은 총 찜 수 통계(순위) 페이지

function StoreInfoPage({ storeData }: Props) {
  const { push } = useRouter();
  const [currentUserInfo, setCurrentUserInfo] = useState<UserResponse>();

  const goToMyPage = () => {
    push('/MyPage');
  };

  const getUserInfo = async (currentUser: string) => {
    const userInfo = await UserService.getUser(currentUser);
    setCurrentUserInfo(userInfo.data);
  };

  useEffect(() => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser !== null) getUserInfo(currentUser);
  }, []);

  return (
    <StoreInfoContainer>
      <Navbar currentUserInfo={currentUserInfo} />
      <StoreInfoWrap>
        <StoreInfoLargeTitle>
          <TitleText>상세 페이지</TitleText>
          <GoToMyPage onClick={goToMyPage}>{'<'}</GoToMyPage>
        </StoreInfoLargeTitle>
        <StoreInfoLarge store={storeData} />
      </StoreInfoWrap>
    </StoreInfoContainer>
  );
}
export default StoreInfoPage;

interface SSRProps {
  params: {
    id: number;
  };
}

export async function getServerSideProps({ params }: SSRProps) {
  const { id } = params;

  const storeResponse = await StoreService.getStore(id);
  const storeData = storeResponse.data;

  return {
    props: {
      storeData
    }
  };
}

const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ff904d26;
`;

const StoreInfoLargeTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  border-bottom: 2px solid #a0a0a0;
`;

const GoToMyPage = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 50px 20px 20px;
  padding: 5px 5px 0 0;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border: 3px solid black;
  border-radius: 25px;
  font-size: 50px;
  :hover {
    background-color: #ff904d;
    border: 3px solid #ff904d;
    color: #fff;
    cursor: pointer;
  }
`;

const TitleText = styled.h1`
  margin: 20px 20px 20px 50px;
  font-size: 36px;
  font-weight: bolder;
  color: #505050;
`;

const StoreInfoWrap = styled.div`
  box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.2);
  width: 50%;
  align-self: center;
  background-color: #fff;
`;