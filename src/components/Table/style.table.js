import styled from "styled-components";

import { TableBody } from "@mui/material";

export const MainContainer = styled.main`
  margin-bottom: 3;
`;

export const TableContainer = styled.section`
  width: 100%;
  height: 75vh;
  border: solid 3px #004A8F;
  overflow: auto;
`;

export const TableFooter = styled.section`
  display: flex;
  align-items: center;
  flex-direction: revert;
  justify-content: flex-end;
`;

export const TableBodyStyled = styled(TableBody)`
  max-height: 100px;
`;

