import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "../styles/signup.module.css";
import Spinner from "../components/Spinner";
import { BiShow } from "react-icons/bi";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebaseconfig/firebase";
import { auth } from "../firebaseconfig/firebase";
import { doc, setDoc } from "firebase/firestore";

function Signup({ isLogin }) {
  const router = useRouter();
  const [focused, setFocused] = useState("none");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [credentialErr, setCredentialErr] = useState(false);

  const signUpHandler = (email: string, password: string, username: string) => {
    setLoading(true);
    if (isLogin) {
      if (email && password) {
        signUserIn(email, password);
      }
    } else {
      if (email && password && username) {
        signUserUp(email, password, username);
      }
    }
    if (isLogin) {
      if (!email || !password) {
        setCredentialErr(true);
      }
    } else {
      if (!email || !password || !username) {
        setCredentialErr(true);
      }
    }
  };

  async function createUserData(
    uid: string,
    username: string,
    smid: string,
    email: string
  ) {
    await setDoc(doc(db, "users", uid), {
      username: username,
      smid: smid,
      email: email,
      uid: uid,
    });

    await setDoc(doc(db, "followers", smid), {});
    await setDoc(doc(db, "following", smid), {});
  }

  function signUserUp(email: string, password: string, username: string) {
    setIsErr(false);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const smid = "smid" + Math.floor(Math.random() * 100000);
        const user = userCredential.user;
        createUserData(user.uid, username, smid, email);
        router.push("/upload");
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setIsErr(true);
        setErrMessage(errorMessage);
        console.log(errMessage);

        // ..
      });
  }

  function signUserIn(email: string, password: string) {
    setIsErr(false);
    let message;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        router.push("/");
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        message = errorMessage;
        setIsErr(true);
        setErrMessage(errorMessage);
      });

    return message;
  }

  return (
    <>
      <div
        className={`mx-auto py-2 dead-center top-1/2 rounded-sm  w-1/2 ${classes.signup_background}`}
      >
        {loading && !isErr ? (
          <div className=" dead-center -bottom-4">
            <Spinner />
          </div>
        ) : null}
        <form
          className=""
          onSubmit={() =>
            signUpHandler(
              credentials.email,
              credentials.password,
              credentials.username
            )
          }
        >
          <div
            className={`center-signup relative my-8 flex-wrap ${classes.signup_input_container}`}
          >
            <label
              className={` absolute  ${
                focused === "email"
                  ? "-top-[20px] translate-x-2 text-sm text-white"
                  : "top-1/2 left-0 translate-x-2 -translate-y-1/2"
              }   transition-all`}
            >
              EMAIL
            </label>
            <input
              className="border-input w-full rounded-3xl py-1 px-4 pl-20"
              type="email"
              name=""
              onChange={(e) => {
                setCredentials({
                  ...credentials,
                  email: e.target.value,
                });
              }}
              onFocus={() => setFocused("email")}
              required
            />
          </div>
          <div
            className={` center-signup relative my-8 flex-wrap ${classes.signup_input_container}`}
          >
            <label
              className={`absolute   ${
                focused === "password"
                  ? "-top-[20px] text-sm translate-x-2  text-white"
                  : "top-1/2 translate-x-2 -translate-y-1/2"
              }  transition-all`}
            >
              PASSWORD
            </label>
            <input
              className="border-input w-full rounded-3xl py-1 px-4 pl-24"
              type={showPassword ? "text" : "password"}
              name=""
              onChange={(e) => {
                setCredentials({
                  ...credentials,
                  password: e.target.value,
                });
              }}
              onFocus={() => setFocused("password")}
              required
            />
            <BiShow
              className=" cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {isLogin && credentialErr ? (
            <p className="text-red-600 text-center">Enter Empty Fields!</p>
          ) : null}
          {isLogin ? null : (
            <>
              <div
                className={` center-signup relative my-8 flex-wrap ${classes.signup_input_container}`}
              >
                <label
                  className={`absolute  ${
                    focused === "username"
                      ? "-top-[20px] text-sm translate-x-2 text-white"
                      : "top-1/2 left-0 translate-x-2 -translate-y-1/2"
                  }  transition-all`}
                >
                  USERNAME
                </label>
                <input
                  className="border-input w-full rounded-3xl py-1 px-4 pl-24"
                  type="text"
                  name=""
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      username: e.target.value,
                    });
                  }}
                  onFocus={() => setFocused("username")}
                  required
                />
              </div>
              {credentialErr ? (
                <p className="text-red-600 text-center">Enter Empty Fields!</p>
              ) : null}
            </>
          )}
          {isErr ? <>{errMessage ? <p className="text-red-600 text-center">{errMessage}</p> : ""}</> : null}
        </form>
        {!isLogin ? (
          <div className=" mx-auto mt-4 items-center flex flex-col">
            <button
              className="mx-6 text-center my-4 py-1  px-16 rounded-md bg-black text-white"
              onClick={() => {
                signUpHandler(
                  credentials.email,
                  credentials.password,
                  credentials.username
                );
              }}
            >
              SIGN UP
            </button>

            <div className="mx-6 mb-6 items-center flex-col flex">
              <p className="text-xs mb-1 text-white">
                Have an account already?
              </p>
              <Link href={"/login"}>
                <a className=" mx-6 py-1 text-center px-16 rounded-md bg-black text-white">
                  LOG IN
                </a>
              </Link>
            </div>
          </div>
        ) : null}
        {isLogin ? (
          <button
            className="text-center block mx-auto my-8 py-1 rounded-md w-52 bg-black text-white"
            onClick={() => {
              signUpHandler(
                credentials.email,
                credentials.password,
                credentials.username
              );
            }}
          >
            NEXT
          </button>
        ) : null}
      </div>
    </>
  );
}

export default Signup;
