import React from "react";
import styled from "styled-components";

const Button = props => {
  const { margin, width, height, color, bg, size, padding, _onClick, children } = props;
  const styles = {
    margin: margin,
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
  margin: "0",
  width: "100%",
  height: null,
  color: "#ffffff",
  size: "20px",
  padding: "5px",
  bg: "#000000",
};

const ButtonStyled = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${props => props.size};
  padding: ${props => props.padding};
  color: ${props => props.color};
  background-color: ${(props) => props.bg};
  margin: ${(props) => props.margin};
  border: none;
  cursor: pointer;
  transition: 0.1s;

  &:active {
    transform: scale(0.95);
  }
`;

export default Button;
