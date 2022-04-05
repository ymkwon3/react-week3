import React from "react";
import { Grid, Image, Text } from "../elements";

const NotiCard = props => {
  const styles = {
    bg: "#eee",
    height: "100px",
    margin: "20px 0",
    is_flex: true,
  };

  return (
    <Grid {...styles}>
      <Grid width="100px">
        <Image shape="rectangle"></Image>
      </Grid>
      <Grid margin="0 0 0 40px">
      <Text><span style={{fontWeight: 'bold'}}>{props.children}</span>님이 댓글을 남겼습니다!</Text>
      </Grid>
    </Grid>
  );
};

export default NotiCard;
