import React from "react";
import styled from "styled-components";

const Grid = props => {
  const {
    flex,
    width,
    height,
    margin,
    padding,
    bg,
    position,
    textAlign,
    border,
    children,
    _onClick,
    className,
    bs,
  } = props;

  const styles = {
    flex: flex,
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    position: position,
    bg: bg,
    bs: bs,
    textAlign: textAlign,
    border: border,
  };
  return (
    <>
      <GridBox className={className} {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </>
  );
};

Grid.defaultProps = {
  flex: '',
  width: "100%",
  height: "",
  padding: "",
  margin: "",
  bg: "",
  position: "static",
  children: null,
  textAlign: "",
  border: "none",
  bs: "",
  _onClick: () => {},
};

const GridBox = styled.div`
  width: 100%;
  max-width: ${props => props.width};
  height: ${props => props.height};
  position: ${props => props.position};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  background-color: ${props => props.bg};
  text-align: ${props => props.textAlign};
  border: ${props => props.border};
  box-shadow: ${props => props.bs};
  ${props =>
    props.flex === 'start'
      ? `display: flex; align-items: center; justify-content: start`
      : props.flex === 'space-between'
      ? `display: flex; align-items: center; justify-content: space-between;`
      : props.flex === 'space-around'
      ? `display: flex; align-items: center; justify-content: space-around;`
      : props.flex === 'end'
      ? `display: flex; align-items: center; justify-content: end;`
      : ""};
`;

export default Grid;
