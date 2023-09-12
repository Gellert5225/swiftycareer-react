'use client';
import { FC, useEffect, useState, useContext } from "react";
import { Feed, FeedProps } from "../../data/Feed";
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { AuthContext } from "../../context/AuthContext";

import { Carousel } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import likeFilled from '../../images/like-selected.png'
import likeHollow from '../../images/like.png'

const FeedCard: FC<FeedProps> = ({feed}): JSX.Element => {
	const [feedObj, setFeedObj] = useState<Feed>(feed);
	const [liked, setLiked] = useState(false);
	const { user } = useContext(AuthContext);

	console.log(feedObj);

	useEffect(() => {
		setFeedObj(feed);
		console.log(feedObj);
		if (user)
			setLiked(feed.liked_user_ids.includes(user.id));
	}, [feed.liked_user_ids]);

	const handleLike = () => {
		if (user) {
			if (liked) {
				var index = feed.liked_user_ids.indexOf(user.id);
				if (index !== -1) {
					feed.liked_user_ids.splice(index, 1);
				}
			} else {
				feed.liked_user_ids.push(user.id);
			}
		}
		setLiked(!liked);
	};

	return (
		<div className="flex flex-col justify-between mb-2 bg-mainBlue rounded-lg">
			<div className="flex flex-row grow p-2 items-center">
				<img className="rounded-full w-10 h-10 align-middle" src={`http://${process.env.REACT_APP_SERVER_URL}/files/${feed.author.profile_picture}`} alt="profile" />
				<div className="flex flex-col px-2">
					<p className="text-white font-medium">{feed.author.display_name}</p>
					<p className="text-lightGray text-sm">{feed.author.position}</p>
				</div>
			</div>
			<ReactQuill className="!p-0 grow min-h-full" theme="snow" modules={{ toolbar: null }} readOnly={true} value={feedObj.text} />
			{feed.images.length > 0 ? 
				<Carousel theme={{"scrollContainer": {"base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none"}}} indicators={feed.images.length > 1 ? true : false} leftControl={feed.images.length > 1 ? false : true} rightControl={feed.images.length > 1 ? false : true} slide={false} className="aspect-square grow rounded-none">
					{feed.images.map((image, index) => (
						<img key={image} src={`http://${process.env.REACT_APP_SERVER_URL}/files/${image}`} className="aspect-square object-cover" />
					))}
				</Carousel> : <></>
			}
			<hr className="w-11/12 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>
			<div className="grow flex flex-row justify-around">
				<div><img onClick={handleLike} className="w-5 h-5" src={liked ? likeFilled : likeHollow} alt="" /></div>
				<div>Comment</div>
				<div>Share</div>
			</div>
		</div>
	)
}

export default FeedCard;