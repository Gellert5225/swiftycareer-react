import { useEffect, useState, useContext } from 'react';
import FeedCard from '../../components/Feed/FeedCard';
import PostFeedCard from '../../components/Feed/PostFeedCard';
import { Feed } from '../../data/Feed';
import { AuthContext } from "../../context/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const FeedPage = () => {
	let [feeds, setFeeds] = useState<Array<Feed>>([]);
	const { removeItem } = useLocalStorage();
	const { user, setUserData } = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			fetch(`${process.env.REACT_APP_FEED_URL}`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then(async res => {
				const data = await res.json();

				if (!res.ok) {
					const error = data || res;
					throw new Error(JSON.stringify(error));
				}
				
				setFeeds(data.info);
			}).catch(err => {
				console.error(err.message);
				const error = JSON.parse(err.message);
				if (error.code === 403 || error.code === 401) {
					removeItem('currentUser');
					setUserData(undefined);
				}
			});
		}
	}, [user?.id]);

	return (
		<div className='bg-base-100'>
			<div className='bg-base-100 max-w-6xl mx-auto pt-2 sm:px-6 lg:px-8 flex'>
				<div className='bg-red-100 grow-0 shrink-0 w-60 hidden md:block'>left</div>
				<div className='grow px-1 sm:px-8'>
					<PostFeedCard />
					{feeds.map((feed, index) => (
						<FeedCard
							key={index}
							feed={feed} />
					))}
				</div>
				<div className='bg-lime-100 grow-0 shrink-0 w-60 hidden lg:block'>right</div>
			</div>
		</div>
	);
}

export default FeedPage;