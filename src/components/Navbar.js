import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
    const [navbarOpen, setNavbarOpen] = useState(false);
    const logout = ()=>{
        
    }

    return (
        <>
        <nav className="relative flex flex-wrap items-center fixed-top static-top justify-between px-2 py-3 bg-indigo-500 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <Link
                className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                to={"/"}
                >
                Company Name
                </Link>
                <button
                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
                >
                <FontAwesomeIcon icon={faBars}/>
                </button>
            </div>
            <div
                className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
                }
            >
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                    <Link to={"/add-record"} className="px-3 py-2 flex items-center mx-3 text-xs uppercase font-bold leading-snug text-white hover:opacity-75 lg:only:border">
                        {/* <FontAwesomeIcon icon={faBookJournalWhills} className="text-xl mr-2"/> */}
                        Add Record
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/performance"} className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 lg:border">
                        {/* <FontAwesomeIcon icon={faSection} className="text-xl mr-2"/> */}
                        Performance
                    </Link>
                </li>
                <li>
                    <button onClick={(event)=>logout(event)}  className="px-3 py-2 flex items-center mx-3 text-2xl uppercase font-bold leading-snug text-red-200 hover:opacity-75">
                    
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                    </button>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        </>
    );
}