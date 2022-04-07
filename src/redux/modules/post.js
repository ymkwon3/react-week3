import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db, storage } from "../../shared/firebase";
import {
  getDoc,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAt,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { actionCreators as ImageActions } from "./image";
import { actionCreators as CommentActions } from "./comment";
import moment from "moment";

const user_collection = collection(db, "post");

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const LOADING = "LOADING";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, post => ({ post }));
const updatePost = createAction(UPDATE_POST, (pid, post) => ({ pid, post }));
const loading = createAction(LOADING, is_loading => ({ is_loading }));
const deletePost = createAction(DELETE_POST, pid => ({ pid }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
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
  insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
};

const getPostFB = (start = null, size = 3) => {
  return async function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) return;
    dispatch(loading(true));
    // 최근 작성일이 먼저 나오게
    const q = start
      ? query(
          user_collection,
          orderBy("insert_dt", "desc"),
          startAt(start),
          limit(size + 1)
        )
      : query(user_collection, orderBy("insert_dt", "desc"), limit(size + 1));
    const post = await getDocs(q);
    let post_list = [];
    let paging = {
      start: post.docs[0],
      next:
        post.docs.length === size + 1 ? post.docs[post.docs.length - 1] : null,
      size: size,
    };
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
    if (post_list.length === size + 1) post_list.pop();
    dispatch(setPost(post_list, paging));
  };
};

const getOnePostFB = pid => {
  return async function (dispatch, getState, { history }) {
    const getPost = await getDoc(doc(db, "post", pid));
    const postDB = getPost.data();
    let p = Object.keys(postDB).reduce(
      (acc, cur) => {
        if (cur.indexOf("user_") !== -1) {
          return {
            ...acc,
            user_info: { ...acc.user_info, [cur]: postDB[cur] },
          };
        }
        return { ...acc, [cur]: postDB[cur] };
      },
      { id: pid, user_info: {} }
    );
    dispatch(setPost([p]));
  };
};

const addPostFB = (contents, radioState) => {
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
      radioState: radioState,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
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

const updatePostFB = (contents, pid, radioState) => {
  return async function (dispatch, getState, { history }) {
    const _image = getState().image.preview;

    const uid = getState().user.user.user_id;
    const docRef = doc(db, "post", pid);

    // redux preview가 있을 때는 수정 시 이미지도 변경한 것
    if (_image) {
      const storageRef = ref(storage, `images/${uid}_${new Date().getTime()}`);
      uploadString(storageRef, _image, "data_url").then(async snapshot => {
        getDownloadURL(snapshot.ref).then(async url => {
          await updateDoc(docRef, {
            contents: contents,
            radioState: radioState,
            image_url: url,
          }).then(() => {
            dispatch(updatePost(pid, { image_url: url, contents,  radioState}));
            history.replace("/");
            dispatch(ImageActions.setPreview(null));
          });
        });
      });
    } 
    // redux preview가 없을 때는 내용만 변경
    else {
      await updateDoc(docRef, {
        contents: contents,
        radioState: radioState,
      }).then(() => {
        dispatch(updatePost(pid, { contents, radioState }));
        history.replace("/");
        dispatch(ImageActions.setPreview(null));
      });
    }
  };
};

const deletePostFB = pid => {
  return async function (dispatch, getState, { history }) {
    await deleteDoc(doc(db, "post", pid)).then(async res => {
      const q = query(collection(db, "comment"), where("post_id", "==", pid));

      //게시물 삭제 시, 해당 게시글에 있는 댓글을 redux와 firestore에서 제거
      await getDocs(q).then((docs) => {
        docs.forEach(async (d) => {
          await deleteDoc(doc(db, "comment", d.id));
        })
      })
      dispatch(CommentActions.deleteComment(pid));

      dispatch(deletePost(pid));
      history.replace("/");
    });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.push(...action.payload.post_list);
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex(a => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            return acc;
          }
        }, []);
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.unshift(action.payload.post);
      }),
    [UPDATE_POST]: (state, action) =>
      produce(state, draft => {
        const idx = draft.list.findIndex(v => v.id === action.payload.pid);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, draft => {
        draft.list = draft.list.filter((v, i) => v.id !== action.payload.pid);
      }),
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  updatePost,
  getPostFB,
  addPostFB,
  updatePostFB,
  getOnePostFB,
  deletePostFB,
};

export { actionCreators };
