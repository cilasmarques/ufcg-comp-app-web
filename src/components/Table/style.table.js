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
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  margin-right: 0;
  flex-direction: revert;
`;

export const TableBodyStyled = styled(TableBody)`
  max-height: 100px;
`;

