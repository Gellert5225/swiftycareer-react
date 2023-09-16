export default function SearchComponent() {
	return (
		<form className="flex items-center h-9">   
			<label htmlFor="simple-search" className="sr-only">Search</label>
			<div className="relative w-full h-9">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none h-9">
					<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
					</svg>
				</div>
				<input type="text" id="simple-search" className="h-9 bg-mainBlue border border-lightGray text-gray-900 text-md rounded-lg block w-full pl-10 dark:bg-mainBlue dark:border-lightGray dark:placeholder-gray-400 dark:text-white" placeholder="Search Anything" required />
			</div>
		</form>
	);
}