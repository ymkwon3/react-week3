import React from "react";
import styled from "styled-components";

const Text = props => {
  const { fontWeight, color, fontSize, margin, _onClick, children } = props;
  const styles = { fontWeight: fontWeight, color: color, fontSize: fontSize, margin: margin };
  return (
    <>
      <P {...styles} onClick={_onClick}>{children}</P>
    </>
  );
};

Text.defaultProps = {
  fontWeight: "",
  color: "#222831",
  fontSize: "14px",
  margin: "",
};

const P = styled.div`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  margin: ${props => props.margin};
`;

export default Text;
