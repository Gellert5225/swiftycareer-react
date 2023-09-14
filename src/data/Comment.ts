export class Comment {
	constructor(public _id: string = "",
				public text: string = "",
				public feed_id: string = "",
				public author_id: string = "",
				public like_count: number = 0) {
		this._id = _id;
		this.like_count = like_count;
		this.text = text;
		this.author_id = author_id;
		this.feed_id = feed_id;
	}
}

export interface CommentProps {
	comment: Comment,
}