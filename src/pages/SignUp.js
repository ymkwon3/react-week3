import React from "react";
import { Grid, Text, Input, Button } from "../elements";
import {} from "react-router-dom";

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
    if (id === "" || name === "" || pwd === "" || cpwd === ""){
      window.alert("빈칸을 채워주세요!");
      return
    }

    if (pwd !== cpwd) {
      window.alert("비밀번호가 일치하지 않습니다!");
      return
    };
    dispatch(userActions.signUpFB(id, pwd, name));
  };

  return (
    <>
      <Grid className="flex-column-center" padding="40px 10px">
        <Grid>
          <Text fontWeight="bold" fontSize={"30px"}>
            회원가입
          </Text>
        </Grid>
        <Grid margin={"10px auto"}>
          <Input
            ph={"test@test.com"}
            label={"아이디"}
            padding={"10px"}
            color={"#80a841"}
            _onChange={e => setId(e.target.value)}
          ></Input>
        </Grid>
        <Grid margin={"10px auto"}>
          <Input
            ph={"닉네임을 입력해주세요!"}
            label={"닉네임"}
            padding={"10px"}
            color={"#80a841"}
            _onChange={e => setName(e.target.value)}
          ></Input>
        </Grid>
        <Grid margin={"10px auto"}>
          <Input
            ph={"비밀번호는 8자리 이상적어주세요!"}
            label={"비밀번호"}
            padding={"10px"}
            type={"password"}
            color={"#80a841"}
            _onChange={e => setPwd(e.target.value)}
          ></Input>
        </Grid>
        <Grid margin={"10px auto"}>
          <Input
            ph={"비밀번호는 8자리 이상적어주세요!"}
            label={"비밀번호 확인"}
            padding={"10px"}
            type={"password"}
            color={"#80a841"}
            _onChange={e => setCpwd(e.target.value)}
          ></Input>
        </Grid>
        <Grid>
          <Button
            bg={"#80a841"}
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
