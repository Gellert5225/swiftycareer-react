import './App.css';
import Landing from './routes/Landing/Landing';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FeedPage from './routes/Feed/FeedPage'
import { AuthProvider } from './provider/AuthProvider'
import Layout from "./layouts/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/feed", element: <FeedPage /> },
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
