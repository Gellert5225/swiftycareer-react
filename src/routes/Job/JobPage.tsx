import { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { JobTypes, ExperienceLevel, DatePosted, PayRate } from './JobFilter';

const JobPage = () => {
	const { removeItem } = useLocalStorage();
	const { user, setUserData } = useContext(AuthContext);
	const [ jobTypes, setJobTypes ] = useState<Array<string>>([]);
	const [ expLevel, setExpLevel ] = useState<Array<string>>([]);
	const [ postDate, setPostDate ] = useState("any");
	const [ payRate, setPayRate ] = useState("any");

	useEffect(() => {
		
	});

	return (
		<div className='flex-col max-w-6xl mx-auto'>
			<div className='flex pt-2 gap-2'>
				<input type="text" id="title" className="bg-mainBlue text-gray-900 border-0 text-md rounded-sm block w-full p-0 pl-2 h-10 dark:bg-mainBlue dark:placeholder-gray-400 dark:text-white" placeholder="Search by title or company" />
				<input type="text" id="title" className="bg-mainBlue text-gray-900 border-0 text-md rounded-sm block w-full p-0 pl-2 h-10 dark:bg-mainBlue dark:placeholder-gray-400 dark:text-white" placeholder="City, state or zipcode" />
				<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 border-transparent focus:border-transparent focus:ring-0">Search</button>
			</div>
			<div className='flex mt-5'>
				<div className='flex-col grow-0 shrink-0 w-60 hidden md:block'>
					<div className='flex justify-between'>
						<h1 className='text-lg text-white font-semibold'>FILTERS</h1>
						<button type="button" className="text-sm font-bold text-center text-lightGray bg-transparent hover:bg-transparent focus:ring-0 focus:outline-none">Clear Filters</button>
					</div>
					<hr className="w-full h-[1px] my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>
					<div>
						<h1 className='text-md text-white font-semibold'>Job Type</h1>
						<div className='flex flex-wrap mt-1'>
							{JobTypes.map((v, i) => (
								<div key={i} className="flex items-center w-1/2 p-1">
									<input id={v.id} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-transparent border-lightGray rounded-sm outline-none focus:ring-offset-0 focus:outline-none focus:ring-0 dark:bg-transparent dark:border-lightGray" />
									<label htmlFor={v.id} className="ml-2 text-md font-medium text-lightGray dark:text-lightGray">{v.name}</label>
								</div>
							))}
						</div>
					</div>
					<hr className="w-full h-[1px] my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>
					<div>
						<h1 className='text-md text-white font-semibold'>Experience Level</h1>
						<div className='flex flex-wrap mt-1'>
							{ExperienceLevel.map((v, i) => (
								<div key={i} className="flex items-center w-1/2 p-1">
									<input id={v.id} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-transparent border-lightGray rounded-sm outline-none focus:ring-offset-0 focus:outline-none focus:ring-0 dark:bg-transparent dark:border-lightGray" />
									<label htmlFor={v.id} className="ml-2 text-md font-medium text-lightGray dark:text-lightGray">{v.name}</label>
								</div>
							))}
						</div>
					</div>
					<hr className="w-full h-[1px] my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>
					<div>
						<h1 className='text-md text-white font-semibold'>Date Posted</h1>
						<div className='flex flex-wrap mt-1'>
							{DatePosted.map((v, i) => (
								<div key={i} className="flex items-center w-1/2 p-1">
									<input id={v.id} type="radio" value="" name="radio-date" className="w-4 h-4 text-blue-600 bg-transparent border-lightGray outline-none focus:ring-offset-0 focus:outline-none focus:ring-0 dark:bg-transparent dark:border-lightGray" />
									<label htmlFor={v.id} className="ml-2 text-md font-medium text-lightGray dark:text-lightGray">{v.name}</label>
								</div>
							))}
						</div>
					</div>
					<hr className="w-full h-[1px] my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>
					<div>
						<h1 className='text-md text-white font-semibold'>Pay Rate / hr</h1>
						<div className='flex flex-wrap mt-1'>
							{PayRate.map((v, i) => (
								<div key={i} className="flex items-center w-1/2 p-1">
									<input id={v.id} type="radio" value="" name="radio-salary" className="w-4 h-4 text-blue-600 bg-transparent border-lightGray outline-none focus:ring-offset-0 focus:outline-none focus:ring-0 dark:bg-transparent dark:border-lightGray" />
									<label htmlFor={v.id} className="ml-2 text-md font-medium text-lightGray dark:text-lightGray">{v.name}</label>
								</div>
							))}
						</div>
					</div>
					<hr className="w-full h-[1px] my-2 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700"></hr>
					<div className='flex justify-between'>
						<h1 className='text-md text-white font-semibold'>Remote</h1>
						<label className="relative inline-flex items-center cursor-pointer">
							<input type="checkbox" value="" className="sr-only peer" />
							<div className="w-11 h-6 bg-lightGray peer-focus:ring-offset-0 rounded-full peer dark:bg-lightGray peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
						</label>
					</div>
					<div className='flex justify-around mt-4'>
						<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 -focus:ring-offset-0 font-medium rounded-md text-md px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700">Apply Filters</button>
						<button type="button" className="text-md font-bold text-center text-lightGray bg-transparent hover:bg-transparent focus:ring-0 focus:outline-none">Cancel</button>
					</div>
				</div>
				<div className='grow px-1 sm:px-8'>

				</div>
				<div className='bg-red-100 grow-0 shrink-0 w-60 hidden lg:block'>right</div>
			</div>
		</div>
	);
};

export default JobPage;