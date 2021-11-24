import React, { useState } from "react";
import styled from "styled-components";
import pencil from "../../img/pencil.png";
import check from "../../img/check.png";
import cancel from "../../img/cancel.png";

const RowContainer = styled.div`
  display: flex;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormItemContainer = styled(ColumnContainer)`
  border-bottom: 1px solid
    ${(props) => (props.show ? props.theme.colors.grey_light : "transparent")};
  margin-bottom: 20px;
`;

const ItemTop = styled(RowContainer)``;
const ItemBottom = styled(ColumnContainer)`
  padding: 0 15px;
  margin-bottom: 10px;
`;

const ItemName = styled.p`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  margin-bottom: 10px;
`;

const EditBtn = styled.img`
  display: block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;
  display: ${(props) => (props.show ? "block" : "none")};
  :hover {
    opacity: 0.5;
  }
`;

const ItemValue = styled(ItemName)`
  margin-bottom: 0px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const EditInput = styled.input`
  height: 30px;
  padding: 5px;
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const EditTextArea = styled.textarea`
  height: 100px;
  padding: 5px;
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  display: ${(props) => (props.show ? "block" : "none")};
`;

function FormItem({ itemName, value, edited, simple }) {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(value);
  const [editValue, setEditValue] = useState(value);
  const handleEditClick = () => {
    setEdit(!edit);
  };
  const handleEditCheck = () => {
    setEditValue(input);
    setEdit(!edit);
  };

  const handleCancelCheck = () => {
    setInput(editValue);
    setEdit(!edit);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <FormItemContainer show={!edit}>
      <ItemTop>
        <ItemName>{itemName}</ItemName>
        {edited && (
          <>
            <EditBtn show={!edit} src={pencil} onClick={handleEditClick} />
            <EditBtn show={edit} src={check} onClick={handleEditCheck} />
            <EditBtn show={edit} src={cancel} onClick={handleCancelCheck} />
          </>
        )}
      </ItemTop>
      <ItemBottom>
        <ItemValue show={!edit}>{editValue}</ItemValue>
        {edited && simple && (
          <EditInput show={edit} value={input} onChange={handleInputChange} />
        )}
        {edited && simple === false && (
          <EditTextArea
            show={edit}
            value={input}
            onChange={handleInputChange}
          />
        )}
      </ItemBottom>
    </FormItemContainer>
  );
}

export default FormItem;
