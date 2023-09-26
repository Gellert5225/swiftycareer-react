import { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const JobPage = () => {
	const { removeItem } = useLocalStorage();
	const { user, setUserData } = useContext(AuthContext);

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
						<div className='flex flex-wrap'>
							<div className="flex items-center">
									<input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
									<label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
							</div>
						</div>
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