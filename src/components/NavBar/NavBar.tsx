import { Fragment,  useState } from 'react';
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
 
import Logo from '../../images/uniplus.png'

import SearchBar from "../SearchBar/SearchBar";
import navigation from './Navigations'
import LoginModal from '../Modal/LoginModal';

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
	const [active, setActive] = useState("Home");

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const navigate = useNavigate();

	const handleLogin = async (username: string, password: string) => {
		fetch(`http://${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_USER_BASE_URL}/signin`, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({ username: username, password: password }),
			headers: {          
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(async res => {
			const isJson = res.headers.get('content-type')?.includes('application/json');
			const data = isJson && await res.json();
			res.headers.forEach(console.log);

			console.log(Cookies.get());
			
			if (!res.ok) {
				const error = (data && data.error) || res.status;
				return Promise.reject(error);
			}

			console.log(data);

			navigate('/feed');
		}).catch(error => {
			console.error('There was an error!', error);
		});
	}

	return (
		<>
			<LoginModal toggle={handleLogin} />
			<Disclosure as="nav" className="bg-primary">
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
									{isLoggedIn ? <div className="grow sm:grow-0"><SearchBar /></div> : <>Swifty Career</>}
                </div>
								{isLoggedIn ? 
									<div className="hidden sm:flex w-1/2">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													active === item.name ? 'text-white' : 'text-gray-500 hover:text-white',
													'flex-col flex items-center justify-end rounded-md p-1 text-sm font-medium w-full'
												)}
												onClick={() => setActive(item.name)}
												aria-current={item.current ? 'page' : undefined}
											>
												<img className='w-5 self-center' src={active === item.name ? item.logoSelected : item.logo} alt="" />
												{item.name}
											</a>
										))}
									</div> 
									: 
									<div className="hidden sm:flex justify-between gap-5">
										<button
											key="signin"
											className= 'text-white rounded-md p-1 text-sm font-medium'
											onClick={() => {
												if (document) {
													(document.getElementById('my_modal_1') as HTMLFormElement).showModal();
												}
											}}
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
						{isLoggedIn ? 
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.map((item) => (
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
										{item.name}
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