import './App.css';
import Landing from './routes/Landing/Landing';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from './routes/Feed/Feed'
import { AuthProvider } from './provider/AuthProvider'
import { useEffect } from 'react';

function App() {
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

		}).catch(err => {
			console.error(err);
		});
	}, []);

  return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Landing />} />
					<Route path="feed" element={<Feed />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
  );
}

export default App;
