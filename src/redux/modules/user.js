import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  updateProfile,
  browserSessionPersistence,
} from "firebase/auth";
import { firebase, _session_key } from "../../shared/firebase";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const setUser = createAction(SET_USER, user => ({ user }));
const logOut = createAction(LOG_OUT, user => ({ user }));
const getUser = createAction(GET_USER, user => ({ user }));

const initialState = {
  user: null,
  is_login: false,
};

const user_initial = {
  user_name: "ingmin",
};

// middlewaore actions

const signUpFB = (id, pwd, name) => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth(firebase);
    createUserWithEmailAndPassword(auth, id, pwd)
      .then(userCredential => {
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            dispatch(
              setUser({
                user_name: name,
                id: id,
                user_profile: "",
                uid: userCredential.user.uid,
              })
            );
            history.push("/");
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
};

const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth(firebase);

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, id, pwd).then(
          userCredential => {
            dispatch(
              setUser({
                user_name: userCredential.user.displayName,
                id: id,
                user_profile: "",
                uid: userCredential.user.uid,
              })
            );
            history.push("/");
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth(firebase);
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            id: user.id,
            user_profile: "",
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, draft => {
        sessionStorage.removeItem(_session_key)
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  getUser,
  logOut,
  signUpFB,
  loginFB,
  loginCheckFB,
};

export { actionCreators };
