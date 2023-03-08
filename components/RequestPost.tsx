import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  content: string;
}

function RequestPost({ title, content }: Props) {
  return (
    <RequestPostContainer>
      <h1>{title}</h1>
      <div>{content}</div>
    </RequestPostContainer>
  );
}
export default RequestPost;

const RequestPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
