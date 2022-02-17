import {auth} from "../firebaseconfig/firebase"
import { signOut } from "firebase/auth";

export const signOutUser = () => {
  signOut(auth);
};

