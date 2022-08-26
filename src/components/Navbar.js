import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [orgName, setOrgName] = useState("ORG NAME");
    const navigateTo = useNavigate();

    useEffect(
        ()=>{
            let orgData = JSON.parse(sessionStorage.getItem("orgData"));
            if(orgData){
                setOrgName(orgData.name);
            }
        }, []
    );

    const logout = ()=>{
        sessionStorage.setItem("orgData",null);
        setTimeout(() => {
            navigateTo("/login",{replace: true});
        }, 1000);
    }

    return (
        <>
        <nav className="relative flex flex-wrap items-center fixed-top static-top justify-between px-2 py-3 bg-indigo-100 text-black mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <Link
                className="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-green-700"
                to={"/"}
                >
                    {orgName}
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
                "lg:flex  flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
                }
            >
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item hover:text-orange-900">
                    <Link to={"/add-record"} className="px-3 py-2 flex items-center mx-3 uppercase font-bold leading-snug lg:only:underline">
                        {/* <FontAwesomeIcon icon={faBookJournalWhills} className="text-xl mr-2"/> */}
                        Records
                    </Link>
                </li>
                <li className="nav-item hover:text-orange-900">
                    <Link to={"/performance"} className="px-3 py-2 mr-3 flex items-center uppercase font-bold leading-snug lg:underline">
                        {/* <FontAwesomeIcon icon={faSection} className="text-xl mr-2"/> */}
                        Performance
                    </Link>
                </li>
                <li className="nav-item hover:text-orange-900">
                    <Link to={"/performance"} className="px-3 py-2 flex items-center uppercase font-bold leading-snug lg:underline">
                        {/* <FontAwesomeIcon icon={faSection} className="text-xl mr-2"/> */}
                        Guide
                    </Link>
                </li>
                <li>
                    <button onClick={(event)=>logout(event)}  className="px-3 py-2 flex items-center mx-3 text-2xl uppercase font-bold leading-snug text-orange-900">
                    
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