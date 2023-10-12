import { useContext,  useState } from 'react';
import { Navigate, useNavigate, Link } from "react-router-dom"

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
 
import Logo from '../../images/uniplus.png'

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

const NavBar = () => {
	const [active, setActive] = useState("feed");
	const [openModal, setOpenModal] = useState<string | undefined>();
	const [error, setError] = useState<Error | undefined>();
	const props = { openModal, setOpenModal };

	const { setItem } = useLocalStorage();
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
				console.error("Error when logging in");
				console.log(res);
				const error = data || res;
				throw new Error(JSON.stringify(error));
			}

			console.log(data);
			setUserData(new CurrentUser(data.info._id, data.info.username, data.info.email, data.info.session_id, data.info.profile_picture, data.info.on_board));

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
				console.error("Error when signing up");
				console.log(res);
				const error = data || res;
				throw new Error(JSON.stringify(error));
			}

			console.log(data);
			setUserData(new CurrentUser(data.info._id, data.info.username, data.info.email, data.info.session_id, data.info.profile_picture, data.info.on_board));

			setItem("currentUser", JSON.stringify(data.info));
			setOpenModal(undefined);
			return <Navigate to="/onboarding" />
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
          <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 justify-start sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="flex-none h-8 w-auto"
                    src={Logo}
                    alt="Your Company"
                  />
									{ user && user.on_board ? 
										<div className="ml-8 grow sm:grow-0 h-9"><SearchBar /></div> 
										: <p className='text-white ml-3 text-2xl font-thin'>Swifty Career</p>
									}
                </div>
								{ user ? 
									user.on_board ? 
										<div className="hidden sm:flex w-1/3">
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
													<img className='w-5 self-center' src={active === item.name ? item.logoSelected : item.logo} alt="" />
												</Link>
											))}
										</div> 
									: <></>
									: 
									<div className="hidden sm:flex justify-between gap-5">
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
									<Disclosure.Button
										key={item.name}
										as="a"
										className={classNames(
											active === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'block rounded-md px-3 py-2 text-base font-medium'
										)}
										onClick={() => {
											setActive(item.name);
										}}
										aria-current={item.current ? 'page' : undefined}
									>
										{index === 4 ? user.name : item.name}
									</Disclosure.Button>
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