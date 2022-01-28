import { storage } from "../firebaseconfig/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseconfig/firebase";
// Add a new document in collection "cities"

export const postBio = (uid: string, bio: string) => {
  const usersRef = doc(db, "users", uid);
  setDoc(usersRef, { bio: bio }, { merge: true });
};

export const uploadProfilePic = (uid: string, file) => {
  if (file) {
    const proPictureRef = ref(storage, `profilepic/${uid}`);
    uploadBytes(proPictureRef, file)
      .then((snapshot) => {
        return getDownloadURL(ref(storage, `profilepic/${uid}`));
      })
      .then((url) => {
        const userRef = doc(db, "users", uid);
        setDoc(userRef, { profilePic: url }, { merge: true });
      });
  } else {
    setDoc(doc(db, "users", uid), {profilePic: ""}, {merge: true})
  }
};

const uploadPostImage = (
  pid: string,
  smid: string,
  caption: string,
  username: string,
  profilePic: string,
  postType: string,
  file,
  close
) => {
  const postRef = ref(storage, `Posts/${smid}/${pid}`);
  uploadBytes(postRef, file)
    .then((snapShot) => {
      return getDownloadURL(ref(storage, `Posts/${smid}/${pid}`));
    })
    .then((url) => {
      return setDoc(doc(db, "Posts", pid), {
        postType: postType,
        post: caption,
        smid: smid,
        pid: pid,
        username: username,
        profilePic: profilePic,
        postImage: url,
        isPost: true,
      });
    })
    .then(() => {
      return setDoc(doc(db, "likes", pid), {
        count: 0,
      });
    })
    .then(() => {
      return setDoc(doc(db, "comments", pid), {});
    })
    .then(() => {
      console.log("posted!");
      close();
    });
};

export const sendPost = async (
  smid: string,
  caption: string,
  username: string,
  profilePic: string,
  file,
  close
) => {
  const pid = "post" + Math.floor(Math.random() * 1000000);

  if (file && !caption) {
    uploadPostImage(
      pid,
      smid,
      caption,
      username,
      profilePic,
      "image_only",
      file,
      close
    );
  } else if (file && caption) {
    uploadPostImage(
      pid,
      smid,
      caption,
      username,
      profilePic,
      "caption_and_post",
      file,
      close
    );
  } else if (!file && caption) {
    await setDoc(doc(db, "Posts", pid), {
      postType: "caption_only",
      post: caption,
      smid: smid,
      pid: pid,
      username: username,
      profilePic: profilePic,
      isPost: true,
    });

    await setDoc(doc(db, "likes", pid), {
      count: 0,
    });
    await setDoc(doc(db, "comments", pid), {});
    close();
    console.log("posted!");
  }
};
