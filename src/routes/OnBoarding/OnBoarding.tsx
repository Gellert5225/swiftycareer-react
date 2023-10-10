import { useState } from "react";
import FloatingInput from "../../components/Input/FloatingInput";

const OnBoarding = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [headline, setHeadline] = useState("");
	const [education, setEducation] = useState("");

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

	return (
		<div className="w-full sm:w-[420px] ml-auto mr-auto pt-5 px-5">
			<p className="text-white mb-5 text-2xl">One last step, tell us about yourself:</p>
			<div className="flex flex-col gap-2">
				<FloatingInput 
					label={"First Name *"} 
					error={undefined} 
					onChange={handleFirstnameChange} 
					labelBgColor="bg-mainBlueDark"
				/>
				<FloatingInput 
					label={"Last Name *"} 
					error={undefined} 
					onChange={handleLastnameChange} 
					labelBgColor="bg-mainBlueDark" 
				/>
				<FloatingInput 
					label={"Headline *"} 
					error={undefined} 
					onChange={handleHeadlineChange} 
					labelBgColor="bg-mainBlueDark" 
				/>
				<FloatingInput 
					label={"Education *"} 
					error={undefined}
					onChange={handleEducationChange} 
					labelBgColor="bg-mainBlueDark" 
				/>
			</div>
		</div>
	)
}

export default OnBoarding;