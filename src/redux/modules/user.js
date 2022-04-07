import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  updateProfile,
  browserSessionPersistence,
} from "firebase/auth";
import { _session_key, auth } from "../../shared/firebase";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const setUser = createAction(SET_USER, user => ({ user }));
const logOut = createAction(LOG_OUT, user => ({ user }));
const getUser = createAction(GET_USER, user => ({ user }));

const initialState = {
  user: {
    user_name: "",
    id: "",
    user_profile: "https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-23ac8.appspot.com/o/images%2FUmLR4GolOEXmfVAUD01VbLPajQt2_1649076812067?alt=media&token=08609bd5-4ac4-43eb-9f3c-474c5c38a6d9",
    user_id: "",
  },
  is_login: false,
};


// middlewaore actions
const signUpFB = (id, pwd, name) => {
  return function (dispatch, getState, { history }) {
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
                user_profile: "https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-23ac8.appspot.com/o/images%2FUmLR4GolOEXmfVAUD01VbLPajQt2_1649076812067?alt=media&token=08609bd5-4ac4-43eb-9f3c-474c5c38a6d9",
                user_id: userCredential.user.uid,
              })
            );
            history.push("/");
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
        window.alert("이메일 / 비밀번호 형식이 맞지 않습니다!")
      });
  };
};

const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, id, pwd).then(
          user => {
            dispatch(
              setUser({
                user_name: user.user.displayName,
                id: id,
                user_profile: "https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-23ac8.appspot.com/o/images%2FUmLR4GolOEXmfVAUD01VbLPajQt2_1649076812067?alt=media&token=08609bd5-4ac4-43eb-9f3c-474c5c38a6d9",
                user_id: user.user.uid,
              })
            );
            history.push("/");
          }
        );
      })
      .catch(error => {
        console.log(error);
        window.alert("이메일 / 비밀번호 형식이 맞지 않거나, 비밀번호가 일치하지 않습니다!")
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            id: user.id,
            user_profile: "https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-23ac8.appspot.com/o/images%2FUmLR4GolOEXmfVAUD01VbLPajQt2_1649076812067?alt=media&token=08609bd5-4ac4-43eb-9f3c-474c5c38a6d9",
            user_id: user.uid,
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
        sessionStorage.removeItem(_session_key);
        draft.user = {
          user_name: "",
          id: "",
          user_profile: "",
          user_id: "",
        };
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
