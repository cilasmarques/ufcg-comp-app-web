import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border: solid 5px #004A8F;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 1.3rem;
  font-style: normal;
  line-height: 1.8rem;
  letter-spacing: 0.4px;
  text-align: center;
  color: #004A8F;
  padding-bottom: 25px;
  padding-top: 25px;
  border-bottom: solid 3px #E3EAFA;
`;

export const MenuContainer = styled.div`
  flex-basis: 20rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const MenuItemLink = styled(Link)`
  padding: 20px 24px;
  font-family: "Mulish", sans-serif;
  text-decoration: none !important;
  transition: all 0.25s ease-in-out;
  letter-spacing: 0.4px;
  line-height: 1.3px;
  margin-top: 2px;
  color: #004A8F;
  &:hover {
    background: #004A8F;
    color: #FFFFFF;
    cursor: pointer;
  }
  &:not(:first-child) {
    border-top: 1px solid rgba(223, 225, 235, 0.1);
    margin-top: 0.4rem;
  }
  > svg {
    opacity: 40%;
    margin-right: 1.3rem;
  }
`;

