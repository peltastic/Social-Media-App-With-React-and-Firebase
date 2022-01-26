import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { UserDataContext } from "../AuthContext/UserContextProvider";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig/firebase";

function Posts({ posts }) {
  // const [uid, smid, username, profilePic] = useContext(UserDataContext)

  useEffect(() => {}, []);

  return (
    <div className={` mx-auto  w-1/2 transition-all`}>
      {posts.map((item, index) => (
        <Post
          key={index}
          username={item.username}
          profilePic={item.profilePic}
          caption={item.post}
          postImage={item.postImage}
          postType={item.postType}
          smid={item.smid}
          pid={item.pid}
        />
      ))}
    </div>
  );
}

export default Posts;
