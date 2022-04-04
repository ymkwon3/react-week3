import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import Icons from "../elements/Icons";
import Permit from "../shared/Permit";

import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";

const PostList = props => {
  const dispatch = useDispatch();
  const post_list = useSelector(state => state.post.list);

  React.useEffect(() => {
    if (post_list.length === 0) dispatch(postActions.getPostFB());
  }, []);
  return (
    <Grid position="relative" height="90%">
      <Grid height="100%" scroll>
        {post_list.map((v, i) => (
          <Post key={v.id} {...v} index={i} />
        ))}
      </Grid>
      <Permit>
        <Icons
          icon={"MdAddBox"}
          color={"red"}
          position={"absolute"}
          trbl={["", "15px", "15px", ""]}
          size={60}
          _onClick={() => history.push("/postwrite")}
        ></Icons>
      </Permit>
    </Grid>
  );
};

export default PostList;
