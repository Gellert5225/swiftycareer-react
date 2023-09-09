export class User {
	id: string = "";
	name: string = "";
	email: string = "";
	sessionId: string = "";

	constructor(id: string, name: string, email: string, sessionId: string) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.sessionId = sessionId;
	}
}