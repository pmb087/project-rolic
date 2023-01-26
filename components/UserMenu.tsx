import { useRouter } from 'next/router';
import styled from 'styled-components';
import LocalStorageService from '../utils/service/LocalStorageService';

function UserMenu() {
  const { pathname, push } = useRouter();

  const routingPage = () => {
    const target = pathname === '/MyPage' ? '/LoggedInMap' : '/MyPage';
    push(target);
  };

  const logoutAccount = () => {
    LocalStorageService.remove('user');
    push('/Main');
  };

  return (
    <UserMenuWrap>
      <Triangle />
      <UserMenuContainer>
        <MenuBlock onClick={routingPage}>
          {pathname === '/MyPage' ? '지도 페이지' : '마이 페이지'}
        </MenuBlock>
        <MenuBlock onClick={logoutAccount}>{'로그아웃'}</MenuBlock>
      </UserMenuContainer>
    </UserMenuWrap>
  );
}

export default UserMenu;

const UserMenuWrap = styled.div`
  position: absolute;
  z-index: 5;
  right: 115px;
  bottom: -10px;
`;

const UserMenuContainer = styled.div`
  box-shadow: 0px 0px 6px 0px #00000040;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 6;
`;

const Triangle = styled.div`
  width: 30px;
  background-color: #fff;
  height: 30px;
  border-radius: 4px;
  box-shadow: -4px 4px 2px -2px rgb(178 178 178 / 0.3);
  transform: rotate(135deg);
  position: absolute;
  z-index: 7;
  left: 60px;
  top: -13px;
`;

const MenuBlock = styled.button`
  padding: 25px 0;
  width: 150px;
  font-size: 24px;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #fff;

  :hover {
    color: #ff904d;
    cursor: pointer;
  }
`;
