function Backdrop({clicked, color}) {
    return (
        <div className={`fixed w-full h-screen top-0 left-0 bg-black ${color==="dark" ?"opacity-90": "opacity-50"}  z-40` }onClick={clicked}>
            
        </div>
    )
}

export default Backdrop
