import { useState } from 'react';
import { Button, Label, Modal, TextInput, Alert } from 'flowbite-react';
import FloatingInput from '../Input/FloatingInput';

const SignupModal = (props: {
	toggle: (email: string, username: string, password: string) => {},
	open: string,
	setOpen: React.Dispatch<React.SetStateAction<string | undefined>>,
	error: Error | undefined,
	setError: React.Dispatch<React.SetStateAction<Error | undefined>>
}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPw, setrepeatPw] = useState("");
	const [email, setEmail] = useState("");

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	}

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	}

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	}

	const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setrepeatPw(event.target.value);
	}

	const signUp = () => {
		if (email.length !== 0 && username.length !== 0 && password.length >= 6 && password === repeatPw)
			props.toggle(email, username, password);
	}

	return (
		<Modal className='' show={props.open === 'signup-modal'} size="md" popup onClose={() => props.setOpen(undefined)}>
			<Modal.Header  />
			<Modal.Body >
				<div className="space-y-6">
					<h3 className="text-xl font-medium text-white">Sign up for Swifty Career</h3>
					{ props.error ?
						<Alert
							color="failure"
							onDismiss={() => props.setError(undefined)}
						>
							<span>
								<p>
									{ JSON.parse(props.error.message) ? JSON.parse(props.error.message).error : props.error.message }
								</p>
							</span>
						</Alert>
						: <></>
					}
					<FloatingInput label={"Email"} error={email.length !== 0 ? undefined : "Please enter your email"} onChange={handleEmailChange} />
					<FloatingInput label={"Username"} error={username.length !== 0 ? undefined : "Please enter a username"} onChange={handleUsernameChange} />
					<FloatingInput label={"Password"} error={password.length >= 6 ? undefined : "Password must be at least 6 characters"} onChange={handlePasswordChange} />
					<FloatingInput label={"Repeat Password"} error={repeatPw === password ? undefined : "Password does not match"} onChange={handleRepeatPasswordChange} />
					<div className="w-full">
						<Button className='bg-mainBlueTint' onClick={signUp}>Sign Up</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default SignupModal;