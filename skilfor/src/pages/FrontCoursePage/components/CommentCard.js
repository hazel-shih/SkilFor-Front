import styled from "styled-components";
import { AvatarContainer } from "../../../components/Avatar/Avatar";
import { MEDIA_QUERY_SM } from "../../../components/constants/breakpoints";

const RowContainer = styled.div`
  display: flex;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentCardContainer = styled(RowContainer)`
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors.green_dark};
  border-radius: 10px;
  padding: 25px;
  :first-child {
    margin-top: 20px;
  }
  :not(:last-child) {
    margin-bottom: 25px;
  }
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;

const CommentContent = styled.p`
  color: ${(props) => props.theme.colors.grey_dark};
  margin-left: 20px;
  line-height: 1.8rem;
  font-size: 1.1rem;
  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
    margin-left: 0px;
  }
`;

const StudentInfosContainer = styled(ColumnContainer)`
  align-items: center;
  justify-content: center;
`;

const StudentName = styled.h3`
  color: ${(props) => props.theme.colors.grey_dark};
  margin-top: 15px;
`;

function CommentCard({ imgSrc, name, content }) {
  return (
    <CommentCardContainer>
      <StudentInfosContainer>
        <AvatarContainer imgSrc={imgSrc} />
        <StudentName>{name}</StudentName>
      </StudentInfosContainer>
      <CommentContent>{content}</CommentContent>
    </CommentCardContainer>
  );
}

export default CommentCard;
