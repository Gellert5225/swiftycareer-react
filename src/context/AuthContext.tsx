import { createContext } from "react";
import { User } from '../data/User'

interface AuthContext {
  user: User | undefined;
}

export const AuthContext = createContext<AuthContext>({
  user: undefined
});
