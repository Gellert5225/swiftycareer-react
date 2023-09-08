import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContext } from "../context/AuthContext";
import { User } from '../data/User'

type Props = {
  children?: React.ReactNode
};

export const AuthProvider: React.FC<Props> = ({children}): JSX.Element => {
	const { getItem } = useLocalStorage();
	const [user, setUser] = useState(new User());
	useEffect(() => {
		
  }, []);

	return (
    <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
  );
}