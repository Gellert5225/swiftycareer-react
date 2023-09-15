import { createContext } from "react";
import { CurrentUser } from '../data/User'

interface AuthContextInterface {
  user: CurrentUser | undefined;
	setUserData: (data: CurrentUser) => void
}

export const AuthContext = createContext<AuthContextInterface>({
  user: undefined,
	setUserData: () => {},
});
