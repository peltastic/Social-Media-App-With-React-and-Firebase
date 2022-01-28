import { FaUser } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import classes from "../styles/inputstyle.module.css";
import styles from "../styles/upload.module.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../AuthContext/UserContextProvider";
import { AiOutlineCheck } from "react-icons/ai";
import { uploadProfilePic, postBio } from "../functions/uploads";

function Upload() {
  const [uid, smid] = useContext(UserDataContext);
  const [profilePicFile, setProfilePicFile] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();
  const nextHandler = () => {
    if (uid) {
      uploadProfilePic(uid, profilePicFile);
      postBio(uid, bio);
      router.push("/");
    }
  };

  useEffect(() => {}, []);

  const profilePicUpload = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
    postBio(uid, bio);
  };

  const uploadBio = (e) => {
    const bio = e.target.value;
    setBio(bio);
  };
  return (
    <>
      <div
        className={`color_main py-2   dead-center2 top-1/2 items-center flex flex-wrap w-1/2 ${styles.upload_container}`}
      >
        <div className=" flex mx-auto items-center">
          <div className={` border mr-4 rounded-full w-32 h-32 relative ${styles.profile_container}`}>
            <FaUser
              className={`text-7xl dead-center top-1/2 ${styles.text_profile}`}
            />
          </div>
          <div className="">
            <label className={classes.label}>
              <input
                type="file"
                name="Upload Profile Picture"
                onChange={profilePicUpload}
              />
              <span
                className={`flex items-center text-xs font-thin ${
                  profilePicFile ? "text-green-500" : null
                }`}
              >
                <p
                  className={`mr-1 text-black font-bold ${styles.text_upload}`}
                >
                  {profilePicFile ? "Uploaded" : "Profile Picture"}
                </p>
                {profilePicFile ? <AiOutlineCheck /> : <GrAdd />}
              </span>
            </label>
          </div>
        </div>

        <textarea
          className="w-4/6 border my-10 mx-auto h-40 focus: outline-neutral-500 transition-all text-center"
          placeholder="Bio Here"
          onChange={uploadBio}
        ></textarea>
        <div className="flex mx-auto">
          <button
            className="mx-6 text-center my-4 py-1 px-6  rounded-md bg-black text-white"
            onClick={nextHandler}
          >
            NEXT
          </button>

          <button
            className="mx-6 text-center my-4 py-1 px-6 rounded-md bg-black text-white"
            onClick={nextHandler}
          >
            SKIP
          </button>
        </div>
      </div>
    </>
  );
}

export default Upload;
