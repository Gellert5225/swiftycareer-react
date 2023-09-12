import { createContext } from "react";
import { CurrentUser } from '../data/User'

interface AuthContext {
  user: CurrentUser | undefined;
}

export const AuthContext = createContext<AuthContext>({
  user: undefined
});
