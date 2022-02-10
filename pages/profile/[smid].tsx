import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../AuthContext/UserContextProvider";
import Post from "../../components/Post";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
} from "firebase/firestore";
import classes from "../../styles/profile.module.css"
import { db } from "../../firebaseconfig/firebase";
import { useRouter } from "next/router";
import Backdrop from "../../components/Backdrop";
import { FaUser } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import CreatePost from "../../components/CreatePost";
import { updateFollowing, updateUnfollowing } from "../../functions/updates";

function UserProfile() {
  const router = useRouter();
  const { smid } = router.query;

  const [uid, userSmid] = useContext(UserDataContext);
  const [userPost, setUserPost] = useState([]);
  const [username, setUsername] = useState("");
  const [userbio, setUserbio] = useState("");
  const [userPic, setUserPic] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (smid && userSmid) {
      checkIsFollowing(smid);
      fetchUserProile(smid);
      followingCountHanlder(smid);
      const q = query(collection(db, "Posts"), where("smid", "==", smid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
        setUserPost(posts);
      });
    }
    if (smid === userSmid) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }

    return () => {
      return;
    };
  }, [smid, userSmid]);

  const checkIsFollowing = (smid) => {
    const unsub = onSnapshot(doc(db, "followers", smid), (doc) => {
      const followersData = [];
      for (const key in doc.data()) {
        followersData.push(doc.data()[key]);
      }
      setFollowersCount(followersData.length);
      const isFollowingData = followersData.filter((el) => el === userSmid);
      if (isFollowingData.length > 0) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    });
  };

  const followingCountHanlder = (smid) => {
    const unsub = onSnapshot(doc(db, "following", smid), (doc) => {
      const followingData = [];
      for (const key in doc.data()) {
        followingData.push(doc.data()[key]);
      }
      setFollowingCount(followingData.length);
    });
  };

  const fetchUserProile = async (smid) => {
    const userRef = collection(db, "users");

    const q = query(userRef, where("smid", "==", smid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUsername(doc.data().username);
      setUserPic(doc.data().profilePic);
      setUserbio(doc.data().bio);
    });
  };

  const followHandler = () => {
    if (smid && userSmid) {
      if (isFollowing) {
        updateUnfollowing(userSmid, smid);
      } else {
        updateFollowing(userSmid, smid);
      }
    }
  };

  const createPostHandler = () => {
    setShowCreatePost(!showCreatePost);
  };

  let userPostContent:any = <p className="m-auto text-center">No Posts Yet</p>

  if (userPost.length > 0) {
    userPostContent = <>
    {userPost.map((item, index) => (
            <Post
              key={index}
              username={item.username}
              profilePic={item.profilePic}
              caption={item.post}
              postImage={item.postImage}
              postType={item.postType}
              smid={item.smid}
              pid={item.pid}
              isUser={isUser}
            />
          ))}
    </>
  }


  return (
    <>
      {showCreatePost ? (
        <>
          <CreatePost clicked={createPostHandler} />
          <Backdrop clicked={createPostHandler} color={"dark"} />
        </>
      ) : null}
      <Sidebar clicked={createPostHandler} smid={userSmid} />
      <div className={`mx-auto  w-1/2 text-white  relative  py-4 ${classes.profile}`}>
        {userPic ? (
          <img
            className="rounded-full h-20 w-20 mx-auto"
            src={userPic}
            alt=""
          />
        ) : (
          <FaUser className="rounded-full text-4xl mx-auto" />
        )}
        {username ? (
          <p className="font-bold text-center">{"@" + username}</p>
        ) : (
          <>
            <div className="bg-gray-300 mx-auto animate-pulse w-32 h-4 my-2"></div>
            <div className="bg-gray-300 mx-auto animate-pulse w-44 h-4 my-2"></div>
          </>
        )}

        <p className="text-center text-sm my-2"> {userbio} </p>

        <div className="flex justify-center items-center mx-auto">
          <p className="">followers</p>
          <p className="ml-1 mr-2 text-white">{followersCount}</p>
          <p className="">following</p>
          <p className=" ml-1 mr-2 text-white">{followingCount}</p>
        </div>

        {userSmid === smid ? null : (
          <button
            className="block my-4 mx-auto border rounded-xl px-3 py-1"
            onClick={followHandler}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}

        <div className="w-full border mt-8 mb-10"></div>
        <div className=" px-8 w-full  ">
          {userPostContent}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
