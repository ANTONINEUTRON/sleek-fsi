import { Input } from "postcss";
import { useRef, useState } from "react";
import Profile from "./Profile";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function AddRecord(){
    const [bvn, setBvn] = useState("");
    const [userDetails, setUserDetails] = useState();
    const [actionType, setActionType] = useState("new_credit");
    const [showProfile, setSP] = useState(false);

    const fetchBVNDetails = ()=>{
        if(bvn.length > 9){
            setSP(true);
        }else{
            showToast("Invalid BVN was entered");
        }
    }

    const addNewCreditRecord = ()=>{

    }

    const addRepaymentRecord = ()=>{

    } 

    const showToast = (msg)=>{
        toast(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }

    return (
        <div className="m-8 rounded-md bg-white p-10 flex flex-col">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            <div className="w-full items-center flex flex-col">
                <div className="text-lg mr-6 font-semibold">Enter BVN of the user</div>
                <input type={"number"} value={bvn} onChange={(e)=> {setBvn((oldV)=>e.target.value); setSP(false)}} name="bvn"  
                    className="border border-orange-300  bg-gray-300 h-12 m-3 mr-8 ml-8 p-2 w-72 hover:bg-gray-200" placeholder="Enter BVN"/>
                <button onClick={(e)=>{fetchBVNDetails()}}
                    className="font-bold text-lg text-white bg-green-900 p-3 rounded-lg hover:bg-green-700">
                    Fetch BVN Details
                </button>
                {showProfile && (
                    <div>
                        <Profile 
                            userDetails={userDetails}
                            setUserDetails={setUserDetails}
                            bvn={bvn}
                            showToast={showToast}
                            />
                    </div>
                )}
            </div>
            {userDetails && (
                <div className="m-5 bg-gray-50 rounded-lg p-3 shadow-xl flex flex-col mt-5">
                    <div className="flex flex-row pl-5 mb-5">
                        {/* <label className="text-xl pt-2">Type of Record:</label> */}
                        <select value={actionType} onChange={(e)=> setActionType((oldVal)=>e.target.value)}
                            className="border border-orange-300  bg-gray-200 h-12 w-48 text-xl rounded-lg">
                            <option value={"new_credit"}>New Credit Facility</option>
                            <option value={"repayment"}>Repayment</option>
                        </select>
                    </div>
                    {/* Form to fill loan details will be here. Only when the bvn has been verified will this section show */}

                    {actionType == "new_credit" ? (
                        <div className="flex flex-col">
                            <input type={"number"} placeholder="Amount" className="border border-orange-300  bg-gray-100 h-12 m-3 p-3"/>
                            <div className="flex flex-row m-1">
                                <input type={"number"} max="100" placeholder="Interest (per Annum)" className="border border-orange-300  bg-gray-100 h-12 m-2 p-3"/>
                                <input type={"number"} placeholder="Term (months)" className="border border-orange-300  bg-gray-100 h-12 m-2 p-3"/>
                            </div>
                            <textarea rows={5} placeholder="Note" className="border border-orange-300  bg-gray-100 m-2 p-3"/>
                            <button onClick={addNewCreditRecord()} className="bg-green-900 text-white hover:bg-green-700 h-12 m-5 rounded-lg text-lg">
                                Submit Record
                            </button>
                        </div>
                    ):(
                        <div className="flex flex-col">
                            <input type={"text"} placeholder="Transaction ID" className="border border-orange-300  bg-gray-100 h-12 m-3  p-3"/>
                            <input type={"number"} placeholder="Amount" className="border border-orange-300  bg-gray-100 h-12 m-3  p-3"/>
                            <textarea rows={5} placeholder="Note" className="border border-orange-300  bg-gray-100 m-2  p-3"/>
                            <button onClick={addRepaymentRecord()} className="bg-green-900 text-white hover:bg-green-700 h-12 m-5 rounded-lg text-lg">
                                Submit Record
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}