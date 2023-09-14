import { useContext } from 'react';
import NavBar from '../../components/NavBar/NavBar'
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from 'react-router-dom';

const Landing = () => {
	const { user } = useContext(AuthContext);

	if (user) return <Navigate to="/feed" />

	return (
		<>
			 <NavBar />
			 <div>This is landing page</div>
		</>
	);
}

export default Landing;