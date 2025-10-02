import React, { useState } from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const MainLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className="flex min-h-screen bg-secondary font-sans">
            <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>

            <main className={`flex-1 p-0 overflow-y-auto transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-64'}`}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
