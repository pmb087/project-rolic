import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Navbar from 'components/Navbar';
import StoreInfoLarge from 'components/StoreInfoLarge';
import StoreService from 'utils/service/StoreService';
import { StoreResponse } from 'utils/types';
import useGetUser from 'utils/hooks/useGetUser';

interface Props {
  storeData: StoreResponse;
}

function StoreInfoPage({ storeData }: Props) {
  const { push } = useRouter();
  const goToMyPage = () => push('/MyPage');

  const { isAdmin, currentUserInfo } = useGetUser(true);

  return (
    <StoreInfoContainer>
      <Navbar isAdmin={isAdmin} currentUserInfo={currentUserInfo} />
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
    background-color: ${(props) => props.theme.mangoOrange};
    border: 3px solid ${(props) => props.theme.mangoOrange};
    color: #fff;
    cursor: pointer;
  }
`;

const TitleText = styled.h1`
  margin: 20px 20px 20px 50px;
  color: ${(props) => props.theme.darkGray};
  font-size: 36px;
  font-weight: bolder;
`;

const StoreInfoWrap = styled.div`
  align-self: center;
  width: 50%;
  min-width: 680px;
  background-color: #fff;
  box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.2);
`;
