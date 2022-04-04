import React from "react";
import styled from "styled-components";

const Grid = props => {
  const {
    is_flex,
    width,
    height,
    margin,
    padding,
    bg,
    position,
    textAlign,
    scroll,
    border,
    children,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    position: position,
    bg: bg,
    textAlign: textAlign,
    scroll: scroll,
    border: border,
  };
  return (
    <>
      <GridBox {...styles}>{children}</GridBox>
    </>
  );
};

Grid.defaultProps = {
  is_flex: false,
  width: "100%",
  height: "",
  padding: "",
  margin: "",
  bg: "",
  position: "static",
  children: null,
  textAlign: "",
  scroll: false,
  border: "none",
};

const GridBox = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  box-sizing: border-box;
  position: ${props => props.position};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  background-color: ${props => props.bg};
  text-align: ${props => props.textAlign};
  border: ${props => props.border};
  ${props =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ""};
  ${props =>
    props.scroll ? `overflow-y:auto` : ``};
`;

export default Grid;
