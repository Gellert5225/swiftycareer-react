
import { CustomFlowbiteTheme, Modal } from 'flowbite-react';
import SearchBar from '../SearchBar/SearchBar';

const modalTheme: CustomFlowbiteTheme['modal'] = {
	"root": {
		"base": "fixed top-0 right-0 left-0 z-50 h-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
		"show": {
			"on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
			"off": "hidden"
		},
		"sizes": {
			"sm": "max-w-sm",
			"md": "max-w-md",
			"lg": "max-w-lg",
			"xl": "max-w-xl",
			"2xl": "max-w-2xl",
			"3xl": "max-w-3xl",
			"4xl": "max-w-4xl",
			"5xl": "max-w-5xl",
			"6xl": "max-w-6xl",
			"7xl": "max-w-7xl"
		},
		"positions": {
			"top-left": "items-start justify-start",
			"top-center": "items-start justify-center",
			"top-right": "items-start justify-end",
			"center-left": "items-center justify-start",
			"center": "items-center justify-center",
			"center-right": "items-center justify-end",
			"bottom-right": "items-end justify-end",
			"bottom-center": "items-end justify-center",
			"bottom-left": "items-end justify-start"
		}
	},
	"content": {
		"base": "relative h-auto w-[95%] top-5 md:h-auto",
		"inner": "relative rounded-lg bg-white shadow dark:bg-mainBlue flex flex-col max-h-[90vh]"
	},
	"body": {
		"base": "p-2 flex-1 overflow-auto",
		"popup": "pt-0"
	},
	"header": {
		"base": "flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5",
		"popup": "p-2 border-b-0",
		"title": "text-xl font-medium text-gray-900 dark:text-white",
		"close": {
			"base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
			"icon": "h-5 w-5"
		}
	},
	"footer": {
		"base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
		"popup": "border-t"
	}
}

const SearchModal = (props: {
	open: string,
	setOpen: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
	return (
		<Modal theme={modalTheme} dismissible position={"top-center"} show={props.open === 'search-modal'} onClose={() => props.setOpen(undefined)}>
			<Modal.Body theme={modalTheme.body} >
				<div className="flex items-center h-9">
					<label htmlFor="simple-search" className="sr-only">Search</label>
					<div className="relative w-full h-9">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none h-9">
							<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
							</svg>
						</div>
						<input autoComplete="off" type="text" id="simple-search" className="focus:outline-none focus:ring-0 h-9 bg-mainBlue text-gray-900 text-md rounded-lg border-0 block w-full pl-10 dark:bg-mainBlue dark:placeholder-gray-400 dark:text-white" placeholder="Search Anything" required />
					</div>
				</div>
				<hr className="w-full h-[1px] mx-auto my-2 bg-gray-600 border-0 rounded md:my-2"></hr>
				<div>
					<p className='text-lightGray ml-2 text-sm'>Recents</p>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default SearchModal;