import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import UserMenu from './UserMenu';

interface Props {
  name: string;
  picture: string;
}

function UserInfo({ name, picture }: Props) {
  const [isClicked, setisClicked] = useState(false);

  const handleClicked = () => {
    setisClicked((prev) => !prev);
  };
  return (
    <UserInfoContainer>
      <WelcomeText>{`라멘을 사랑하는, ${name}님`}</WelcomeText>
      <Image
        src={picture}
        alt='profile_picture'
        width={80}
        height={80}
        style={{ borderRadius: '40px', cursor: 'pointer' }}
        onClick={handleClicked}
      ></Image>
      {isClicked && <UserMenu />}
    </UserInfoContainer>
  );
}

export default UserInfo;

const UserInfoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 50px 20px 0;
`;

const WelcomeText = styled.h2`
  font-size: 30px;
  font-weight: bolder;
  letter-spacing: 1.2px;
  color: #000;
  margin-right: 15px;
`;