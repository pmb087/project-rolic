import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Request from '../components/Request';
import WishList from '../components/WishList';
import LocalStorageService from '../utils/service/LocalStorageService';
import StoreService from '../utils/service/StoreService';
import UserService from '../utils/service/UserService';
import { StoreResponse, UserResponse } from '../utils/types';

type SelectedMenu = 'WISH_LIST' | 'REQUEST_STORE';
interface Props {
  storeResponse: StoreResponse[];
}

function MyPage({ storeResponse }: Props) {
  const route = useRouter();
  const [currentUserInfo, setCurrentUserInfo] = useState<UserResponse>();
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>('WISH_LIST');

  const getUserInfo = async (currentUser: string) => {
    const userInfo = await UserService.getUser(currentUser);
    setCurrentUserInfo(userInfo.data);
  };

  const handleSelectedMenu = (menu: SelectedMenu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser === null) {
      route.push('/Map');
      return;
    } else {
      getUserInfo(currentUser);
    }
  }, []);

  return (
    <MyPageContainer>
      <Navbar currentUserInfo={currentUserInfo} />
      <ContentContainer>
        <ContentAside>
          <AsideMenu
            onClick={() => handleSelectedMenu('WISH_LIST')}
            currentMenu={selectedMenu === 'WISH_LIST'}
          >
            찜 목록
          </AsideMenu>
          <AsideMenu
            onClick={() => handleSelectedMenu('REQUEST_STORE')}
            currentMenu={selectedMenu === 'REQUEST_STORE'}
          >
            추가 문의
          </AsideMenu>
        </ContentAside>
        {selectedMenu === 'WISH_LIST' ? (
          <WishList storeResponse={storeResponse} />
        ) : (
          <Request />
        )}
      </ContentContainer>
    </MyPageContainer>
  );
}

export default MyPage;

export async function getServerSideProps() {
  const storeRes = await StoreService.getAllStore();
  const storeResponse = storeRes.data;

  return {
    props: {
      storeResponse
    }
  };
}

type CurrentMenu = {
  currentMenu: boolean;
};

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: #f0f0f0;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
`;

const ContentAside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  width: 300px;
  background-color: #ff904dbf;
`;

const AsideMenu = styled.div<CurrentMenu>`
  display: flex;
  margin-bottom: 10px;
  padding-left: 40px;
  font-size: ${({ currentMenu }) => (currentMenu ? '30px' : '22px')};
  font-weight: ${({ currentMenu }) => (currentMenu ? 'bolder' : 'bold')};
  align-items: center;
  width: calc(100% + 10px);
  height: 70px;
  background-color: ${({ currentMenu }) => (currentMenu ? '#fff' : 'none')};
  box-shadow: ${({ currentMenu }) =>
    currentMenu ? '0 0 2px 2px rgba(0, 0, 0, 0.2)' : 'none'};
  color: #505050;
  :hover {
    cursor: pointer;
  }
`;
