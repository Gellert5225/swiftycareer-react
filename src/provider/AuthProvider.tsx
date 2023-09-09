import { useEffect, useState, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContext } from "../context/AuthContext";
import { User } from '../data/User'
import { json } from "stream/consumers";

type Props = {
  children?: React.ReactNode
};

export const AuthProvider: React.FC<Props> = ({children}): JSX.Element => {
	const { getItem } = useLocalStorage();
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const localUser = getItem('currentUser');
		if (localUser) {
			const userObject = JSON.parse(localUser || "{}");
			setUser(new User(userObject._id, userObject.username, userObject.email, userObject.sessionId));
		}
	}, [user?.id])


	return (
    <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
  );
}