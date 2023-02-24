import styled from "styled-components";

export const Title = styled.h2`
  color: #004a8f;
  line-height: 1.8rem;
  padding-bottom: 25px;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 70px;
`;

export const FormsConatiner = styled.div`
  // this div will contains a row with 3 elements and when the screen is small, it will be a column
  display: flex;
  flex-direction: row;
  max-width: 1250px;
  @media (max-width: 1250px) {
    flex-direction: column;
    height: 600px;
  }
`;

export const MediumFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 350px;
  height: 200px;
  margin: 10px;
`;

export const SmallFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 350px;
  height: 150px;
  margin: 10px;
`;
