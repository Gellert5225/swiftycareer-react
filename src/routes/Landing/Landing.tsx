import { useContext } from 'react';
import NavBar from '../../components/NavBar/NavBar'
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate } from 'react-router-dom';

const Landing = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	if (user) return <Navigate to="/feed" />

	return (
		<>
			 <NavBar />
		</>
	);
}

export default Landing;