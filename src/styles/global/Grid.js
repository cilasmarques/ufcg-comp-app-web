import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 17rem auto;
  grid-template-rows: 5rem auto;
  grid-template-areas:
    "SB CT"
    "SB CT";
  height: 100vh;
  min-width: 19rem;
`;

export const GridSidebar = styled.div`
  grid-area: SB;
  height: 100%;
  position: relative;
  box-sizing: border-box;
`;

export const GridContent = styled.div`
  grid-area: CT;
  padding: 0.75rem 1.5rem 0.25rem 2rem;
  align-items: "center";
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;