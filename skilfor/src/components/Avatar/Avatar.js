import styled from "styled-components";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarWrapper = styled(ColumnContainer)`
  width: 100%;
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

export const AvatarName = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-top: 12px;
`;

const AvatarStatus = styled.p`
  color: white;
  font-size: 8px;
  border-radius: 40px;
  background-color: ${(props) => props.theme.colors.white_pure};
  color: ${(props) => props.theme.colors.grey_dark};
  padding: 0px 8px;
  margin-top: 5px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

function Avatar({ imgSrc, name, status }) {
  return (
    <AvatarWrapper>
      <AvatarContainer imgSrc={imgSrc} />
      <AvatarName>{name}</AvatarName>
      <AvatarStatus>{status}</AvatarStatus>
    </AvatarWrapper>
  );
}

export default Avatar;
