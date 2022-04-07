import React from "react";
import { Grid, Text, Button } from "../elements";
import NotiBadge from "../components/NotiBadge";
import { history } from "../redux/configureStore";
import {AiFillHome} from "react-icons/ai"

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = props => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);

  return (
    <Grid flex="space-between" padding="4px 32px" className="header">
      <AiFillHome className="hover" color="white" size={28} onClick={() => history.push("/")}></AiFillHome>
      {is_login ? (
        <Grid flex="end" width="160px">
          <NotiBadge _onClick={() => history.push("/notification")}></NotiBadge>
          <Button
            margin="0 5px"
            bg="transparent"
            color="#fff"
            _onClick={() => dispatch(userActions.logOut({}))}
          >
            로그아웃
          </Button>
        </Grid>
      ) : (
        <Grid flex="end" width="160px">
          <Button
            margin="0 5px"
            bg="transparent"
            color="#fff"
            _onClick={() => history.push("/login")}
          >
            로그인
          </Button>
          <Button
            margin="0 5px"
            bg="transparent"
            color="#fff"
            _onClick={() => history.push("/signup")}
          >
            회원가입
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

Header.defaultProps = {};

export default Header;
