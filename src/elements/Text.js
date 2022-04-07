import React from "react";
import styled from "styled-components";

const displayedAt = (createdAt) => {
  const milliSeconds = new Date() - Date.parse(createdAt);
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
}

const Text = props => {
  const {
    fontWeight,
    color,
    ta,
    fontSize,
    margin,
    padding,
    _onClick,
    children,
    className,
    type,
    width,
  } = props;

  const styles = {
    fontWeight: fontWeight,
    color: color,
    fontSize: fontSize,
    margin: margin,
    padding: padding,
    ta: ta,
    width: width,
  };

  let d = children;
  if (type === "date") {
    d = displayedAt(children);
  }

  return (
    <>
      <P className={className} {...styles} onClick={_onClick}>
        {d}
      </P>
    </>
  );
};

Text.defaultProps = {
  fontWeight: "",
  color: "#222831",
  fontSize: "20px",
  margin: "",
  width: "",
  type: "",
  ta: "",
  _onClick: () => {},
};

const P = styled.div`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  text-align: ${props => props.ta};
  max-width:${props => props.width};
  width: 100%;
  overflow-wrap: break-word;
`;

export default Text;
