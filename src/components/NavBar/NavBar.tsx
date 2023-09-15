import { useContext,  useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom"

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
 
import Logo from '../../images/uniplus.png'

import SearchBar from "../SearchBar/SearchBar";
import navigation from './Navigations'
import LoginModal from '../Modal/LoginModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { AuthContext } from "../../context/AuthContext";
import { CurrentUser } from '../../data/User';

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
	const [active, setActive] = useState("Home");
	const [openModal, setOpenModal] = useState<string | undefined>();
	const props = { openModal, setOpenModal};

	const { setItem } = useLocalStorage();
	const { user, setUserData } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleLogin = async (username: string, password: string) => {
		fetch(`http://${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_USER_BASE_URL}/signin`, {
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
				const error = (data && data.error) || res.status;
				return Promise.reject(error);
			}

			console.log(data);
			setUserData(new CurrentUser(data.info._id, data.info.username, data.info.email, data.info.session_id, data.info.profile_picture));

			setItem("currentUser", JSON.stringify(data.info));

			return <Navigate to="/feed" />
		}).catch(error => {
			console.error('There was an error!', error);
		});
	}

	return (
		<>
			<LoginModal toggle={handleLogin} open={openModal || ""} setOpen={setOpenModal}/>
			<Disclosure as="nav" className="bg-mainBlue fixed w-full z-20 top-0 left-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
									{user ? <div className="grow sm:grow-0"><SearchBar /></div> : <>Swifty Career</>}
                </div>
								{user ? 
									<div className="hidden sm:flex w-1/3">
										{navigation.map((item, index) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													active === item.name ? 'text-white' : 'text-gray-500 hover:text-white',
													'flex items-center justify-end rounded-md p-1 text-sm font-medium w-full'
												)}
												onClick={() => setActive(item.name)}
												aria-current={item.current ? 'page' : undefined}
											>
												<img className='w-5 self-center' src={active === item.name ? item.logoSelected : item.logo} alt="" />
											</a>
										))}
									</div> 
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
							<></>
						}
          </Disclosure.Panel>
        </>
      )}
    	</Disclosure>
		</>
	);
}

export default NavBar;