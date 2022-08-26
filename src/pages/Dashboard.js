import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Outlet,Link, useNavigate } from "react-router-dom";
import AddRecord from "../components/AddRecord";
import { useEffect, useState } from "react";

export default function Dashboard(){
    const navigateTo = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    // useEffect(
    //     ()=>{
    //         let orgData = JSON.parse(sessionStorage.getItem("orgData"));
    //         if(!orgData){//if null is returned
    //             setTimeout(() => {
    //                 navigateTo("/login",{replace: true});
    //             }, 1000);
    //         }
    //     }, []
    // );
    return (
        <div>
            {isLogin && (<Navbar />)}
            <Routes>
                {isLogin && (<Route path="/" element={< AddRecord/>}/>)}
            </Routes>
            <Outlet />
        </div>
    );
}