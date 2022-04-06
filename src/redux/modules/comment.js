import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db, rtdb } from "../../shared/firebase";
import "moment";
import moment from "moment";
import {
  query,
  collection,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";

import { actionCreators as postActions } from "./post";
import { push, ref, update } from "firebase/database";

const _collection = collection(db, "comment");

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, post_id => ({ post_id }));

const loading = createAction(LOADING, is_loading => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const getCommentFB = (post_id = null) => {
  return async function (dispatch, getState, { history }) {
    if (!post_id) return;
    const q = query(
      _collection,
      where("post_id", "==", post_id),
      orderBy("insert_dt", "desc")
    );
    const data = await getDocs(q);
    let list = [];
    data.forEach(v => {
      list.push({ ...v.data(), id: v.id });
    });
    dispatch(setComment(post_id, list));
  };
};

const addCommentFB = (post_id, contents) => {
  return async function (dispatch, getState, { history }) {
    const user_info = getState().user.user;

    let comment = {
      post_id: post_id,
      user_id: user_info.user_id,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    await addDoc(_collection, comment).then(async v => {
      const post = getState().post.list.find(l => l.id === post_id);
      comment = { ...comment, id: v.id };
      await updateDoc(doc(db, "post", post_id), {
        comment_cnt: increment(1),
      }).then(async _post => {
        dispatch(addComment(post_id, comment));
        dispatch(
          postActions.updatePost(post_id, {
            comment_cnt: parseInt(post.comment_cnt) + 1,
          })
        );

        const noti_item = ref(rtdb, `noti/${post.user_info.user_id}/list`);
        await push(noti_item, {
          post_id: post_id,
          user_name: comment.user_name,
          image_url: post.image_url,
          insert_dt: comment.insert_dt,
        }).then(res => {
          const notiDB = ref(rtdb, `noti/${post.user_info.user_id}`);
          update(notiDB, { read: false });
        });
      });
    });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, draft => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, draft => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, draft => {
        delete draft.list[action.payload.post_id];
      }),
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  addCommentFB,
  setComment,
  addComment,
  deleteComment,
};

export { actionCreators };
