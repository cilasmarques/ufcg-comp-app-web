import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.input`
  width: 350px;
  height: 35px;
  padding: 0 10px;
  font-size: 1rem;
  font-family: sans-serif;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const UploadFileLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const Input = (props) => {
  switch (props.variant) {
    case 'file':
      return <>
        <input id="inputFile" style={{ display: "none" }} type="file" {...props} />
        <UploadFileLabel htmlFor="inputFile" type="file" >
          {props.text || 'Escolha o arquivo' }
        </UploadFileLabel>
      </>;
    default:
      return <InputContainer {...props} />;
  };
};

export default Input;