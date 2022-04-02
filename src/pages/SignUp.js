import React from "react";
import { Grid, Text, Input, Button } from "../elements";
import {  } from "react-router-dom";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const SignUp = props => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [cpwd, setCpwd] = React.useState("");

  const signupBtn = () => {
    if(pwd !== cpwd)
      return;
    dispatch(userActions.signUpFB(id, pwd, name))
  };

  return (
    <>
      <Grid width={"400px"} className="flex-column-center">
        <Grid>
          <Text bold size={"22px"}>
            회원가입
          </Text>
        </Grid>
        <Grid margin={"10px auto"}>
          <Input
            ph={"아이디를 입력해주세요!"}
            label={"아이디"}
            padding={"10px"}
            _onChange={e => setId(e.target.value)}
          ></Input>
        </Grid>
        <Grid margin={"10px auto"}>
          <Input
            ph={"닉네임을 입력해주세요!"}
            label={"닉네임"}
            padding={"10px"}
            _onChange={e => setName(e.target.value)}
          ></Input>
        </Grid>
        <Grid margin={"10px auto"}>
          <Input
            ph={"비밀번호를 입력해주세요!"}
            label={"비밀번호"}
            padding={"10px"}
            type={"password"}
            _onChange={e => setPwd(e.target.value)}
          ></Input>
        </Grid>
        <Grid margin={"10px auto"}>
          <Input
            ph={"비밀번호를 확인해주세요!"}
            label={"비밀번호 확인"}
            padding={"10px"}
            type={"password"}
            _onChange={e => setCpwd(e.target.value)}
          ></Input>
        </Grid>
        <Grid>
          <Button
            bg={"black"}
            color={"#ffffff"}
            height={"40px"}
            _onClick={signupBtn}
          >
            회원가입하기
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
