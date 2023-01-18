import styled from 'styled-components';

interface Props {
  title: string;
  content: string;
}

function RequestPost({ title, content }: Props) {
  return (
    <RequestPostContainer>
      <RequestPostTitle>{title}</RequestPostTitle>
      <RequestPostContent>{content}</RequestPostContent>
    </RequestPostContainer>
  );
}
export default RequestPost;

const RequestPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RequestPostTitle = styled.h1``;

const RequestPostContent = styled.div``;
