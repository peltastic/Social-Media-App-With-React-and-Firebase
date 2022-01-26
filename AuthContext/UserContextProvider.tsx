import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebaseconfig/firebase";

export const UserDataContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        getUserData(uid);
        console.log("in");

        // ...
      } else {
        // User is signed out
        // ...
        console.log("out");
        router.push("/signup");
      }
    });
  }, []);
  function getUserData(uid) {
    // const docRef = doc(db, "users", uid);
    // const docSnap = await getDoc(docRef);
    const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
      console.log(
        uid,
        doc.data().smid,
        doc.data().username,
        doc.data().profilePic,
        doc.data().bio
      );

      setUserData([
        uid,
        doc.data().smid,
        doc.data().username,
        doc.data().profilePic,
        doc.data().bio,
      ]);
    });
  }

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};
