import styled from "styled-components";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarWrapper = styled(ColumnContainer)`
  height: 200px;
  background: ${(props) => props.theme.colors.green_dark};
  align-items: center;
  justify-content: center;
`;

export const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: white;
  background-image: url(${(props) => props.imgSrc});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const AvatarName = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-top: 12px;
`;

function Avatar({ imgSrc, name }) {
  return (
    <AvatarWrapper>
      <AvatarContainer imgSrc={imgSrc} />
      <AvatarName>{name}</AvatarName>
    </AvatarWrapper>
  );
}

export default Avatar;
