import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const PostFeedCard = () => {
	const { user } = useContext(AuthContext);
	
	return (
		<div className="flex gap-2 items-center p-[15px] mb-3 bg-mainBlue rounded-lg">
			<img className="rounded-full w-[60px]" src={`http://${process.env.REACT_APP_SERVER_URL}/files/${user?.profile_picture}`} alt="profile" />
			<div className="flex items-center w-full px-[15px] h-[38px] border rounded-full border-lightGray content-center text-lightGray font-semibold hover:cursor-pointer hover:bg-mainBlueDark">
			What's on your mind
			</div>
		</div>
	)
}

export default PostFeedCard;