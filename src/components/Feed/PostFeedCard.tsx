import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import PostFeedModal from "./PostFeedModal";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const PostFeedCard = () => {
	const { removeItem } = useLocalStorage();
	const { user, setUserData } = useContext(AuthContext);
	const [openPostFeed, setOpenPostFeed] = useState<string | undefined>();
	const modalProps = { openPostFeed, setOpenPostFeed };

	const postFeed = (form: FormData) => {
		fetch(`http://${process.env.REACT_APP_FEED_URL}/`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: form
		}).then(async res => {
			const isJson = res.headers.get('content-type')?.includes('application/json');
			const data = isJson && await res.json();
			
			if (!res.ok) {
				const error = (data && data.error) || res.status;
				throw new Error(error);
			}

			console.log(data);
		}).catch(err => {
			console.error(err.message);
				const error = JSON.parse(err.message);
				if (error.code === 403 || error.code === 401) {
					removeItem('currentUser');
					setUserData(undefined);
				}
		});
	}
	
	return (
		<>
			<PostFeedModal onPost={postFeed} open={openPostFeed || ""} setOpen={setOpenPostFeed} />
			<div className="flex gap-2 items-center p-[15px] mb-3 bg-mainBlue rounded-lg">
				<img
					className="rounded-full w-[60px] border border-lightGray" 
					src={`http://${process.env.REACT_APP_FILE_URL}/${user?.profile_picture}`} 
					alt="profile" 
				/>
				<div 
					className="flex items-center w-full px-[15px] h-[38px] border rounded-full border-lightGray content-center text-lightGray font-semibold hover:cursor-pointer hover:bg-mainBlueDark"
					onClick={() => modalProps.setOpenPostFeed("post-feed-modal")}
				>
					What's on your mind
				</div>
			</div>
		</>
	)
}

export default PostFeedCard;