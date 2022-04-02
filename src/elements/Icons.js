import React from "react";

const Icons = props => {
  const { icon, size, color, position, trbl, _onClick } = props;
  const it = (icon[0] + icon[1]).toLowerCase();

  const attrs = {
    icon: icon,
    it: it,
    size: size,
    color: color,
    onClick: _onClick,
  };

  const styles = {
    position: position,
    top: trbl[0],
    right: trbl[1],
    bottom: trbl[2],
    left: trbl[3],
  };

  const tags = { md: require("react-icons/md") };
  const Tag = tags[it][icon];
  
  return (
    <>
      <Tag {...attrs} style={styles} className="icon"></Tag>
    </>
  );
};

Icons.defaultProps = {
  icon: "circle",
  size: "24",
  color: "#000000",
  position: "relative",
  trbl: [0, 0, 0, 0],
};

export default Icons;
