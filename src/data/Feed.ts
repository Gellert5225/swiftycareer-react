import { User } from "./User";

export class Feed {
	constructor(public _id: string = "",
				public like_count: number = 0,
				public comment_count: number = 0,
				public share_count: number = 0,
				public text_JSON: string = "",
				public text: string = "",
				public author_id: string = "",
				public images: Array<string> = [],
				public liked_user_ids: Array<string> = [],
				public comments: Array<string> = [],
				public author: User) {
		this._id = _id;
		this.like_count = like_count;
		this.comment_count = comment_count;
		this.share_count = share_count;
		this.text_JSON = text_JSON;
		this.text = text;
		this.author_id = author_id;
		this.images = images;
		this.liked_user_ids = liked_user_ids;
		this.comments = comments;
		this.author = author;
	}
}

export interface FeedProps {
	feed: Feed,
}