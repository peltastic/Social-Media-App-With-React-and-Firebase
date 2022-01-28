import { FaUser } from "react-icons/fa";
import Link from "next/link";
import classes from "../styles/comments.module.css"

function Comment({ username, profilepic, comment, smid }) {
  return (
    <div className={` w-full px-2 py-2 relative mb-6 text-white ${classes.comments_background}`}>
      <Link href={`profile/${smid}`}>
        <a>
          {profilepic ? (
            <img
              src={profilepic}
              alt=""
              className="h-8 w-8 rounded-full absolute top-2 left-2 cursor-pointer"
            />
          ) : (
            <FaUser className="h-8 w-8 absolute top-2 left-2" />
          )}

          <p className=" ml-12 text-sm">{username}</p>
        </a>
      </Link>
      <p className=" ml-12">{comment}</p>
    </div>
  );
}

export default Comment;
