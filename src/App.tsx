import './App.css';
import Landing from './routes/Landing/Landing';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FeedPage from './routes/Feed/FeedPage'
import { AuthProvider } from './provider/AuthProvider'
import Layout from "./layouts/layout";
import JobPage from './routes/Job/JobPage';
import OnBoarding from './routes/OnBoarding/OnBoarding';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
			{ path: "/onboarding", element: <OnBoarding /> },
      { path: "/feed", element: <FeedPage /> },
			{ path: "/job", element: <JobPage /> },
    ]
  }
]);

function App() {
  return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
  );
}

export default App;
