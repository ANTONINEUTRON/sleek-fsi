import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Outlet,Link, useNavigate } from "react-router-dom";
import AddRecord from "../components/AddRecord";

export default function Dashboard(){
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={< AddRecord/>}/>
            </Routes>
            <Outlet />
        </div>
    );
}