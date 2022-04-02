import React from "react";

import Post from "../components/Post";
import Icons from "../elements/Icons";
import Permit from "../shared/Permit";

import { history } from "../redux/configureStore";

const PostList = props => {
  return (
    <>
      <Post />
      <Permit>
        <Icons
          icon={"MdAddBox"}
          color={"red"}
          position={"fixed"}
          trbl={["", "30px", "30px", ""]}
          size={60}
          _onClick={() => history.push("/postwrite")}
        ></Icons>
      </Permit>
    </>
  );
};

export default PostList;
