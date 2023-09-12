import './App.css';
import Landing from './routes/Landing/Landing';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeedPage from './routes/Feed/FeedPage'
import { AuthProvider } from './provider/AuthProvider'

function App() {
  return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Landing />} />
					<Route path="feed" element={<FeedPage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
  );
}

export default App;
