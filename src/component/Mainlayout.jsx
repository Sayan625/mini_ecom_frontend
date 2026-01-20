import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
    return (
        <div className="d-flex flex-column h-100 p-0">
            <div className="flex-shrink-0 d-flex justify-content-center mb-2">
                 <Navbar />
            </div>

            <div className="flex-grow-1 overflow-auto">
                <Outlet />
            </div>

        </div>
    );
}
