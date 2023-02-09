import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-family: sans-serif;
  background-color: #FFF;
`;

const Select = ({ options, onChange }) => {
  return (
    <StyledSelect onChange={(e) => onChange(e.target.value)}>
      {options.map((option, index) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;