import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import Icons from "../elements/Icons";
import Permit from "../shared/Permit";

import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = props => {
  const dispatch = useDispatch();
  const { list, paging, is_loading } = useSelector(state => state.post);
  React.useEffect(() => {
    if (list.length === 0) dispatch(postActions.getPostFB());
  }, []);

  return (
    <Grid bg="#EFF6FF" padding="20px 0">
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {list.map((v, i) => (
          <Grid bg="#fff" key={v.id} _onClick={() => history.push(`/post/${v.id}`)}>
            <Post {...v} index={i} />
          </Grid>
        ))}
      </InfinityScroll>
      <Permit>
        <Icons
          icon={"MdAddBox"}
          color={"red"}
          position={"fixed"}
          trbl={["", "15px", "15px", ""]}
          size={60}
          _onClick={() => history.push("/postwrite")}
        ></Icons>
      </Permit>
    </Grid>
  );
};

export default PostList;
