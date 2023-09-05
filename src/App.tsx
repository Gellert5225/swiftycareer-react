import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import './App.css';
import Landing from './routes/Landing/Landing';

function App() {
	const navigate = useNavigate();
	useEffect(() => {
		console.log(document.cookie);
		fetch(`http://${process.env.REACT_APP_SERVER_URL}/feeds`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(async res => {
			const data = await res.json();

			console.log(data);

			if (!res.ok) {
					const error = data || res;
					return Promise.reject(error);
			}

			navigate('/feed');
		}).catch(err => {
			console.error(err);
		});
	}, []);

  return (
    <div className="App">
	  	<Landing />
    </div>
  );
}

export default App;
