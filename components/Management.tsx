import React from 'react';
import styled from 'styled-components';
import useGetRequest from '../utils/hooks/useGetRequest';
import { RequestGetContent } from '../utils/types';
import RequestPostLink from './RequestPostLink';

function Management() {
  const { requestData, setRequestData } = useGetRequest();

  return (
    <ManagementContainer>
      <ManagementTitle>문의 관리</ManagementTitle>
      <ManagementPostContainer>
        <RequestPostLinkContainer header>
          <RequestPostNumberHeader>접수 번호</RequestPostNumberHeader>
          <RequestPostNameHeader>요청 가게</RequestPostNameHeader>
        </RequestPostLinkContainer>
        {requestData &&
          requestData.map((el: RequestGetContent, index: number) => (
            <RequestPostLink
              key={el.id}
              currentRequest={el}
              setRequest={setRequestData}
              allRequest={requestData}
              index={index}
            />
          ))}
      </ManagementPostContainer>
    </ManagementContainer>
  );
}

export default Management;

type PostHeader = {
  header: boolean;
};

const ManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px;
`;

const ManagementTitle = styled.div`
  margin: 20px;
  padding: 20px 20px 20px 50px;
  border-bottom: 2px solid #808080;
  font-size: 30px;
  font-weight: bolder;
  color: #505050;
`;

const ManagementPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
`;

const RequestPostLinkContainer = styled.div<PostHeader>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #c0c0c0;
  font-size: 20px;
  font-weight: 600;
  color: #444444;
  :hover {
    background-color: ${({ header }) => (header ? 'none' : '#ff904d1a')};
  }
`;

const RequestPostNumberHeader = styled.p`
  width: 120px;
  text-align: center;
  :hover {
    color: #ff904d;
    cursor: pointer;
  }
`;

const RequestPostNameHeader = styled.p`
  width: calc(100% - 120px - 120px - 60px);
  text-align: center;
`;
