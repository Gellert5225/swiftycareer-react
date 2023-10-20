import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContext } from "../context/AuthContext";
import { CurrentUser } from '../data/User'
import { useFetch } from '../hooks/useFetch';

type Props = {
	children?: React.ReactNode
};

export const AuthProvider: React.FC<Props> = ({ children }): JSX.Element => {
	const { removeItem, setItem } = useLocalStorage();

	const localUser = localStorage.getItem('currentUser');
	const userObject = JSON.parse(localUser || "{}");
	const [user, setUser] = useState<CurrentUser | undefined>(localUser ? new CurrentUser(userObject._id, userObject.username, userObject.email, userObject.display_name, userObject.position, userObject.session_id, userObject.profile_picture, userObject.on_board) : undefined);

	const {data, error} = useFetch<CurrentUser>(
		`${process.env.REACT_APP_USER_URL}/checkAuth`,
		{
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {          
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}
	);

	useEffect(() => {
		if (error) {
			removeItem('currentUser');
			setUser(undefined);
		}

		if (data) {
			setItem("currentUser", JSON.stringify(data));
			setUser(data);
		}
	}, [data, error]);

	// useEffect(() => {
	// 	fetch(`${process.env.REACT_APP_USER_URL}/checkAuth`, {
	// 		method: 'GET',
	// 		mode: 'cors',
	// 		credentials: 'include',
	// 		headers:{
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json'
	// 		}
	// 	}).then(async res => {
	// 		const data = await res.json();
	// 		if (!res.ok) {
	// 			const error = JSON.stringify(data) || JSON.stringify(res);
	// 			throw new Error(error);
	// 		}

	// 		setUser(new CurrentUser(data._id, data.username, data.email, data.session_id, data.profile_picture, data.on_board));

	// 	}).catch(err => {
	// 		try {
	// 			const error = JSON.parse(err.message) || err.message;
	// 			console.log(error)
	// 			if (error.code === 403 || error.code === 401) {
	// 				removeItem('currentUser');
	// 				setUser(undefined);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	});
	// 	// const localUser = getItem('currentUser');
	// 	// if (localUser) {
	// 	// 	const userObject = JSON.parse(localUser || "{}");
	// 	// 	setUser(new CurrentUser(userObject._id, userObject.username, userObject.email, userObject.session_id, userObject.profile_picture, userObject.on_board));
	// 	// } else {
	// 	// 	console.log("no local user found");
	// 	// 	setUser(undefined);
	// 	// }
	// }, [user?.id])

	const setUserData = (data: CurrentUser | undefined) => {
		setUser(data);
	}

	const contextValue = useMemo(
		() => ({
			user,
			setUserData,
		}),
		[user]
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}