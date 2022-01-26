import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import {db} from "../firebaseconfig/firebase"
import {auth} from "../firebaseconfig/firebase"
import {doc, setDoc} from "firebase/firestore"
import { signOut } from "firebase/auth";

export const signOutUser = () => {
  signOut(auth);
};

 async function createUserData (uid: string, username: string, smid: string, email: string) {
  await setDoc(doc(db, "users", uid), {
    username: username,
    smid: smid,
    email: email, 
    uid: uid, 
  })

  await setDoc(doc(db, 'followers', smid), {
  })
  await setDoc(doc(db, 'following', smid), {
  })
}

export function signUserUp(email: string, password: string, username:string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const smid = "smid" + Math.floor( Math.random() * 100000)
      const user = userCredential.user;
      createUserData(user.uid, username, smid, email)
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      // ..
    });
}

export function signUserIn(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
}
