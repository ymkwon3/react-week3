import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";


const Upload = (props) => {
  const dispatch = useDispatch();
  const fileRef = React.useRef();


  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    }
  }
  return (
    <>
      <input ref={fileRef} onChange={selectFile} type="file"></input>
    </>
  );
};

export default Upload;
