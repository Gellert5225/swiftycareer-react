export class CurrentUser {
	id: string = "";
	username: string = "";
	display_name: string = "";
	position: string = "";
	email: string = "";
	session_id: string = "";
	profile_picture = "";
	on_board = false;

	constructor(id: string, username: string, email: string, display_name: string, position: string, sessionId: string, profile_picture: string, on_board: boolean) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.session_id = sessionId;
		this.profile_picture = profile_picture;
		this.on_board = on_board;
		this.display_name = display_name;
		this.position = position;
	}
}

export class User {
	constructor(public _id: string, 
				public username: string, 
				public email: string, 
				public display_name: string,
				public bio: string,
				public position: string,
				public profile_picture: string,
				public on_board: boolean) {
		this._id = _id;
		this.username = username;
		this.email = email;
		this.display_name = display_name;
		this.bio = bio;
		this.position = position;
		this.profile_picture = profile_picture;
		this.on_board = on_board;
	}
}