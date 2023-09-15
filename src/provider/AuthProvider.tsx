import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContext } from "../context/AuthContext";
import { CurrentUser } from '../data/User'

type Props = {
  children?: React.ReactNode
};

export const AuthProvider: React.FC<Props> = ({children}): JSX.Element => {
	const { getItem } = useLocalStorage();

	const localUser = localStorage.getItem('currentUser');
	const userObject = JSON.parse(localUser || "{}");
	const [user, setUser] = useState<CurrentUser | undefined>(localUser ? new CurrentUser(userObject._id, userObject.username, userObject.email, userObject.session_id, userObject.profile_picture) : undefined);

	useEffect(() => {
		const localUser = getItem('currentUser');
		if (localUser) {
			const userObject = JSON.parse(localUser || "{}");
			setUser(new CurrentUser(userObject._id, userObject.username, userObject.email, userObject.session_id, userObject.profile_picture));
		} else {
			console.log("no local user found");
			setUser(undefined);
		}
	}, [user?.id])

	const setUserData = (data : CurrentUser | undefined) => {
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