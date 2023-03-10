import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  type: string;
  link: string;
}

function ClickLink({ type, link }: Props) {
  const theme = type === 'mango' ? '#ff904d' : '#0ac7ce';
  const isNoData = link === 'no_data';

  const noDataClick = () => {
    alert('해당 링크가 없습니다.');
  };

  if (isNoData) {
    return (
      <NoLinkWrap onClick={noDataClick}>
        <ClickLinkWrap>
          <ImageWrap themeColor={theme} isNoData={isNoData}>
            <Image
              src={
                type === 'mango'
                  ? '/noDataMangoplate.svg'
                  : '/noDataDiningcode.svg'
              }
              alt='linkImage'
              width={150}
              height={50}
            />
          </ImageWrap>
        </ClickLinkWrap>
      </NoLinkWrap>
    );
  }

  return (
    <Link href={link} target='_blank' rel='noopener noreferrer'>
      <ClickLinkWrap>
        <ImageWrap themeColor={theme} isNoData={isNoData}>
          <Image
            src={type === 'mango' ? '/mangoLink.svg' : '/diningLink.svg'}
            alt='linkImage'
            width={150}
            height={50}
          />
        </ImageWrap>
      </ClickLinkWrap>
    </Link>
  );
}

export default ClickLink;

type Theme = {
  themeColor: string;
  isNoData: boolean;
};

const ClickLinkWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ImageWrap = styled.div<Theme>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 112.5px;
  background-color: #fff;
  border: 3px solid
    ${({ themeColor, isNoData }) => (isNoData ? '#a0a0a0' : themeColor)};
  border-radius: 20px;
`;

const NoLinkWrap = styled.button`
  background-color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
`;
