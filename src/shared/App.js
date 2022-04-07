import React from "react";
import "./App.css";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "./Header";
import Search from "./Search";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { isSession } from "./firebase";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Notification from "../pages/Notification";

function App() {
  const dispatch = useDispatch();
  const is_session = isSession();
  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);
  return (
    <div className="App flex-column-center">
      <Header />
      <Grid
        padding="0 40px"
        width="600px"
        bs="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
      >
        
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/postwrite" exact component={PostWrite} />
          <Route path="/postedit/:pid" exact component={PostWrite} />
          <Route path="/post/:pid" exact component={PostDetail} />

          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/notification" exact component={Notification}></Route>

          <Route path="/search" exact component={Search} />
        </ConnectedRouter>
      </Grid>
    </div>
  );
}

export default App;
