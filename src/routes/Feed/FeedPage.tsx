import { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import FeedCard from '../../components/Feed/FeedCard';
import { Feed } from '../../data/Feed';
import { AuthContext } from "../../context/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const FeedPage = () => {
	let [feeds, setFeeds] = useState<Array<Feed>>([]);
	const { removeItem } = useLocalStorage();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			fetch(`http://${process.env.REACT_APP_SERVER_URL}/feeds`, {
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
				
				setFeeds(data.info);
			}).catch(err => {
				console.error(err);
				removeItem('currentUser');
				<Navigate to="/" />
			});
		}
	}, []);

	if (!user) return <Navigate to="/" />

	return (
		<div className='bg-base-100'>
			<NavBar />
			<div className='bg-base-100 max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-2'>
				<div className='bg-red-100 grow-0 w-60 hidden md:block'>left</div>
				<div className='grow'>
					{feeds.map((feed, index) => (
						<FeedCard
							key={index}
							feed={feed} />
					))}
				</div>
				<div className='bg-lime-100 grow-0 w-60 hidden lg:block'>right</div>
			</div>
		</div>
	);
}

export default FeedPage;