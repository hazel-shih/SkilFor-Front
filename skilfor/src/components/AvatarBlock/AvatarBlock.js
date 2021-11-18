import styled from "styled-components";
import studentPic from "../../img/student.jpg";
import teacherPic from "../../img/teacher.jpeg";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarContainer = styled(ColumnContainer)`
  height: 200px;
  background: ${(props) => props.theme.colors.green_dark};
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.div`
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

const AvatarStatus = styled.p`
  color: white;
  font-size: 0.8rem;
  border-radius: 40px;
  background-color: ${(props) => props.theme.colors.white_pure};
  color: ${(props) => props.theme.colors.grey_dark};
  padding: 0px 8px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

function AvatarBlock({ identity }) {
  // fake data
  const student = {
    img: studentPic,
    name: "Ben",
    status: "上課點數：120",
  };
  const teacher = {
    img: teacherPic,
    name: "Kelly",
    status: null,
  };
  // 這邊邏輯只是暫時寫這樣，到時候會跟User的資料串再重寫
  return (
    <AvatarContainer>
      <Avatar imgSrc={identity === "student" ? student.img : teacher.img} />
      <AvatarName>
        {identity === "student" ? student.name : teacher.name}
      </AvatarName>
      <AvatarStatus>
        {identity === "student" ? student.status : teacher.status}
      </AvatarStatus>
    </AvatarContainer>
  );
}

export default AvatarBlock;
