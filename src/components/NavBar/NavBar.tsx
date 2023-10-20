import { useContext,  useState } from 'react';
import { Navigate, Link } from "react-router-dom"

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dropdown, CustomFlowbiteTheme } from 'flowbite-react';
 
import Logo from '../../images/uniplus.png'

import ProfileDropdown from './ProfileDropdown';
import SearchBar from "../SearchBar/SearchBar";
import navigation from './Navigations'
import LoginModal from '../Modal/LoginModal';
import SignupModal from '../Modal/SignupModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { AuthContext } from "../../context/AuthContext";
import { CurrentUser } from '../../data/User';

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ')
}

const customTheme: CustomFlowbiteTheme['dropdown'] = {
	arrowIcon: "ml-2 h-4 w-4",
  content: "py-1 focus:outline-none",
  floating: {
    animation: "transition-opacity",
    arrow: {
      base: "absolute z-10 h-2 w-2 rotate-45",
      style: {
        dark: "bg-gray-900 dark:bg-gray-700",
        light: "bg-white",
        auto: "bg-white dark:bg-gray-700"
      },
      placement: "-5px"
    },
    base: "z-10 w-72 mt-3 rounded divide-y divide-gray-100 shadow focus:outline-none",
    content: "py-1 text-sm text-gray-700 dark:text-gray-200",
    divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
    header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
    hidden: "invisible opacity-0",
    item: {
      container: "",
      base: "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
      icon: "mr-2 h-4 w-4"
    },
    style: {
      dark: "bg-mainBlue text-white dark:bg-mainBlue",
      light: "border border-gray-200 bg-white text-gray-900",
      auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-mainBlue dark:text-white"
    },
    target: "w-fit"
  },
  inlineWrapper: "flex items-center"
};

