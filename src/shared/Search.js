import React from "react";
import _ from "lodash";

const Search = () => {
  const [text, setText] = React.useState("");
  const onChange = e => {
    setText(e.target.value);
    keyPress(e);
  };

  const debounce = _.debounce(e => console.log("ddd",e.target.value), 1000);
  const throttle = _.throttle(e => console.log("ttt",e.target.value), 1000);
  const keyPress = React.useCallback(debounce, []);

  return (
    <>
      <input type="text" onChange={onChange}></input>
    </>
  );
};

export default Search;
