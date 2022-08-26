import { useState } from "react";


export default function AddRecord(){
    const [bvn, setBvn] = useState();
    
    return (
        <div>
            <div className="bg-white flex flex-col w-3/4 p-12 pl-10 pr-10 m-auto rounded-lg mt-10">
            <input type={"text"} value={bvn} onChange={(e)=> {setBvn((oldV)=>e.target.value)}} name="bvn"  
                className="border border-orange-300  bg-gray-300 h-12 m-3 mr-8 ml-8 p-2 hover:bg-gray-200" placeholder="Enter BVN"/>
            <input type={"button"} value="Fetch Credit History" className="mt-8 font-bold text-xl bg-green-800 text-white p-2 rounded-md ml-8 mr-8"/>
            <button className="mt-8 font-bold text-xl bg-green-50 text-green-900 p-3 rounded-md ml-8 mr-8 mt-20 border border-orange-500">
                Add New Record
            </button>
            </div>

        </div>
    );
}