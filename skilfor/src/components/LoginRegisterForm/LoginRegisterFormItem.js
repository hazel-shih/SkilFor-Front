import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../constants/breakpoints";
import { Link } from "react-router-dom";

export const FormItemContainer = styled.div`
  margin: 5px 0;
  padding: 10px 0 0;
  width: 80%;
  height: 80px;
  ${MEDIA_QUERY_SM} {
    height: 66px;
  }
`;

export const ItemName = styled.h1`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.4rem;
  margin: 5px 0;
  position: relative;
  ${MEDIA_QUERY_SM} {
    font-size: 1.3rem;
    margin: 2px 0;
  }
`;

const ForgetPassword = styled(Link)`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 1.2rem;
  text-decoration: none;
  ${MEDIA_QUERY_SM} {
    font-size: 1rem;
  }
`;

const ItemLabel = styled.label`
  width: 50%;
  cursor: pointer;
  font-size: 1.3rem;
  padding: 10px;
  float: left;
  ${MEDIA_QUERY_SM} {
    padding: 2px;
    font-size: 1rem;
  }
`;

const ItemInput = styled.input`
  height: 30px;
  padding: 5px;
  width: 100%;
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey_light};
  ${MEDIA_QUERY_SM} {
    height: 20px;
  }
`;

const ItemRadioInput = styled(ItemInput)`
  height: 30px;
  width: 50%;
  zoom: 0.6;
  ${MEDIA_QUERY_SM} {
    width: 20%;
    margin-right: 8px;
  }
`;

export function FormItem({ itemName, id, value, type, handleChange }) {
  return (
    <>
      <FormItemContainer>
        <ItemName>
          {itemName}
          {id === "password" && (
            <ForgetPassword to="./reset_password">忘記密碼</ForgetPassword>
          )}
        </ItemName>
        <ItemInput id={id} value={value} type={type} onChange={handleChange} />
      </FormItemContainer>
    </>
  );
}

export function RadioFormItem({
  radioItemName,
  value,
  id,
  type,
  name,
  handleClick,
}) {
  return (
    <ItemLabel>
      <ItemRadioInput
        value={value}
        id={id}
        type={type}
        name={name}
        onClick={handleClick}
      />
      {radioItemName}
    </ItemLabel>
  );
}
