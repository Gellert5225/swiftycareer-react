import { useEffect, useState, useContext } from "react";

import { Comment } from "../../data/Comment";
import CommentBox from "./CommentBox";
import { AuthContext } from "../../context/AuthContext";

import ReactQuill from 'react-quill';

const CommentSection = ({ feedId } : { feedId: string }) => {
	const [commentList, setCommentList] = useState<Array<Comment>>([]);
	const { user } = useContext(AuthContext);

	const postComment = (commentText : string) => {
		console.log("Comment Text is " + commentText);
		fetch(`http://${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_FEED_BASE_URL}/${feedId}/comments`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify({ text: commentText, commenter: user?.id }),
			headers: {          
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(async res => {
			const isJson = res.headers.get('content-type')?.includes('application/json');
			const data = isJson && await res.json();
			
			if (!res.ok) {
				const error = (data && data.error) || res.status;
				return Promise.reject(error);
			}

			console.log(data);
			let commentListCopy = [...commentList];
			commentListCopy.push(new Comment(data.info._id, data.info.text, data.info.feed_id, data.info.author_id, data.info.like_count, data.info.author));
			setCommentList(commentListCopy);
		}).catch(error => {
			console.error('There was an error!', error);
		});
	}

	useEffect(() => {
		if (user) {
			fetch(`http://${process.env.REACT_APP_SERVER_URL}/feeds/${feedId}/comments`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then(async res => {
				const data = await res.json();

				console.log(data);

				if (!res.ok) {
					console.log(res);
					const error = data || res;
					return Promise.reject(error);
				}
				
				setCommentList(data.info);

				console.log(commentList);
			}).catch(err => {
				console.error(err);
			});
		}
	}, [commentList.length]);

	return (
		<div className="flex flex-col px-4">
			<div className="flex flex-row gap-2 items-center mb-2">
				<img className="w-9 h-9 rounded-full border border-lightGray" src={`http://${process.env.REACT_APP_SERVER_URL}/files/${user?.profile_picture}`} alt="123" />
				<CommentBox className="w-full grow" postComment={postComment} />
			</div>
			{commentList.map((v, i) => (
				<div key={v._id} className="flex flex-row gap-2 mb-2 w-full">
					<img className="w-9 h-9 rounded-full border border-lightGray" src={`http://${process.env.REACT_APP_SERVER_URL}/files/${v.author.profile_picture}`} alt="123" />
					<div className="bg-menuBg grow rounded-lg">
						<div className="px-[10px] pt-2">
							<p className="text-white font-bold text-sm">Gellert</p>
							<p className="text-lightGray text-xs">Software Engineer</p>
						</div>
						<ReactQuill className="!p-0 grow text-white" theme="snow" modules={{ toolbar: null }} readOnly={true} value={v.text} />
					</div>
				</div>
			))}
		</div>
	)
}

export default CommentSection