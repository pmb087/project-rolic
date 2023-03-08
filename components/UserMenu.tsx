import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import LocalStorageService from 'utils/service/LocalStorageService';

function UserMenu() {
  const { pathname, push } = useRouter();
  const target = pathname === '/MyPage' ? '/LoggedInMap' : '/MyPage';
  const menuName = pathname === '/MyPage' ? '지도 페이지' : '마이 페이지';

  const routingPage = () => push(target);
  const logoutAccount = () => {
    LocalStorageService.remove('user');
    push('/Main');
  };

  return (
    <UserMenuWrap>
      <Triangle />
      <UserMenuContainer>
        <MenuBlock onClick={routingPage}>{menuName}</MenuBlock>
        <MenuBlock onClick={logoutAccount}>로그아웃</MenuBlock>
      </UserMenuContainer>
    </UserMenuWrap>
  );
}

export default UserMenu;

const UserMenuWrap = styled.div`
  position: absolute;
  z-index: 5;
  bottom: -10px;
  right: 115px;
`;

const UserMenuContainer = styled.div`
  position: absolute;
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 6px 0px #00000040;
`;

const Triangle = styled.div`
  position: absolute;
  z-index: 7;
  left: 60px;
  top: -13px;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: -4px 4px 2px -2px rgb(178 178 178 / 0.3);
  transform: rotate(135deg);
`;

const MenuBlock = styled.button`
  padding: 25px 0;
  width: 150px;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 24px;

  :hover {
    color: ${(props) => props.theme.mangoOrange};
    cursor: pointer;
  }
`;
