import { useContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import FloatingInput from "../../components/Input/FloatingInput";
import { AuthContext } from "../../context/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const OnBoarding = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [headline, setHeadline] = useState("");
	const [education, setEducation] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const { user, setUserData } = useContext(AuthContext);
	const { getItem } = useLocalStorage();

	if (user?.on_board)
		return <Navigate to='/feed' />

	const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFirstname(event.target.value);
	}

	const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLastname(event.target.value);
	}

	const handleHeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHeadline(event.target.value);
	}

	const handleEducationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEducation(event.target.value);
	}

	const handleFinish = async () => {
		setSubmitted(true);
		fetch(`${process.env.REACT_APP_USER_URL}/${user?.id}/onboard`, {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify({ firstName: firstname, lastName: lastname, headline: headline, education: education }),
			headers: {          
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(async res => {
			const isJson = res.headers.get('content-type')?.includes('application/json');
			const data = isJson && await res.json();
			
			if (!res.ok) {
				const error = data || res;
				throw new Error(JSON.stringify(error));
			}
			
			let currentUser = JSON.parse(getItem('currentUser') || "{}");
			currentUser.on_board = true;
			setUserData(currentUser);
			return <Navigate to="/feed" />
		}).catch(err => {
			console.error(err.message);
		});
	}

	return (
		<div className="w-full sm:w-[420px] ml-auto mr-auto pt-5 px-5 flex flex-col">
			<p className="text-white mb-5 text-2xl">One last step, tell us about yourself:</p>
			<div className="flex flex-col gap-2">
				<FloatingInput 
					label={"First Name *"} 
					error={submitted && firstname.length === 0 ? "Please Enter Your First Name" : undefined} 
					onChange={handleFirstnameChange} 
					labelBgColor="bg-mainBlueDark"
				/>
				<FloatingInput 
					label={"Last Name *"} 
					error={submitted && firstname.length === 0 ? "Please Enter Your Last Name" : undefined} 
					onChange={handleLastnameChange} 
					labelBgColor="bg-mainBlueDark" 
				/>
				<FloatingInput 
					label={"Headline *"} 
					error={submitted && firstname.length === 0 ? "Please Enter Your Headline" : undefined} 
					onChange={handleHeadlineChange} 
					labelBgColor="bg-mainBlueDark" 
					allowSpace={true}
				/>
				<FloatingInput 
					label={"Education *"} 
					error={submitted && firstname.length === 0 ? "Please Enter Your Education" : undefined}
					onChange={handleEducationChange} 
					labelBgColor="bg-mainBlueDark" 
					allowSpace={true}
				/>
			</div>
			<button type="button" onClick={handleFinish} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 ml-auto mr-0 focus:outline-none">Finish</button>
		</div>
	)
}

export default OnBoarding;