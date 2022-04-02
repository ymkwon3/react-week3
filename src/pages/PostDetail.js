import React from "react";

import Post from "../components/Post";
import Icons from "../elements/Icons";
import Permit from "../shared/Permit";

import { history } from "../redux/configureStore";
import { Button, Grid, Input } from "../elements";
import CommentList from "../components/CommentList";

const PostDetail = props => {
  return (
    <>
      <Post />
      <Grid padding="16px" is_flex>
        <Input width="300px" ph="댓글 내용을 입력해주세요"></Input>
        <Button width="50px" margin="0 2px 0 2px">작성</Button>
      </Grid>
      <CommentList></CommentList>
    </>
  );
};

export default PostDetail;
