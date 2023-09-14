import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export default function Layout() {
  return (
    <div>
      <NavBar />
			<div className="mt-16">
				<Outlet />
			</div>
    </div>
  );
}
