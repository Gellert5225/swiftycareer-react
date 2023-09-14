import { useState } from 'react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';

const LoginModal = (props: {
	toggle: (username: string, password: string) => {},
	open: string,
	setOpen: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	}

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	}

	return (
		<Modal className='' show={props.open === 'signin-modal'} size="md" popup onClose={() => props.setOpen(undefined)}>
			<Modal.Header  />
			<Modal.Body >
				<div className="space-y-6">
					<h3 className="text-xl font-medium text-white">Sign in to Swifty Career</h3>
					<div>
						<div className="mb-2 block">
							<Label className='text-white' htmlFor="email" value="Your email" />
						</div>
						<TextInput onChange={handleUsernameChange} id="email" placeholder="name@company.com" required />
					</div>
					<div>
						<div className="mb-2 block">
							<Label className='text-white' htmlFor="password" value="Your password" />
						</div>
						<TextInput onChange={handlePasswordChange} id="password" type="password" required />
					</div>
					<div className="flex justify-between">
						<div className="flex items-center gap-2">
							<Checkbox id="remember" />
							<Label className='text-white' htmlFor="remember">Remember me</Label>
						</div>
						<a href="/modal" className="text-sm text-white text-cyan-700 hover:underline dark:text-cyan-500">
							Lost Password?
						</a>
					</div>
					<div className="w-full">
						<Button className='bg-mainBlueTint' onClick={() => {props.toggle(username, password); props.setOpen(undefined);}}>Log in to your account</Button>
					</div>
					<div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
						Not registered?&nbsp;
						<a href="/modal" className="text-cyan-700 hover:underline dark:text-cyan-500">
							Create account
						</a>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;