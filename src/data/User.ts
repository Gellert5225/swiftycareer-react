export class CurrentUser {
	id: string = "";
	name: string = "";
	email: string = "";
	sessionId: string = "";
	profile_picture = "";

	constructor(id: string, name: string, email: string, sessionId: string, profile_picture: string) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.sessionId = sessionId;
		this.profile_picture = profile_picture;
	}
}

export class User {
	constructor(public _id: string, 
				public username: string, 
				public email: string, 
				public display_name: string,
				public bio: string,
				public position: string,
				public profile_picture: string) {
		this._id = _id;
		this.username = username;
		this.email = email;
		this.display_name = display_name;
		this.bio = bio;
		this.position = position;
		this.profile_picture = profile_picture;
	}
}