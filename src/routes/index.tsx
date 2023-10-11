import { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "./Protected";

import Landing from './Landing/Landing';
import JobPage from './Job/JobPage';
import OnBoarding from './OnBoarding/OnBoarding';
import FeedPage from './Feed/FeedPage'

const Routes = () => {
	const { user } = useContext(AuthContext);

	const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, 
      children: [
				{ path: "/", element: <Landing /> },
				{ path: "/onboarding", element: <OnBoarding /> },
				{ path: "/feed", element: <FeedPage /> },
				{ path: "/job", element: <JobPage /> },
			]
    },
  ];

	const routesForNotOnboardedOnly = [
		{ path: "/onboarding", element: <OnBoarding /> }
	];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    { path: "/", element: <Landing /> },
  ];

	const router = createBrowserRouter([
    ...(!user ? routesForNotAuthenticatedOnly : []),
		...(!user?.on_board ? routesForNotOnboardedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
}

export default Routes;