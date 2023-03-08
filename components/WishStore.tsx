import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import { StoreResponse } from '@/utils/types';

interface Props {
  storeInfo: StoreResponse;
}

function WishStore({ storeInfo }: Props) {
  const { push } = useRouter();
  const { id, thumbnail, store_name } = storeInfo;

  const goToStoreInfo = () => push(`/StoreInfo/${id}`);

  return (
    <WishStoreContainer onClick={goToStoreInfo}>
      <Image
        src={thumbnail}
        width={400}
        height={280}
        alt='찜 한 가게'
        style={{ borderRadius: '10px', border: '3px solid #ff904dbf' }}
      />
      <WishStoreName>{store_name}</WishStoreName>
    </WishStoreContainer>
  );
}
export default WishStore;

const WishStoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 15px;
  background-color: #f0f0f0;
  border: 3px solid ${(props) => props.theme.opacityOrange};
  border-radius: 10px;
  :hover {
    background-color: ${(props) => props.theme.opacityOrange};
    cursor: pointer;
  }
`;

const WishStoreName = styled.h1`
  margin-top: 20px;
  color: #606060;
  font-size: 24px;
  font-weight: bold;
`;
