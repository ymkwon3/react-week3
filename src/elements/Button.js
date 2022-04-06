import React from "react";
import styled from "styled-components";

const Button = props => {
  const { width, height, color, bg, size, padding, _onClick, children } = props;
  const styles = {
    width: width,
    height: height,
    color: color,
    size: size,
    padding: padding,
    bg: bg,
  };
  return (
    <>
      <ButtonStyled {...styles} onClick={(e) => {
        e.stopPropagation();
        _onClick();
      }} >{children}</ButtonStyled>
    </>
  );
};

Button.defaultProps = {
  width: "100%",
  height: null,
  color: "#ffffff",
  size: "14px",
  padding: "0",
  bg: "#000000",
};

const ButtonStyled = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${props => props.size};
  padding: ${props => props.padding};
  color: ${props => props.color};
  background-color: ${(props) => props.bg};
  border: none;
  cursor: pointer;
`;

export default Button;
