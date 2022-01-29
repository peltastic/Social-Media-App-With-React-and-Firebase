import classes from "../styles/inputstyle.module.css";
import styles from "../styles/createpost.module.css";

import { useState, useContext } from "react";
import { GrAdd } from "react-icons/gr";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { sendPost } from "../functions/uploads";
import { UserDataContext } from "../AuthContext/UserContextProvider";
import Spinner from "./Spinner";

function CreatePost({ clicked }) {
  const [imageUploaded, setImageUploaded] = useState("");
  const [captionUpload, setCaptionUplaod] = useState("");
  const [uid, smid, username, profilePic] = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);

  const imageUploadhander = (e) => {
    const file = e.target.files[0];
    setImageUploaded(file);
  };
  const captionUploadhander = (e) => {
    const caption = e.target.value;
    setCaptionUplaod(caption);
  };

  const sendPostHandler = () => {
    if (captionUpload || imageUploaded) {
      setLoading(true)
      if (smid && username) {
        sendPost(
          smid,
          captionUpload,
          username,
          profilePic,
          imageUploaded,
          clicked
        );
      }
    }
  };

  return (
    <>
      <div
        className={`z-50 dead-center2 top-1/2 w-2/3 h-80 color_main rounded-md px-6 ${styles.createpost}`}
      >
      { loading ?<div className=" fixed -bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>: null}
        <h1 className="text-center mb-4 mt-2 text-white">Create a Post</h1>
        <div className="flex flex-wrap items-center">
          <textarea
            className={`w-2/3 h-60 mr-8 border-1 focus: border-4 outline-0 ${styles.caption_input}`}
            onChange={captionUploadhander}
          ></textarea>
          <label className={classes.label}>
            <input
              type="file"
              name="Upload Profile Picture"
              onChange={imageUploadhander}
            />
            <span
              className={`flex items-center text-xs font-thin
            ${imageUploaded ? "text-green-500" : null}
            `}
            >
              <p className="mr-1 text-black font-bold">
                {imageUploaded ? "Uploaded" : "Upload Image "}
              </p>
              {imageUploaded ? (
                <AiOutlineCheck />
              ) : (
                <GrAdd className="text-white" />
              )}
            </span>
          </label>
        </div>
        <button
          className="px-4 py-2 rounded-2xl absolute bottom-2 right-4 mb-2 flex items-center justify-around text-white bg-black"
          onClick={sendPostHandler}
        >
          Send
          <IoMdSend className="text-white" />
        </button>
      </div>
    </>
  );
}

export default CreatePost;
