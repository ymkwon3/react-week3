import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));


const initialState = {
  image_url: '',
  uploading: false,
  preview: null,
}

export default handleActions({
  [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
    draft.image_url = action.payload.image_url;
    draft.uploading = false;
  }),
  [UPLOADING]: (state, action) => produce(state, (draft) => {
    draft.uploading = action.payload.uploading;
  }),
  [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
    draft.preview = action.payload.preview;
  }),
}, initialState);

const actionCreators = {
  uploadImage,
  setPreview,
}

export {actionCreators};