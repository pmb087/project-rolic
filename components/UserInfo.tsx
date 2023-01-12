import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  name: string;
  picture: string;
}

function UserInfo({ name, picture }: Props) {
  return (
    <UserInfoContainer>
      <WelcomeText>{`라멘을 사랑하는, ${name}님`}</WelcomeText>
      <Image
        src={picture}
        alt='profile_picture'
        width={80}
        height={80}
        style={{ borderRadius: '40px' }}
      ></Image>
    </UserInfoContainer>
  );
}

export default UserInfo;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const WelcomeText = styled.h2`
  font-size: 30px;
  font-weight: bolder;
  letter-spacing: 1.2px;
  color: #000;
  margin-right: 15px;
`;
