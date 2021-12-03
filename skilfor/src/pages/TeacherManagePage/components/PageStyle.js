import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../../components/constants/breakpoints";

export const RowContainer = styled.div`
  display: flex;
`;
export const SectionText = styled.h3`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.green_dark};
  margin: 10px 10px 20px 0;
`;
export const EditContainer = styled(RowContainer)`
  justify-content: space-between;
  align-items: baseline;
  margin-top: 10px;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    margin-bottom: 30px;
  }
`;
export const EditButton = styled.button`
  background: ${(props) => props.theme.colors.green_dark};
  border: none;
  color: white;
  font-size: 1rem;
  height: fit-content;
  padding: 7px 14px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
export const SubmitButton = styled(EditButton)`
  margin-left: 15px;
`;
