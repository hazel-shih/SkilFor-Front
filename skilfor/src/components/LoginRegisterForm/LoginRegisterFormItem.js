import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../constants/breakpoints";

export const FormItemContainer = styled.div`
  margin: 5px 0;
  padding: 5px 0 0;
  width: 80%;
  height: 80px;
  ${MEDIA_QUERY_SM} {
    height: 55px;
  }
`;

export const ItemName = styled.h1`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.4rem;
  margin: 5px 0;
  ${MEDIA_QUERY_SM} {
    font-size: 1.2rem;
    margin: 2px 0;
  }
  > span {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.grey_light};
  }
`;

const ItemLabel = styled.label`
  width: 50%;
  cursor: pointer;
  font-size: 1.3rem;
  padding: 10px;
  float: left;
  ${MEDIA_QUERY_SM} {
    padding: 6px;
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
    margin: 8px;
  }
`;

export function FormItem({ itemName, id, value, type, name, handleChange }) {
  return (
    <>
      <FormItemContainer>
        <ItemName>
          {itemName}
          {id === "password" && <span>(至少需有六碼)</span>}
        </ItemName>
        <ItemInput
          id={id}
          value={value}
          type={type}
          name={name}
          onChange={handleChange}
        />
      </FormItemContainer>
    </>
  );
}

export function RadioFormItem({
  radioItemName,
  id,
  value,
  type,
  name,
  handleChange,
}) {
  return (
    <ItemLabel>
      <ItemRadioInput
        id={id}
        value={value}
        type={type}
        name={name}
        onChange={handleChange}
      />
      {radioItemName}
    </ItemLabel>
  );
}
