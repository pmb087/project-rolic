import React, { useState } from 'react';
import styled from 'styled-components';
import { Url } from 'url';
import AddStore from '@/components/AddStore';
import Management from '@/components/Management';
import Navbar from '@/components/Navbar';
import Request from '@/components/Request';
import WishList from '@/components/WishList';
import StoreService from '@/utils/service/StoreService';
import { StoreResponse } from '@/utils/types';
import useRedirect from '@/utils/hooks/useRedirect';
import useGetUser from '@/utils/hooks/useGetUser';

type SelectedMenu =
  | 'WISH_LIST'
  | 'REQUEST_STORE'
  | 'MANAGEMENT_REQUEST'
  | 'ADD_STORE';
interface Props {
  storeResponse: StoreResponse[];
}

function MyPage({ storeResponse }: Props) {
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>('WISH_LIST');
  const handleSelectedMenu = (menu: SelectedMenu) => setSelectedMenu(menu);
  const { WISH_LIST, REQUEST_STORE, MANAGEMENT_REQUEST, ADD_STORE } = {
    WISH_LIST: selectedMenu === 'WISH_LIST',
    REQUEST_STORE: selectedMenu === 'REQUEST_STORE',
    MANAGEMENT_REQUEST: selectedMenu === 'MANAGEMENT_REQUEST',
    ADD_STORE: selectedMenu === 'ADD_STORE'
  };

  const { isAdmin, currentUserInfo, getUserInfo } = useGetUser(false);
  useRedirect('/Map' as unknown as Url, getUserInfo);

  return (
    <MyPageContainer>
      <Navbar isAdmin={isAdmin} currentUserInfo={currentUserInfo} />
      <ContentContainer>
        <ContentAside>
          <AsideMenu
            onClick={() => handleSelectedMenu('WISH_LIST')}
            currentMenu={selectedMenu === 'WISH_LIST'}
          >
            찜 목록
          </AsideMenu>
          {isAdmin ? (
            <>
              <AsideMenu
                onClick={() => handleSelectedMenu('MANAGEMENT_REQUEST')}
                currentMenu={selectedMenu === 'MANAGEMENT_REQUEST'}
              >
                문의 관리
              </AsideMenu>
              <AsideMenu
                onClick={() => handleSelectedMenu('ADD_STORE')}
                currentMenu={selectedMenu === 'ADD_STORE'}
              >
                가게 추가
              </AsideMenu>
            </>
          ) : (
            <AsideMenu
              onClick={() => handleSelectedMenu('REQUEST_STORE')}
              currentMenu={selectedMenu === 'REQUEST_STORE'}
            >
              추가 문의
            </AsideMenu>
          )}
        </ContentAside>
        {WISH_LIST && <WishList storeResponse={storeResponse} />}
        {MANAGEMENT_REQUEST && <Management />}
        {REQUEST_STORE && <Request />}
        {ADD_STORE && <AddStore />}
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
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.2);
`;

const ContentAside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  min-width: 160px;
  width: 300px;
  background-color: ${(props) => props.theme.opacityOrange};
`;

const AsideMenu = styled.div<CurrentMenu>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 40px;
  width: calc(100% + 10px);
  height: 70px;
  background-color: ${({ currentMenu }) => (currentMenu ? '#fff' : 'none')};
  box-shadow: ${({ currentMenu }) =>
    currentMenu ? '0 0 2px 2px rgba(0, 0, 0, 0.2)' : 'none'};
  color: ${(props) => props.theme.darkGray};
  font-size: ${({ currentMenu }) => (currentMenu ? '30px' : '22px')};
  font-weight: ${({ currentMenu }) => (currentMenu ? 'bolder' : 'bold')};
  :hover {
    cursor: pointer;
  }
`;