const NavBar = () => {
	const [active, setActive] = useState("Feed");
	const [openModal, setOpenModal] = useState<string | undefined>();
	const [error, setError] = useState<Error | undefined>();
	const props = { openModal, setOpenModal };

	const { setItem, removeItem } = useLocalStorage();
	const { user, setUserData } = useContext(AuthContext);

	const handleLogin = async (username: string, password: string) => {
		fetch(`${process.env.REACT_APP_USER_URL}/signin`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify({ username: username, password: password }),
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

			setUserData(new CurrentUser(data.info._id, data.info.username, data.info.email, data.info.display_name, data.info.position, data.info.session_id, data.info.profile_picture, data.info.on_board));

			setItem("currentUser", JSON.stringify(data.info));
			setOpenModal(undefined);
			return <Navigate to="/feed" />
		}).catch(err => {
			console.error(err.message);
			setError(err);
		});
	}

	const handleSignUp = async (email: string, username: string, password: string) => {
		fetch(`${process.env.REACT_APP_USER_URL}/signup`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify({ username: username, email: email, password: password }),
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

			setUserData(new CurrentUser(data.info._id, data.info.username, data.info.email, data.info.display_name, data.info.position, data.info.session_id, data.info.profile_picture, data.info.on_board));

			setItem("currentUser", JSON.stringify(data.info));
			setOpenModal(undefined);
			return <Navigate to="/onboarding" />
		}).catch(err => {
			console.error(err.message);
			setError(err);
		});
	}	

	const handleSignOut = async () => {
		fetch(`${process.env.REACT_APP_USER_URL}/signout`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
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

			setUserData(undefined);

			removeItem("currentUser");
			return <Navigate to="/" />
		}).catch(err => {
			console.error(err.message);
			setError(err);
		});
	}

	return (
		<>
			<LoginModal toggle={handleLogin} open={openModal || ""} setOpen={setOpenModal} error={error} setError={setError}/>
			<SignupModal toggle={handleSignUp} open={openModal || ""} setOpen={setOpenModal} error={error} setError={setError}/>
			<Disclosure as="nav" className="bg-mainBlue fixed w-full z-20 top-0 left-0 drop-shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-6xl px-6 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 sm:items-stretch justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="flex-none h-8 w-auto"
                    src={Logo}
                    alt="Your Company"
                  />
									{ user && user.on_board ? 
										<div>
											<div className="ml-8 grow hidden sm:grow-0 sm:flex h-9"><SearchBar /></div>
											<div className='ml-8 sm:hidden'>
												<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
													<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
												</svg>
											</div>
										</div>
										: <p className='text-white ml-3 text-2xl font-thin'>Swifty Career</p>
									}
                </div>
								{ user ? 
									user.on_board ? 
										<div className="flex w-full sm:w-[362px]">
											{navigation.map((item, index) => (
												index !== 4 ?
													<Link
														key={item.name}
														to={item.href}
														className={classNames(
															active === item.name ? 'text-white' : 'text-gray-500 hover:text-white',
															'flex items-center justify-end rounded-md p-1 text-sm font-medium w-full'
														)}
														onClick={() => setActive(item.name)}
														aria-current={item.current ? 'page' : undefined}
													>
														<img className='w-5 self-center' src={active === item.name ? item.logoSelected : item.logo} alt="" />
													</Link>
													: 
													<Dropdown 
														theme={customTheme} 
														key={item.name}
														label="" 
														dismissOnClick={false} 
														renderTrigger={() => (
															<div className='flex items-center justify-end w-full cursor-pointer'>
																<img className='w-6 self-center rounded-full border border-lightGray' src={active === item.name ? item.logoSelected : item.logo} alt="" />
															</div>
														)}
													>
														<div className='px-2 pt-2'>
															<div className='flex gap-2 items-center mb-2'>
																<img className='w-14 rounded-full border border-lightGray' src={`${process.env.REACT_APP_FILE_URL}/${user.profile_picture}`} alt="" />
																<div>
																	<p>{user.display_name}</p>
																	<p>{user.position}</p>
																</div>
															</div>
															<button
																type="button"
																className='text-blue-500 font-semibold rounded-full text-sm h-7 w-full text-center border hover:border-2 border-blue-500'
															>
																	View Profile
															</button>
														</div>
														<hr className="w-full h-[1px] mx-auto my-2 bg-mainBlueLight border-0 rounded md:my-2"></hr>
														<div className='ml-5'>
															<p 
																className='w-fit cursor-pointer'
																onClick={handleSignOut}
															>
																Sign Out
															</p>
														</div>
													</Dropdown>
												
											))}
										</div> 
									: <></>
									: 
									<div className="flex justify-between gap-5">
										<button
											key="signin"
											className= 'text-white rounded-md p-1 text-sm font-medium'
											onClick={() => props.setOpenModal('signin-modal')}
										>
											Sign In
										</button>
										<button
											key="signup"
											className= 'text-white rounded-md p-1 text-sm font-medium'
											onClick={() => props.setOpenModal('signup-modal')}
										>
											Sign Up
										</button>
									</div>
								}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
						{user ? 
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.map((item, index) => (
									<Link
										key={item.name}
										to={item.href}
										className={classNames(
											active === item.name ? 'text-white' : 'text-gray-500 hover:text-white',
											'flex items-center justify-end rounded-md p-1 text-sm font-medium w-full'
										)}
										onClick={() => setActive(item.name)}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</Link>
								))}
							</div>
							:
							<div className="flex flex-col sm:flex justify-between gap-5">
								<button
									key="signin"
									className= 'text-white rounded-md p-1 text-sm font-medium'
									onClick={() => props.setOpenModal('signin-modal')}
								>
									Sign In
								</button>
								<button
									key="signup"
									className= 'text-white rounded-md p-1 text-sm font-medium'
									onClick={() => props.setOpenModal('signup-modal')}
								>
									Sign Up
								</button>
							</div>
						}
          </Disclosure.Panel>
        </>
      )}
    	</Disclosure>
		</>
	);
}

export default NavBar;