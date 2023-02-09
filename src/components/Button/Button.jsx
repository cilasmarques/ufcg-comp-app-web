import React from 'react';
import styled from 'styled-components';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const ButtonContainer = styled.button`
  background-color: ${props => props.backgroundColor || '#497DB1'};
  border-radius: 2px;
  border: '1px solid #FFF';
  color: #FFF;
  font-weight: bold;
  font-family: sans-serif;
  text-transform: uppercase;
  min-width: 80px;
  min-height: 25px;
`

const DownloadButton = styled.button`
  min-width: 250px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  text-decoration: none;
  background: #FFF;
  color: #000;
  border: '1px solid #000';
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  transition: 0.2s ease-in-out;
  &:hover {
    background: #004a8f;
    color: #FFF;
    border-color: #FFF;
  }
`;

const Button = (props) => {
  switch (props.variant) {
    case 'download':
      return <DownloadButton {...props}>
        <FileDownloadOutlinedIcon />
        {props.text}
      </DownloadButton>;
    default:
      return <ButtonContainer {...props}>
        {props.text}
      </ButtonContainer>;
  };
};

export default Button;