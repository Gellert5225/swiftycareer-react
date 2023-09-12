import { FC } from "react";
import { FeedProps } from "../../data/Feed";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FeedCard: FC<FeedProps> = ({feed}): JSX.Element => {
	console.log(feed);
	const goTo = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		event.preventDefault()
		const btn = event.currentTarget                        

		const carousel = btn.parentElement!.parentElement!.parentElement!
						
		const href = btn.getAttribute('href')!
		const target = carousel.querySelector<HTMLDivElement>(href)!
		const left = target.offsetLeft
		carousel.scrollTo({left: left - carousel.offsetLeft})
}

	return (
		<div className="flex flex-col max-w-3xl w-full">
			<div className="flex flex-row">
				<img src={`http://${process.env.REACT_APP_SERVER_URL}/files/${feed.author.profile_picture}`} alt="profile" />
				<div className="flex flex-col">
					<p>{feed.author.display_name}</p>
					<p>{feed.author.username}</p>
				</div>
			</div>
			<ReactQuill className="!p-0" theme="snow" modules={{ toolbar: null, clipboard: { matchVisual: false } }} readOnly={true} value={feed.text}>
				<div className="!border-transparent !border-0 !p-0"/>
			</ReactQuill>
			{feed.images.length > 0 ? 
				<div className="carousel w-full">
					{feed.images.map((image, index) => (
						<div key={image} id={"p" + feed._id + index} className="carousel-item relative w-full">
							<img src={`http://${process.env.REACT_APP_SERVER_URL}/files/${image}`} className="w-full aspect-square object-cover" />
							<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
								<a id="prev" onClick={goTo} href={index == 0 ? `#p${feed._id}${feed.images.length - 1}` : `#p${feed._id}${index - 1}`} className="btn btn-circle opacity-40">❮</a> 
								<a id="next" onClick={goTo} href={index == (feed.images.length - 1 )? `#p${feed._id}0` : `#p${feed._id}${index + 1}`} className="btn btn-circle opacity-40">❯</a>
							</div>
						</div> 
					))}
				</div> : <></>}
		</div>
	)
}

export default FeedCard;