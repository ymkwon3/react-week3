import React from "react";
import { Grid, Text, Image, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import CommentIcon from "@mui/icons-material/Comment";

const Post = props => {
  const uid = useSelector(state => state.user.user.user_id);
  const dispatch = useDispatch();
  return (
    <>
      <Grid
        padding="10px"
        margin="40px 0"
        bs="rgba(128, 168, 65, 0.3) 0px 0px 0px 3px;"
      >
        <Grid flex="space-between">
          <Grid flex="start">
            <Image shape="circle" src={props.user_info.user_profile}></Image>
            <Text width="200px" ta="start" bold>
              {props.user_info.user_name}
            </Text>
          </Grid>

          <Text width="100px" ta="right" type="date">
            {props.insert_dt}
          </Text>
          {props.user_info.user_id === uid ? (
            <Grid width="140px" is_flex>
              <Button
                width="60px"
                bg="#80a841"
                margin="0 5px"
                _onClick={() => history.push(`/postedit/${props.id}`)}
              >
                수정
              </Button>
              <Button
                width="60px"
                bg="#dd0000"
                margin="0 5px"
                _onClick={() => dispatch(postActions.deletePostFB(props.id))}
              >
                삭제
              </Button>
            </Grid>
          ) : null}
        </Grid>
        {props.radioState === "left" ? (
          <Grid flex="start">
            <Grid>
              <Image shape="rectangle" src={props.image_url}></Image>
            </Grid>
            <Grid padding={"16px"}>
              <Text>{props.contents}</Text>
            </Grid>
          </Grid>
        ) : (
          <Grid flex={props.radioState === "right" ? "start" : ""}>
            <Grid padding={"16px"}>
              <Text>{props.contents}</Text>
            </Grid>
            <Grid>
              <Image shape="rectangle" src={props.image_url}></Image>
            </Grid>
          </Grid>
        )}
        <Grid margin="10px 0 0 5px" flex="start">
          <CommentIcon style={{ color: "#80a841" }}></CommentIcon>
          <Text bold>{props.comment_cnt}개</Text>
        </Grid>
      </Grid>
    </>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "min",
    user_profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmHjmasqWbB3IdXO80h_PDBPg3Th4SGcpTwg&usqp=CAU",
  },
  image_url: "https://reactrealbaisc.s3.ap-northeast-2.amazonaws.com/31_RM.png",
  contents: "선장님~~~",
  comment_cnt: 0,
  insert_dt: "2022-04-01 10:00:00",
};

export default Post;
