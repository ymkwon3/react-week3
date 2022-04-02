import React from "react";
import styled from "styled-components";
import { Text } from "./index";

const Input = props => {
  const { width, color, size, padding, ph, label, type, textarea, _onChange } =
    props;

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
          ></TextAreaStyled>
        ) : (
          <InputStyled
            {...styles}
            placeholder={ph}
            type={type}
            onChange={_onChange}
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
  textarea: false,
};

const TextAreaStyled = styled.textarea`
  width: ${props => props.width};
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
