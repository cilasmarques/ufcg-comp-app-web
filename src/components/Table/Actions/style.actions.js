import styled from "styled-components";

import { Box } from "@mui/material";

export const BoxStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  padding: 20px;
  top: 50%;
  left: 50%;
  box-shadow: 24;
  position: absolute;
  border: 2px solid #000;
  transform: translate(-50%, -50%);
  background-color: #fff; 
`;

