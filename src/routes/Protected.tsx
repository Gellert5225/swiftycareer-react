import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function ProtectedRoute() {
	const { user } = useContext(AuthContext);
	
	if (user && user.on_board) {
		return (
			<div>
				<NavBar />
				<div className="mt-16">
					<Outlet />
					<ScrollRestoration
						getKey={(location, matches) => {
							return location.pathname;
						}} 
					/>
				</div>
			</div>
		)
	}

	if (user) return <Navigate to="/onboarding" />

	return <Navigate to="/" />
}