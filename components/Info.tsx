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
  width: 100%;
  margin-bottom: 40px;
`;

const InfoTitle = styled.h1`
  font-size: 34px;
  font-weight: bold;
  color: ${(props) => props.theme.darkGray};
  margin-bottom: 15px;
  letter-spacing: 1.2px;
`;

const InfoContent = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.normalGray};
  margin-bottom: 5px;
  letter-spacing: 1px;
`;
