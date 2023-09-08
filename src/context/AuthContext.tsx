import { createContext } from "react";
import { User } from '../data/User'

interface AuthContext {
  user: User | null;
}

export const AuthContext = createContext<AuthContext>({
  user: null
});
