import { useEffect } from "react";
import Post from "./Post";
import classes from "../styles/posts.module.css";

function Posts({ posts }) {
  // const [uid, smid, username, profilePic] = useContext(UserDataContext)

  useEffect(() => {}, []);

  return (
    <div
      className={` mx-auto mt-8 w-1/2 transition-all ${classes.posts_background}`}
    >
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
          isUser={false}
        />
      ))}
    </div>
  );
}

export default Posts;
