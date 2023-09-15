import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContext } from "../context/AuthContext";
import { CurrentUser } from '../data/User'

type Props = {
  children?: React.ReactNode
};

export const AuthProvider: React.FC<Props> = ({children}): JSX.Element => {
	const { getItem } = useLocalStorage();
	const [user, setUser] = useState<CurrentUser>();

	useEffect(() => {
		const localUser = getItem('currentUser');
		if (localUser) {
			const userObject = JSON.parse(localUser || "{}");
			console.log('setting user');
			setUser(new CurrentUser(userObject._id, userObject.username, userObject.email, userObject.sessionId, userObject.profile_picture));
		} else {
			console.log("no local user found");
		}
	}, [user?.id])

	const setUserData = (data : CurrentUser) => {
		setUser(data);
	}

	return (
    <AuthContext.Provider value={{user, setUserData}}>{children}</AuthContext.Provider>
  );
}