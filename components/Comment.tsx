function Comment( {username, profilepic, comment}) {
    return (
        <div className="border w-full px-2 py-2 relative mb-2 text-white">
            <img src={profilepic} alt="" className="h-8 w-8 rounded-full absolute top-2 left-2" /> 

            <p className=" ml-12 text-sm">{username}</p>
            <p className=" ml-12">{comment}</p>
        </div>
    )
}

export default Comment
