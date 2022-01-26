import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseconfig/firebase";

export async function deletePost(pid: string) {
    await deleteDoc(doc(db, "Posts", pid))
    await deleteDoc(doc(db, "comments", pid))
    await deleteDoc(doc(db, "likes", pid))
}