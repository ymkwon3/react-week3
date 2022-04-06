import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Text, Input, Button } from "../elements";

const Login = props => {
  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const dispatch = useDispatch();

  const loginBtn = () => {

    //테스트 계정 로그인 편하게 해주려고 했습니다. 나중에 지워야합니다람쥐
    // dispatch(userActions.loginFB("t@test.com", "1q2w3e4r"));
    dispatch(userActions.loginFB(id, pwd));
  }

  return (
    <>
      <Grid className="flex-column-center">
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
          ></Input>
        </Grid>
        <Grid>
          <Button bg={"black"} color={"#ffffff"} height={"40px"} _onClick={loginBtn}>로그인하기</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
