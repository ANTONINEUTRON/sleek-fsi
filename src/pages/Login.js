import { Link } from "react-router-dom";

export default function Login(){
    return (
        <div className="ml-48 mr-48 mt-3 pb-40 p-7 bg-white rounded-md">
            <div className="flex flex-col items-center">
                SafeA Logo
            </div>
            <div className="flex flex-col p-auto text-5xl text-green-800 text-center">
                Login
            </div>
            <div className="flex flex-col text-2xl text-center">
                Sign in to the Organization's Node
            </div>
            <div className="flex flex-col mt-4">
                <label for="org_id">Organization ID</label>
                <input type={"text"} name="org_id" className="border border-orange-300  bg-gray-300 h-12 m-3 p-2" placeholder="Enter Organization ID"/>
                <label for="password">Private Key</label>
                <input type={"password"} name="key"  className="border border-orange-300  bg-gray-300 h-12 m-3 p-2" placeholder="Enter private key"/>
                <input type={"submit"} className="bg-green-800 rounded-md ml-10 mr-10 mt-10 font-bold m-auto text-white p-3 hover:bg-green-600"/>

                <Link to={"/recover-credentials"} className="text-green-800 text-xl m-auto mt-6">Recover Credentials</Link>
            </div>
        </div>
    );
}