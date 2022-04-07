import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Text, Input, Button } from "../elements";

const Login = props => {
  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const dispatch = useDispatch();

  const loginBtn = () => {
    if(id === "" || pwd === "") {
      window.alert("빈칸을 채워주세요!");
      return;
    }
    dispatch(userActions.loginFB(id, pwd));
  }

  return (
    <>
      <Grid className="flex-column-center" padding="40px 10px">
        <Grid>
          <Text fontWeight="bold" fontSize="24px">
            로그인
          </Text>
        </Grid>
        <Grid margin={"10px auto"}>
          <Input
            ph={"아이디를 입력해주세요!"}
            label={"아이디"}
            padding={"10px"}
            _onChange={(e) => setId(e.target.value)}
            color={"#80a841"}
          ></Input>
        </Grid>
        <Grid margin={"10px auto"}>
          <Input
            ph={"비밀번호를 입력해주세요!"}
            label={"비밀번호"}
            padding={"10px"}
            type={"password"}
            _onChange={(e) => setPwd(e.target.value)}
            _onSubmit={loginBtn}
            color={"#80a841"}
          ></Input>
        </Grid>
        <Grid>
          <Button bg={"#80a841"} color={"#ffffff"} height={"40px"} _onClick={loginBtn}>로그인하기</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
