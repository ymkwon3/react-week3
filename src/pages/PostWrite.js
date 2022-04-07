import React from "react";
import { Button, Grid, Image, Input, Text } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Upload from "../shared/Upload";
import { actionCreators } from "../redux/modules/image";

const PostWrite = props => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const preview = useSelector(state => state.image.preview);
  const post_list = useSelector(state => state.post.list);

  const pid = props.match.params.pid;
  const _post = pid ? post_list.find(v => v.id === pid) : null;
  const [content, setContent] = React.useState(_post ? _post.contents : "");
  const [radioState, setRadioState] = React.useState("left");

  const writeBtn = (type) => {
    if(content === "") {
      window.alert("빈칸을 채워주세요!");
      return;
    }

    if(preview === null && type === "add") {
      window.alert("사진을 추가해주세요!")
      return ;
    }


    if(type === "update") {
      dispatch(postActions.updatePostFB(content, pid, radioState))
    }else {
      dispatch(postActions.addPostFB(content, radioState))
    }
  }

  React.useEffect(()=>{
    return () => {
      dispatch(actionCreators.setPreview(null))
    }
  }, [])

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
      <Grid padding="10px">
        <Grid padding="10px" is_flex_around>
          <Text ta="center" width="100%" fontWeight="bold" fontSize="30px">
            {_post ? "게시글 수정" : "게시글 작성"}
          </Text>
        </Grid>
        <Grid is_flex>
          <Upload></Upload>
        </Grid>
        <Grid>
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

        <Grid margin="20px 0 0 0">
          <Grid>
            <input
              type="radio"
              id="left"
              checked={radioState === "left"}
              onChange={() => setRadioState("left")}
            />
            <label>left</label>
          </Grid>
          <Grid>
            <input
              type="radio"
              id="right"
              checked={radioState === "right"}
              onChange={() => setRadioState("right")}
            />
            <label>right</label>
          </Grid>
          <Grid>
            <input
              type="radio"
              id="full"
              checked={radioState === "full"}
              onChange={() => setRadioState("full")}
            />
            <label>full</label>
          </Grid>
        </Grid>

        <Grid margin="20px 0 0 0">
          <Input
            value={content}
            _onChange={e => setContent(e.target.value)}
            label={"게시글 내용"}
            textarea={true}
            ph={"내용을 입력해주세요"}
            padding="6px"
            color="#80a841"
          ></Input>
        </Grid>
        <Grid>
          <Button
            height={"50px"}
            bg="#80a841"
            _onClick={() => {
              _post
                ? writeBtn("update")
                : writeBtn("add");
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
