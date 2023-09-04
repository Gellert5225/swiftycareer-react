import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Landing from './routes/Landing/Landing';

function App() {
	const navigate = useNavigate();
	useEffect(() => {
		console.log(document.cookie);
		fetch(`http://${process.env.REACT_APP_SERVER_URL}/feeds`, {
			method: 'GET',
			mode: 'cors',
			headers:{          
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(async res => {
			const isJson = res.headers.get('content-type')?.includes('application/json');
			const data = isJson && await res.json();

			console.log(data)

			if (!res.ok) {
					const error = (data && data.error) || res.status;
					return Promise.reject(error);
			}

			navigate('/feed');
		}).catch(error => {
			console.error('There was an error!', error);
		});
	});

  return (
    <div className="App">
	  	<Landing />
    </div>
  );
}

export default App;
