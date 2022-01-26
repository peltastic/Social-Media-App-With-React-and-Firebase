import classes from "../styles/inputstyle.module.css";
import { useState, useContext } from "react";
import { GrAdd } from "react-icons/gr";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { sendPost } from "../functions/uploads";
import { UserDataContext } from "../AuthContext/UserContextProvider";

function CreatePost({clicked}) {
  const [imageUploaded, setImageUploaded] = useState("");
  const [captionUpload, setCaptionUplaod] = useState("");
  const [uid, smid, username, profilePic] = useContext(UserDataContext);

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
      if (smid && username && profilePic) {
        sendPost(smid, captionUpload, username, profilePic, imageUploaded, clicked);
      }
      
    }
  };

  return (
    <div className="z-50 dead-center2 top-1/2 w-2/3 h-80 bg-orange-900 px-6 ">
      <h1 className="text-center mb-4 text-white">Create a Post</h1>
      <div className="flex items-center">
        <textarea
          className="w-2/3 h-60 mr-8 border-1 focus: border-4 outline-0  "
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
            <p className="mr-1">
              {imageUploaded ? "Uploaded" : "Upload Image File"}
            </p>
            {imageUploaded ? <AiOutlineCheck/> : <GrAdd className="text-white"/>}
          </span>
        </label>
      </div>
      <button
        className="w-16 absolute bottom-2 right-4  flex items-center justify-around text-white bg-black"
        onClick={sendPostHandler}
      >
        Send
        <IoMdSend className="text-white"/>
      </button>
    </div>
  );
}

export default CreatePost;
