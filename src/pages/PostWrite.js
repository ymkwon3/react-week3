import React from "react";
import { Button, Grid, Image, Input, Text } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Upload from "../shared/Upload";

const PostWrite = props => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const preview = useSelector(state => state.image.preview);
  const post_list = useSelector(state => state.post.list);
  const pid = props.match.params.pid;
  const _post = pid ? post_list.find(v => v.id === pid) : null;
  const [content, setContent] = React.useState(_post ? _post.contents : "");
  if (!is_login) {
    return (
      <Grid margin="100px auto" textAlign="center">
        <Text fontWeight="bold" fontSize="24px">
          로그인이 필요한 서비스입니다!
        </Text>
      </Grid>
    );
  }

  return (
    <>
      <Grid>
        <Grid>
          <Text fontWeight="bold" fontSize="24px">
            {_post ? "게시글 수정" : "게시글 작성"}
          </Text>
        </Grid>
        <Grid is_flex>
          <Upload></Upload>
        </Grid>
        <Grid>
          <Text bold={true} size={"20px"}>
            미리보기
          </Text>
          <Image
            shape="rectangle"
            src={
              preview
                ? preview
                : _post
                ? _post.image_url
                : "https://reactrealbaisc.s3.ap-northeast-2.amazonaws.com/31_RM.png"
            }
          ></Image>
        </Grid>
        <Grid>
          <Input
            value={content}
            _onChange={e => setContent(e.target.value)}
            label={"게시글 내용"}
            textarea={true}
            ph={"내용을 입력해주세요"}
            padding="6px"
          ></Input>
        </Grid>
        <Grid>
          <Button
            height={"50px"}
            _onClick={() => {
              _post
                ? dispatch(postActions.updatePostFB(content, pid))
                : dispatch(postActions.addPostFB(content));
            }}
          >
            {_post ? "게시글 수정" : "게시글 작성"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PostWrite;
