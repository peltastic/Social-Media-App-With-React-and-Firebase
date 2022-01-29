import { doc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebaseconfig/firebase";

export async function likePost(
  userSmid: string,
  likesCount: number,
  pid: string
) {
  await setDoc(
    doc(db, "likes", pid),
    {
      [userSmid]: userSmid,
    },
    { merge: true }
  );
  const likesRef = doc(db, "likes", pid);
  await updateDoc(likesRef, {
    count: likesCount + 1,
  });
}
export async function unlikePost(
  userSmid: string,
  likesCount: number,
  pid: string
) {
  const likesRef = doc(db, "likes", pid);
  await updateDoc(likesRef, {
    count: likesCount - 1,
  });
  await updateDoc(likesRef, {
    [userSmid]: deleteField(),
  });
}

export async function addComment(
  comment: string,
  pid: string,
  username: string,
  profilepic: string,
  userSmid: string
) {
  const commentId = "comment" + Math.floor(Math.random() * 1000000);
  await setDoc(
    doc(db, "comments", pid),
    {
      [commentId]: {
        comment: comment,
        username: username,
        profilepic: profilepic,
        smid: userSmid
      },
    },
    { merge: true }
  );
}


export async function updateFollowing (userSmid: string, followedUserSmid: any) {
  await setDoc(doc(db, "following", userSmid), {
    [followedUserSmid]: followedUserSmid
  })
  await setDoc(doc (db, "followers", followedUserSmid), {
    [userSmid]: userSmid
  })
}

export async function updateUnfollowing (userSmid: string, followedUserSmid: any) {
  await updateDoc(doc(db, "following", userSmid), {
    [followedUserSmid]: deleteField()
  })
  await updateDoc(doc(db, "followers", followedUserSmid), {
    [userSmid]: deleteField()
  })
}