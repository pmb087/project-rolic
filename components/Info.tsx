import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  content: string | string[];
}

function Info({ title, content }: Props) {
  return (
    <InfoWrap>
      <InfoTitle>{title}</InfoTitle>
      {Array.isArray(content) ? (
        content.map((item: string) => (
          <InfoContent key={item}>{item}</InfoContent>
        ))
      ) : (
        <InfoContent>{content}</InfoContent>
      )}
    </InfoWrap>
  );
}

export default Info;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  width: 100%;
`;

const InfoTitle = styled.h1`
  margin-bottom: 15px;
  color: ${(props) => props.theme.darkGray};
  font-size: 34px;
  font-weight: bold;
  letter-spacing: 1.2px;
`;

const InfoContent = styled.p`
  margin-bottom: 5px;
  color: ${(props) => props.theme.normalGray};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
`;
