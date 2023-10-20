import FeedCard from '../../components/Feed/FeedCard';
import PostFeedCard from '../../components/Feed/PostFeedCard';
import { Feed } from '../../data/Feed';
import { useFetch } from '../../hooks/useFetch';
import FeedSkeleton from '../../components/Feed/FeedSkeleton'

const FeedPage = () => {
	const {data, error} = useFetch<Feed[]>(
		`${process.env.REACT_APP_FEED_URL}`,
		{
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {          
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}
	);

	if (error) return <>{error.message}</>

	return (
		<div className='bg-base-100'>
			<div className='bg-base-100 max-w-6xl mx-auto pt-2 px-0 md:px-0 lg:px-8 flex'>
				<div className='bg-red-100 grow-0 shrink-0 w-60 hidden md:block'>left</div>
				<div className='grow px-0 md:px-8'>
					<PostFeedCard />
					{ error ? <></> :
						!data ? <FeedSkeleton /> :
						data.map((feed, index) => (
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