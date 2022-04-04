import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db, storage } from "../../shared/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { actionCreators as ImageActions } from "./image";
import moment from "moment";

const user_collection = collection(db, "post");

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";

const setPost = createAction(SET_POST, post_list => ({ post_list }));
const addPost = createAction(ADD_POST, post => ({ post }));
const updatePost = createAction(UPDATE_POST, (pid, post) => ({ pid, post }));

const initialState = {
  list: [],
};

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "min",
  //   user_profile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmHjmasqWbB3IdXO80h_PDBPg3Th4SGcpTwg&usqp=CAU",
  // },
  image_url: "https://reactrealbaisc.s3.ap-northeast-2.amazonaws.com/18_RM.png",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const getPostFB = () => {
  return async function (dispatch, getState, { history }) {
    const post = await getDocs(user_collection);
    let post_list = [];
    post.forEach(doc => {
      let _post = doc.data();
      let p = Object.keys(_post).reduce(
        (acc, cur) => {
          if (cur.indexOf("user_") !== -1) {
            return {
              ...acc,
              user_info: { ...acc.user_info, [cur]: _post[cur] },
            };
          }
          return { ...acc, [cur]: _post[cur] };
        },
        { id: doc.id, user_info: {} }
      );
      post_list.push(p);
    });
    dispatch(setPost(post_list));
  };
};

const addPostFB = contents => {
  return async function (dispatch, getState, { history }) {
    const _user = getState().user.user;
    const _image = getState().image.preview;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.user_id,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    const storageRef = ref(
      storage,
      `images/${user_info.user_id}_${new Date().getTime()}`
    );
    uploadString(storageRef, _image, "data_url")
      .then(snapshot => {
        getDownloadURL(snapshot.ref).then(async url => {
          await addDoc(user_collection, {
            ...user_info,
            ..._post,
            image_url: url,
          })
            .then(doc => {
              dispatch(
                addPost({ user_info, ..._post, id: doc.id, image_url: url })
              );
              history.replace("/");
              dispatch(ImageActions.setPreview(null));
            })
            .catch(err => {
              console.log(err);
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const updatePostFB = (contents, pid) => {
  return async function (dispatch, getState, { history }) {
    const _image = getState().image.preview;

    const uid = getState().user.user.user_id;
    const docRef = doc(db, "post", pid);
    if (_image) {
      const storageRef = ref(storage, `images/${uid}_${new Date().getTime()}`);
      uploadString(storageRef, _image, "data_url").then(async snapshot => {
        getDownloadURL(snapshot.ref).then(async url => {
          await updateDoc(docRef, {
            contents: contents,
            image_url: url,
          }).then(() => {
            dispatch(updatePost(pid, { image_url: url, contents: contents }));
            history.replace("/");
            dispatch(ImageActions.setPreview(null));
          });
        });
      });
    } else {
      await updateDoc(docRef, {
        contents: contents,
      }).then(() => {
        dispatch(updatePost(pid, { contents: contents }));
        history.replace("/");
        dispatch(ImageActions.setPreview(null));
      });
    }
    // dispatch(updatePost(res));

    // const _post = {
    //   ...initialPost,
    //   contents: contents,
    //   insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    // };
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.unshift(action.payload.post);
      }),
    [UPDATE_POST]: (state, action) =>
      produce(state, draft => {
        const idx = draft.list.findIndex((v) => v.id === action.payload.pid);
        draft.list[idx] = {...draft.list[idx], ...action.payload.post};
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  updatePostFB,
};

export { actionCreators };
