import React from "react";
import styled from "styled-components";
import { Text } from "./index";

const Input = props => {
  const {
    width,
    color,
    size,
    padding,
    ph,
    label,
    type,
    textarea,
    value,
    isSubmit,
    _onChange,
    _onSubmit,
  } = props;

  const styles = { width: width, color: color, size: size, padding: padding };
  return (
    <>
      <div>
        <Text margin="0">{label}</Text>
        {textarea ? (
          <TextAreaStyled
            {...styles}
            placeholder={ph}
            type={type}
            onChange={_onChange}
            value={value}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                _onSubmit(e);
              }
            }}
          ></TextAreaStyled>
        ) : isSubmit ? (
          <InputStyled
            {...styles}
            placeholder={ph}
            type={type}
            onChange={_onChange}
            value={value}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                _onSubmit(e);
              }
            }}
          ></InputStyled>
        ): (
          <InputStyled
            {...styles}
            placeholder={ph}
            type={type}
            onChange={_onChange}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                _onSubmit(e);
              }
            }}
          ></InputStyled>
        )}
      </div>
    </>
  );
};

Input.defaultProps = {
  width: "100%",
  color: "#222831",
  size: "14px",
  padding: "0",
  type: "text",
  isSubmit: false,
  textarea: false,
  _onSubmit: () => {},
  _onChange: () => {},
};

const TextAreaStyled = styled.textarea`
  width: ${props => props.width};
  height: 200px;
  font-size: ${props => props.size};
  padding: ${props => props.padding};
  border: 2px solid ${props => props.color};
`;

const InputStyled = styled.input`
  width: ${props => props.width};
  font-size: ${props => props.size};
  padding: ${props => props.padding};
  border: none;
  outline: none;
  border-bottom: 2px solid ${props => props.color};
`;

export default Input;
