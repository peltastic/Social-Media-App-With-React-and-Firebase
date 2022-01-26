import { useState, useEffect } from "react";

import Posts from "./Posts";
import Sidebar from "./Sidebar";
import CreatePost from "./CreatePost";
import Backdrop from "./Backdrop";
import { db } from "../firebaseconfig/firebase";
import { useContext } from "react";
import { UserDataContext } from "../AuthContext/UserContextProvider";

import { collection, query, where, onSnapshot } from "firebase/firestore";

function Home() {
  const [uid, smid] = useContext(UserDataContext);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState<any>([]);

  const createPostHandler = () => {
    setShowCreatePost(!showCreatePost);
  };

  useEffect(() => {
    console.log(smid)

    const q = query(collection(db, "Posts"), where("isPost", "==", true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      console.log(posts);
      setPosts(posts);
      return posts;
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {showCreatePost ? (
        <>
          <CreatePost clicked={createPostHandler} />
          <Backdrop clicked={createPostHandler} color={"dark"}/>
        </>
      ) : null}
      <div className=" flex h-screen">
        <div className=" flex w-full">
          <Sidebar clicked={createPostHandler} smid={smid} />
          <Posts posts={posts} />
        </div>
      </div>
    </>
  );
}

export default Home;
