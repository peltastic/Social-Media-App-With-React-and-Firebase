import { useState, useContext, useEffect } from "react";
import { addComment } from "../functions/updates";
import { IoMdSend } from "react-icons/io";
import { UserDataContext } from "../AuthContext/UserContextProvider";

import Comment from "./Comment";
import styles from "../styles/comments.module.css"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig/firebase";

function Comments({ pid, show}) {
  const [uid, userSmid, username, profilePic] = useContext(UserDataContext);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "comments", pid), (doc) => {
      if (doc.data()) {
        const commentData = [];
        for (const key in doc.data()) {
          commentData.push(doc.data()[key]);
        }
        console.log(commentData);
        setPostComments(commentData);
      }
    });

    return () => unsub()
  }, []);

  const addCommentHandler = (e) => {
    e.preventDefault()
    if (comment && userSmid) {
      addComment(comment, pid, username, profilePic, userSmid);
      setComment("")
    }
  };

  let Comments = <p className="text-gray-400 ">No Comments</p>;
  if (postComments.length > 0) {
    Comments = (
      <>
        {postComments.map((item, index) => (
          <Comment
            key={index}
            username={item.username}
            profilepic={item.profilepic}
            comment={item.comment}
            smid={item.smid}
          />
        ))}
      </>
    );
  }

  return (
    <div className={` w-1/3 overflow-scroll h-screen z-50 color_main fixed top-0 right-0 px-2 py-3 pt-12 transition-all ${show==="show" ? styles.show : styles.hide} ${styles.comments}`} >
      {Comments}
      <div className={` ${styles.input} color_main`}>
        <form onSubmit={addCommentHandler}>
          <input
            type="text"
            placeholder="Add comment"
            className=" w-full border-b border-white bg-transparent text-white focus: outline-none"
            value={comment}
            onChange={(e) => {
              const comment = e.target.value;
              setComment(comment);
            }}
          />
          <IoMdSend
            className="absolute right-4 bottom-1 text-lg cursor-pointer"
            onClick={addCommentHandler}
          />
        </form>
      </div>
    </div>
  );
}

export default Comments;
