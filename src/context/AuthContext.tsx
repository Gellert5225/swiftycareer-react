import { createContext } from "react";
import { CurrentUser } from '../data/User'

interface AuthContext {
  user: CurrentUser | undefined;
	setUserData: (data: CurrentUser) => void
}

export const AuthContext = createContext<AuthContext>({
  user: undefined,
	setUserData: () => {},
});
