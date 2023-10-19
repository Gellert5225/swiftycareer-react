import { useEffect, useState } from 'react';
import FeedCard from '../../components/Feed/FeedCard';
import PostFeedCard from '../../components/Feed/PostFeedCard';
import { Feed } from '../../data/Feed';
import { useFetch } from '../../hooks/useFetch';
import { ApiResponse } from '../../data/ApiResponse';

const FeedPage = () => {
	let [feeds, setFeeds] = useState<Array<Feed>>([]);

	const response: ApiResponse = useFetch(
		`${process.env.REACT_APP_FEED_URL}`
	);
	
	useEffect(() => {
		console.log(response);
		if (!response.error && response.data && !response.isLoading) setFeeds(response.data.info);
	}, [response]);

	return (
		<div className='bg-base-100'>
			<div className='bg-base-100 max-w-6xl mx-auto pt-2 px-0 md:px-0 lg:px-8 flex'>
				<div className='bg-red-100 grow-0 shrink-0 w-60 hidden md:block'>left</div>
				<div className='grow px-0 md:px-8'>
					<PostFeedCard />
					{ response.isLoading ? <span>Loading.....</span> :
						response.error ? <></> :
						feeds.map((feed, index) => (
							<FeedCard
								key={index}
								feed={feed} />
						))
					}
				</div>
				<div className='bg-lime-100 grow-0 shrink-0 w-60 hidden lg:block'>right</div>
			</div>
		</div>
	);
}

export default FeedPage;