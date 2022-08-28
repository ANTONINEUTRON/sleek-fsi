import { Input } from "postcss";
import { useRef, useState } from "react";
import Profile from "./Profile";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseInstance from "../FirebaseConfig";

const emptyCreditObject = {
    amount : 0,
    term : 0, 
    orgId : "",
    userId : "",
    interest: 0,
    repaymentHistory : [],
    note : "",
    date : Date.now()
}
export default function AddRecord(){
    const [bvn, setBvn] = useState(null);
    const [amount, setAmount]  = useState(null);
    const [term, setTerm] = useState(null);
    const [interest, setInterest] = useState(null);
    const [note, setNote] = useState(null);
    const [userDetails, setUserDetails] = useState();
    const [actionType, setActionType] = useState("new_credit");
    const [showProfile, setSP] = useState(false);
    const [creditObj, setCreditObj] = useState(emptyCreditObject);

    const db = getFirestore(firebaseInstance);

    const fetchBVNDetails = ()=>{
        if(bvn.length > 9){
            setSP(true);
        }else{
            showToast("Invalid BVN was entered");
        }
    };

    const addNewCreditRecord = ()=>{
        //validate input
        if(amount < 1000){
            showToast("You can't lend less than 1000 NGN");
            return;
        }else if(term < 1){
            showToast("The term should be atleast 1 month");
            return
        }else{
            //set input values
            emptyCreditObject.amount = amount;
            emptyCreditObject.term = term;
            emptyCreditObject.interest = interest;
            emptyCreditObject.note = note;
            emptyCreditObject.userId = bvn;
            emptyCreditObject.orgId = getOrganizationId();

            //save to db
            addDoc(collection(db, "/credits_tranx"), creditObj).then(
                (docRef)=>{
                    setAmount((old)=>"");
                    setTerm((old)=>"");
                    setInterest((old)=>"");
                    setNote((old)=>"");
                    showToast("Credit Record Has Been Added Successfully");
                },
                (reasonForFailure)=>{
                    console.log(reasonForFailure);
                }
            );
        }
        
    };

    const addRepaymentRecord = ()=>{

    };

    const getOrganizationId = ()=>{
        let orgObj = JSON.parse(sessionStorage.getItem("orgData"));
        return orgObj.id;
    };

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
    };

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
                <div className="text-lg mr-6 font-semibold">Enter the BVN of the user</div>
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
                            <input type={"number"} placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} className="border border-orange-300  bg-gray-100 h-12 m-3 p-3"/>
                            <div className="flex flex-row m-1">
                                <input type={"number"} max="100" placeholder="Interest (per Annum)" value={interest} onChange={(e)=>setInterest(e.target.value)} className="border border-orange-300  bg-gray-100 h-12 m-2 p-3"/>
                                <input type={"number"} placeholder="Term (months)" value={term} onChange={(e)=>setTerm(e.target.value)} className="border border-orange-300  bg-gray-100 h-12 m-2 p-3"/>
                            </div>
                            <textarea rows={5} placeholder="Note (collaterals provided, fees, and other obligations attached to this credit)" value={note} onChange={(e)=>setNote(e.target.value)} className="border border-orange-300  bg-gray-100 m-2 p-3"/>
                            <button onClick={(e)=>{addNewCreditRecord()}} className="bg-green-900 text-white hover:bg-green-700 h-12 m-5 rounded-lg text-lg">
                                Submit Record
                            </button>
                        </div>
                    ):(
                        <div className="flex flex-col">
                            <input type={"text"} placeholder="Transaction ID" className="border border-orange-300  bg-gray-100 h-12 m-3  p-3"/>
                            <input type={"number"} placeholder="Amount" className="border border-orange-300  bg-gray-100 h-12 m-3  p-3"/>
                            <textarea rows={5} placeholder="Note" className="border border-orange-300  bg-gray-100 m-2  p-3"/>
                            <button onClick={(e)=>{addRepaymentRecord()}} className="bg-green-900 text-white hover:bg-green-700 h-12 m-5 rounded-lg text-lg">
                                Submit Record
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}