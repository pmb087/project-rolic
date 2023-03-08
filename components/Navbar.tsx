import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import GoogleLogin from 'components/GoogleLogin';
import UserInfo from 'components/UserInfo';
import { UserResponse } from 'utils/types';

interface Props {
  currentUserInfo?: UserResponse;
  isAdmin: boolean;
}

function Navbar({ currentUserInfo, isAdmin }: Props) {
  const { push } = useRouter();

  const clickLogo = () => {
    push('/Map');
  };

  return (
    <LeftContainerHeader>
      <Image
        src='/ROLIC_LOGO.svg'
        alt='Rolic Logo'
        width={420}
        height={120}
        style={{ margin: '0 0 20px 0' }}
        onClick={clickLogo}
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

export default React.memo(Navbar);

const LeftContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
