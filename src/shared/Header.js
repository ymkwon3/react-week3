import React from "react";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configureStore";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = props => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);

  return (
    <>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" fontSize="24px" fontWeight="bold">
            대충로고
          </Text>
        </Grid>
        {is_login ? (
          <Grid is_flex>
            <Button _onClick={() => history.push("/login")}>내정보</Button>
            <Button _onClick={() => history.push("/signup")}>알림</Button>
            <Button _onClick={() => dispatch(userActions.logOut({}))}>
              로그아웃
            </Button>
          </Grid>
        ) : (
          <Grid is_flex>
            <Button _onClick={() => history.push("/login")}>로그인</Button>
            <Button _onClick={() => history.push("/signup")}>회원가입</Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

Header.defaultProps = {};

export default Header;
