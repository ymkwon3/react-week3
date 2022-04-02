import React from "react";
import "./App.css";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "./Header";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";

import { useDispatch } from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user"
import { isSession } from "./isLogin";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

function App() {
  const dispatch = useDispatch();

  const is_session = isSession();

  React.useEffect(() => {
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  }, []);
  return (
    <div className="App flex-column-center">
      <Grid>
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/postwrite" exact component={PostWrite} />
          <Route path="/postdetail" exact component={PostDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
        </ConnectedRouter>
      </Grid>
    </div>
  );
}

export default App;
