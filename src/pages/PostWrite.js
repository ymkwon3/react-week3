import React from "react";
import { Button, Grid, Image, Input, Text } from "../elements";

const PostWrite = props => {
  return (
    <>
      <Grid>
        <Grid>
          <Text bold={true} size={"32px"}>
            게시글 작성
          </Text>
        </Grid>
        <Grid is_flex>
          <Input width="300px"></Input>
          <Button width="100px">이미지 선택</Button>
        </Grid>
        <Grid>
          <Text bold={true} size={"20px"}>미리보기</Text>
          <Image shape="rectangle" src={props.image_url}></Image>
        </Grid>
        <Grid>
          <Input label={"게시글 내용"} textarea={true} ph={"내용을 입력해주세요"} padding={"12px 4px"}></Input>
        </Grid>
        <Grid>
          <Button height={"50px"} _onClick={() => console.log("게시글 작성")}>게시글 작성</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PostWrite;
