import { useState } from 'react';

const LoginModal = ({toggle = (username: string, password: string) => {}}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	}

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	}

	return (
		<dialog id="my_modal_1" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">Log In</h3>
				<div className="form-control w-full max-w-full">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input type="text" placeholder="Email Adress" className="input input-bordered mb-1 w-full max-w-full" onChange={handleUsernameChange} />
					<label className="label">
						<span className="label-text">Password</span>
					</label>
					<input type="password" placeholder="Your Password" className="input input-bordered w-full max-w-full" onChange={handlePasswordChange} />
					<label className="label text-sm">
						<a href="/">Forgot Password?</a>
					</label>
				</div>
				<div className="modal-action mt-1">
					<form className="w-full" method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
						</button>
						<button className="btn btn-accent btn-block" onClick={() => {toggle(username, password)}}>Login</button>
					</form>
				</div>
			</div>
		</dialog>
	);
};

export default LoginModal;