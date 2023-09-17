'use client';
import { FC, useEffect, useState, useContext } from "react";
import { FeedProps } from "../../data/Feed";
import { AuthContext } from "../../context/AuthContext";
import CommentSection from "./CommenSection"
 
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Carousel } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import likeFilled from '../../images/like-selected.png'
import likeHollow from '../../images/like.png'
import commentImage from '../../images/comment.png'
import repostImage from '../../images/repost.png'
import repostedImage from '../../images/repost-selected.png'

const FeedCard: FC<FeedProps> = ({feed}): JSX.Element => {
	const [liked, setLiked] = useState(false);
	const [commentSection, setCommentSection] = useState(<></>);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (user)
			setLiked(feed.liked_user_ids.includes(user.id));
	}, [feed.liked_user_ids, user]);

	const handleLike = () => {
		if (user) {
			let amount = 0;
			if (liked) {
				amount = -1;
				var index = feed.liked_user_ids.indexOf(user.id);
				if (index !== -1) {
					feed.liked_user_ids.splice(index, 1);
					feed.like_count--;
				}
			} else {
				amount = 1;
				feed.liked_user_ids.push(user.id);
				feed.like_count++;
			}
			console.log(user.id);
			fetch(`http://${process.env.REACT_APP_SERVER_URL}/feeds/${feed._id}/likes`, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify({ userId: user.id, amount: amount }),
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
					throw new Error(error);
				}
			}).catch(err => {
				console.error(err.message);
			});
		}
		setLiked(!liked);
	};

	const handleComment = () => {
		if (user) {
			setCommentSection(<CommentSection feedId={ feed._id }/>)
		}
	};

	const customTheme: CustomFlowbiteTheme['carousel'] = {
		"root": {
			"base": "relative h-full w-full",
			"leftControl": "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
			"rightControl": "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none"
		},
		"indicators": {
			"active": {
				"off": "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
				"on": "bg-white dark:bg-gray-800"
			},
			"base": "h-2 w-2 rounded-full",
			"wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
		},
		"item": {
			"base": "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
			"wrapper": "w-full flex-shrink-0 transform cursor-grab snap-center"
		},
		"control": {
			"base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-0 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-0 sm:h-10 sm:w-10",
			"icon": "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
		},
		"scrollContainer": {
			"base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none",
			"snap": "snap-x"
		}
	};

	return (
		<div className="flex flex-col justify-between mb-3 bg-mainBlue rounded-lg">
			<div className="bg-transparent flex flex-row grow px-2 pt-2 items-center">
				<img className="before:bg-mainBlue rounded-full w-10 h-10 align-middle border border-lightGray" src={`http://${process.env.REACT_APP_SERVER_URL}/files/${feed.author.profile_picture}`} alt="profile" />
				<div className="flex flex-col px-2">
					<p className="text-white font-medium">{feed.author.display_name}</p>
					<p className="text-lightGray text-sm">{feed.author.position}</p>
				</div>
			</div>
			<ReactQuill className="!p-0 grow min-h-full text-white" theme="snow" modules={{ toolbar: null }} readOnly={true} value={feed.text} />
			{feed.images.length > 0 ? 
				<Carousel 
					theme={customTheme} 
					indicators={feed.images.length > 1 ? true : false} 
					leftControl={feed.images.length > 1 ? false : true} 
					rightControl={feed.images.length > 1 ? false : true} 
					slide={false} 
					className="aspect-square grow rounded-none"
				>
					{feed.images.map((image, index) => (
						<img key={image} src={`http://${process.env.REACT_APP_SERVER_URL}/files/${image}`} className="aspect-square object-cover" alt=""/>
					))}
				</Carousel> : <></>
			}
			<hr className="w-11/12 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>
			<div className="grow flex flex-row justify-around mb-2">
				<div onClick={handleLike} className="flex items-center justify-center gap-2 w-10 cursor-pointer">
					<img className="w-5 h-5" src={liked ? likeFilled : likeHollow} alt="" />
					<p className="text-lightGray pb-0.5">{feed.like_count}</p>
				</div>
				<div onClick={handleComment} className="flex items-center justify-center gap-2 w-10 cursor-pointer">
					<img className="w-5 h-5" src={commentImage} alt="" />
					<p className="text-lightGray pb-0.5">{feed.comment_count}</p>
				</div>
				<div className="flex items-center justify-center gap-2 w-10 cursor-pointer">
					<img onClick={handleLike} className="w-5 h-5" src={repostImage} alt="" />
					<p className="text-lightGray pb-0.5">{feed.share_count}</p>
				</div>
			</div>
			{commentSection}
		</div>
	)
}

export default FeedCard;