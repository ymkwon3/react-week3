import React from "react";

import Post from "../components/Post";
import Icons from "../elements/Icons";
import Permit from "../shared/Permit";

import { history } from "../redux/configureStore";
import { Button, Grid, Input } from "../elements";
import CommentList from "../components/CommentList";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as commentActions } from "../redux/modules/comment";

const PostDetail = props => {
  const dispatch = useDispatch();
  const pid = props.match.params.pid;
  const post = useSelector(state => state.post.list).find(v => v.id === pid);
  const [comment_text, setCommentText] = React.useState("");

  const setComment = () => {
    if(comment_text === "") {
      window.alert("빈칸을 채워주세요!");
      return;
    }
    setCommentText("");
    dispatch(commentActions.addCommentFB(pid, comment_text));
  };

  React.useEffect(() => {
    if (post) return;
    dispatch(postActions.getOnePostFB(pid));
  }, []);

  return (
    <>
      {post ? <Post {...post} /> : null}
      <Permit>
        <Grid padding="16px" flex="space-around">
          <Input
            width="300px"
            ph="댓글 내용을 입력해주세요"
            value={comment_text}
            isSubmit={true}
            _onSubmit={setComment}
            _onChange={e => setCommentText(e.target.value)}
          ></Input>
          <Button bg="#80a841" width="100px" margin="0 2px 0 2px" _onClick={setComment}>
            작성
          </Button>
        </Grid>
      </Permit>

      <CommentList post_id={pid}></CommentList>
    </>
  );
};

export default PostDetail;
