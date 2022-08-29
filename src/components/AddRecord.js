import { Input } from "postcss";
import { useRef, useState } from "react";
import Profile from "./Profile";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { addDoc, arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import firebaseInstance from "../FirebaseConfig";
import ShowCreditDetails from "./ShowCreditDetails";

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
    const [tranxId, setTranxId] = useState("");
    const [shouldShowCreditDetails, setShouldShowCD] = useState(false);
    const [isCreditByOrg, setIsCreditByOrg] = useState()

    //Repayment section
    const [rTransId,setRTransId] = useState();
    const [rAmt, setRAmt] = useState();
    const [rNote, setRNote] = useState();
    const [transData, setTransData] = useState();//will be passed to ShowCreditDetails

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
                    setTranxId(docRef.id);
                    setAmount((old)=>"");
                    setTerm((old)=>"");
                    setInterest((old)=>"");
                    setNote((old)=>"");
                    showToast("Credit Record Has Been Added Successfully");
                    saveToUserProfile(docRef.id);
                },
                (reasonForFailure)=>{
                    console.log(reasonForFailure);
                }
            );
        }
        
    };

    const addRepaymentRecord = ()=>{
        if(rAmt < 1){
            showToast("You should enter a valid amount");
        }else{
            //update repayment object
            let currTime = Date.now().toString();
            let repaymentObject = {};
            repaymentObject[currTime] = {
                amount : rAmt,
                note : rNote
            }
            //insert into list of transaction object
            transData.repaymentHistory.push(repaymentObject);
            setDoc(doc(db, "/credits_tranx",rTransId), transData).then(
                ()=>{
                    setRAmt("");
                    setRNote("");
                    showToast("Repayment Has Been Added Successfully");
                },
                (err)=>{
                    showToast("Something went wrong - "+err)
                }
            );
        }
    };

    const saveToUserProfile = (TrnsID)=>{
        let userRef = doc(db, "/users", bvn);
        updateDoc(userRef, {
            transactions: arrayUnion(TrnsID) 
        })
    }

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
        <div className="md:m-8 rounded-md bg-white md:p-10 flex flex-col">
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
            <div className="text-3xl font-semibold text-green-800 mb-5">Add Credit Record</div>
            <div className="w-full items-center flex flex-col">
                <input type={"number"} value={bvn} onChange={(e)=> {setBvn((oldV)=>e.target.value); setSP(false); setUserDetails()}} name="bvn"  
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
                    {tranxId && (
                        <div className="text-2xl text-indigo-900 font-semibold font-mono text-center items-center">
                            {tranxId}
                            <sub className="text-sm text-black"> (for the last recorded credit)</sub>
                        </div>
                    )}
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
                            <input type={"text"} value={rTransId} onChange={(e)=>{setRTransId(e.target.value); setShouldShowCD(false);}} onBlur={(e)=>setShouldShowCD(true)}
                                placeholder="Transaction ID" className="border border-orange-300  bg-gray-100 h-12 m-3  p-3"/>

                            {shouldShowCreditDetails && (
                                <ShowCreditDetails
                                    transId={rTransId}
                                    setIsCreditByOrg={setIsCreditByOrg}
                                    orgId={getOrganizationId}
                                    showToast={showToast}
                                    transData={transData}
                                    setTransData={setTransData}
                                    setShouldShowCD={setShouldShowCD}
                                    />
                            )}
                            {(isCreditByOrg === false) && (
                                <div className="text">The Credit ID You entered is not signed by your organization. Therefore you are not authorized to edit it</div>
                            )}

                            <input type={"number"} value={rAmt} onChange={(e)=>setRAmt(e.target.value)}
                                placeholder="Amount" className="border border-orange-300  bg-gray-100 h-12 m-3  p-3"/>
                            <textarea rows={5} value={rNote} onChange={(e)=>setRNote(e.target.value)} 
                                placeholder="Note" className="border border-orange-300  bg-gray-100 m-2  p-3"/>
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