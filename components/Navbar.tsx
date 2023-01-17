import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserService from '../utils/service/UserService';
import { UserResponse } from '../utils/types';
import GoogleLogin from './GoogleLogin';
import UserInfo from './UserInfo';

interface Props {
  currentUserInfo?: UserResponse;
  isAdmin: boolean;
}

function Navbar({ currentUserInfo, isAdmin }: Props) {
  return (
    <LeftContainerHeader>
      <Image
        src='/ROLIC_LOGO.svg'
        alt='Rolic Logo'
        width={420}
        height={120}
        style={{ margin: '0 0 20px 0' }}
      />
      {currentUserInfo !== undefined ? (
        <UserInfo
          name={currentUserInfo.name}
          picture={currentUserInfo.picture_uri}
          isAdmin={isAdmin}
        />
      ) : (
        <GoogleLogin />
      )}
    </LeftContainerHeader>
  );
}

export default Navbar;

const LeftContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
