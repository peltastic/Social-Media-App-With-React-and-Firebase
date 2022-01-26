import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";

import { FaUser, FaComment, FaDove } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig/firebase";
import { likePost, unlikePost } from "../functions/updates";
import { deletePost } from "../functions/delete";
import { UserDataContext } from "../AuthContext/UserContextProvider";

import Comments from "./Comments";
import Backdrop from "./Backdrop";


function Post({
  username,
  profilePic,
  postImage,
  caption,
  postType,
  smid,
  pid,
  isUser,
}) {
  const [uid, userSmid] = useContext(UserDataContext);

  const router = useRouter();
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [postIsliked, setPostIsliked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (pid) {
      fetchLikesCount(pid);
      fetchCommentsCount(pid);
    }

    return () => {
      return;
    };
  }, [pid, userSmid]);

  const fetchLikesCount = (pid: string) => {
    const unsub = onSnapshot(doc(db, "likes", pid), (doc) => {
      const likedData = [];
      if (doc.data()) {
        setLikesCount(doc.data().count);
      }
      for (const key in doc.data()) {
        likedData.push(doc.data()[key]);
      }
      const postIslikedData = likedData.filter((el) => el === userSmid);
      if (postIslikedData.length === 1) {
        setPostIsliked(true);
      } else {
        setPostIsliked(false);
      }
    });
  };

  const fetchCommentsCount = (pid: string) => {
    const unsub = onSnapshot(doc(db, "comments", pid), (doc) => {
      let commentsCount = 0;
      for (const key in doc.data()) {
        commentsCount++;
      }
      setCommentsCount(commentsCount);
    });
  };

  const toggleShowComments = () => {
    setShowComment(!showComment);
  };

  const likePostHandler = () => {
    if (postIsliked) {
      unlikePost(userSmid, likesCount, pid);
    } else {
      likePost(userSmid, likesCount, pid);
    }
  };

  const deletePostHanlder  = () => {
    if (pid) {
      deletePost(pid)
    }
  }

  return (
    <>
      {showComment ? (
        <>
          <Comments pid={pid} />
          <Backdrop clicked={toggleShowComments} color={"light"}/>
        </>
      ) : null}
      <div className="w-full border my-4 relative text-white">
        {isUser ? (
          <button
            className={`absolute right-10 top-2 text-sm cursor-pointer bg-white text-red-600 py-1 px-1 ${
              showDelete ? "block" : "hidden"
            }`}
            onClick={deletePostHanlder}
          >
            Delete
          </button>
        ) : null}
        {isUser ? (
          <BsThreeDotsVertical className="absolute right-2 top-4 cursor-pointer" onClick={() => setShowDelete(!showDelete)} />
        ) : null}
        <div className=" flex items-center my-2 mx-2">
          <div
            className="border h-8 w-8 rounded-full relative mr-2"
            onClick={() => router.push(`/profile/${smid}`)}
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt=""
                className="h-8 w-8 rounded-full cursor-pointer"
              />
            ) : (
              <FaUser className="top-1/2 dead-center cursor-pointer" />
            )}
          </div>
          <p className="text-sm font-bold cursor-pointer">{username}</p>
        </div>
        <div className="w-full">
          {postType === "image_only" || postType === "caption_and_post" ? (
            <img src={postImage} className="w-full" />
          ) : null}
          {postType === "caption_only" || postType === "caption_and_post" ? (
            <p className="mx-2">{caption}</p>
          ) : null}
        </div>
        <div className=" flex items-center mx-2 my-2">
          <div className="flex items-center">
            {postIsliked ? (
              <FcLike
                className="text-3xl text-green-500 cursor-pointer mr-1"
                onClick={likePostHandler}
              />
            ) : (
              <FcLikePlaceholder
                className="text-3xl text-green-500 cursor-pointer mr-1"
                onClick={likePostHandler}
              />
            )}
            <p className="mr-4 text-sm text-gray-400">{likesCount}</p>
          </div>

          <FaComment
            className="text-2xl cursor-pointer"
            onClick={toggleShowComments}
          />
          <p className="ml-2 text-sm text-gray-400">{commentsCount}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
