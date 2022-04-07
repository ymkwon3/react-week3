import React from "react";
import { Grid, Image, Text } from "../elements";
import { history } from "../redux/configureStore";

const NotiCard = props => {

  const {image_url, user_name, post_id} = props;

  const styles = {
    bg: "#f9f9f9",
    height: "100px",
    margin: "20px 0",
    flex: 'start',
    padding: '0 20px'
  };

  return (
    <Grid {...styles} _onClick={() => history.push(`/post/${post_id}`)}>
      <Grid width="100px">
        <Image shape="rectangle" src={image_url}></Image>
      </Grid>
      <Grid margin="0 0 0 40px">
      <Text><span style={{fontWeight: 'bold'}}>{user_name}</span>님이 댓글을 남겼습니다!</Text>
      </Grid>
    </Grid>
  );
};

export default NotiCard;
