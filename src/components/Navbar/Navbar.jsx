import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuUsers, LuMenu, LuSettings, LuLogOut, LuClipboardList} from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";

// Navbar recibe props isCollapsed y setIsCollapsed del componente padre (MainLayout)
const Navbar = ({ isCollapsed, setIsCollapsed }) => {
    const [isFineDropdownOpen, setIsFineDropdownOpen] = useState(false);
    const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
    const [resource, setResource] = useState('');

   
    // Función para manejar el clic en el botón de hamburguesa
    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside
            className={`bg-primary text-white p-4 flex flex-col items-start shadow-lg fixed h-screen top-0 left-0 z-50 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            {/* Contenedor del logo y el botón de colapsar/expandir */}
            <div className={`flex items-center w-full ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                {/* Título que se oculta cuando el menú está colapsado */}
                <div className={`text-xl font-bold mb-8 flex items-center ${isCollapsed ? 'hidden' : 'block'}`}>
                    Fines System
                </div>
                {/* Botón de la hamburguesa para cambiar el estado */}
                <button
                    onClick={handleToggle}
                    className="text-xl text-white mb-8"
                >
                    <LuMenu size={24} />
                </button>
            </div>
    
            {/* Menú de navegación */}
            <nav className="w-full">
                <ul>
                    {/* Cada item del menú */}
                    <li className="mb-2 group">
                        <NavLink 
                        to="/" 
                        onClick={
                            () => {
                                setResource("")
                                setIsFineDropdownOpen(false)
                            }
                        }
                        className={({isActive}) =>
                            `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-navbar font-semibold border-l-2 border-navbar-active' : 'hover:bg-navbar-hover'}`
                        } end>
                            <MdDashboard className="w-5 h-5 mr-2"/>

                            <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100 block'}`}>Dashboard</span>
                        
                        </NavLink>
                    </li>
                    <li className="mb-2 group">
                        <NavLink to="/usuarios" className={({isActive}) =>
                            `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-navbar font-semibold border-l-2 border-navbar-active' : 'hover:bg-navbar-hover'}`
                        }>
                            <LuUsers className="w-5 h-5 mr-2" />
                            <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100 block'}`}>Gestionar Usuarios</span>
                        </NavLink>
                    </li>
                    {/**Multas dropdown */}
                    <li className="mb-2 group">
                        <div
                            onClick={() => setIsFineDropdownOpen(!isFineDropdownOpen)}
                            className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-navbar-hover transition-colors duration-200 ${resource === "multas" && 'border-l-2 border-navbar-active bg-navbar font-semibold'}`}
                        >
                            <RiFileListLine className="w-5 h-5 mr-2" />
                            <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100 block'}`}>Gestionar Multas</span>
                        </div>

                        {!isCollapsed && isFineDropdownOpen && (
                            <ul className="flex  flex-col pt-2 pl-4 pr-4 gap-2">
                                <li>
                                <NavLink 
                                to="/multas" 
                                onClick={
                                    () => {
                                        setResource("multas")
                                        setIsFineDropdownOpen(false)
                                    }
                                }
                                className={({isActive}) =>
                                    `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-navbar font-semibold' : 'hover:bg-navbar-hover'}`
                                }>
                                        <LuClipboardList className="w-5 h-5 mr-2" />
                                        <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100 block'}`}>Multas</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                    to="/boletas" 
                                    onClick={
                                        () => {
                                            setResource("multas")
                                            setIsFineDropdownOpen(false)
                                        }
                                    }                                  
                                    className={({isActive}) =>
                                        `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-navbar font-semibold' : 'hover:bg-navbar-active'}`
                                }>
                                    <LuClipboardList className="w-5 h-5 mr-2" />
                                        <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100 block'}`}>Talonarios</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="mb-2 group">
                        <NavLink to="/configuracion" className={({isActive}) =>
                            `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-navbar font-semibold border-l-2 border-bg-navbar-active' : 'hover:bg-navbar-hover'}`
                        }>
                            <LuSettings className="w-5 h-5 mr-2" />
                            <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100 block'}`}>Configuración</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            
            {/* Sección de usuario que se oculta al colapsar el menú */}
            <div className={`mt-auto w-full transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100 block'}`}>
                <div className="text-sm font-light text-gray-400">wlopezguerrra2000@gmail.com</div>
                <button className="text-sm font-light text-red-400 mt-2 hover:text-red-500 transition-colors duration-200">
                    <LuLogOut className="inline-block mr-1" size={14}/>
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}

export default Navbar;
