import React from "react";
import { Grid, Text, Image } from "../elements";


const Post = props => {
  return (
    <>
      <Grid>
        <Grid is_flex>
          <Image shape={"circle"} src={props.image_url}></Image>
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>
        <Grid padding={"16px"}>
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url}></Image>
        </Grid>
        <Grid>
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
      "https://reactrealbaisc.s3.ap-northeast-2.amazonaws.com/18_RM.png",
  },
  image_url: "https://reactrealbaisc.s3.ap-northeast-2.amazonaws.com/18_RM.png",
  contents: "선장님~~~",
  comment_cnt: 0,
  insert_dt: "2022-04-01 10:00:00",
};

export default Post;
