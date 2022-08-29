import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Profile";
import RowsOfTransaction from "./RowsOfTransaction";

export default function RecordDetails(){
    const [userDetails, setUserDetails] = useState();
    const {state} = useLocation();
    const {dBvn} = state;
    const [userBvn, setUserBvn] = useState(dBvn);

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
        <div className="md:p-5">
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
            <Link to={"/records"} className="text-lg font-bold text-green-900">
                <button className="mr-3">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                {userBvn}
            </Link>
            <div className="bg-white rounded-md md:m-8 md:p-5">
                <Profile 
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    bvn = {userBvn}
                    showToast={showToast}
                    />

                <div className="flex flex-col justify-between">
                    <div className="text-green-800 font-bold text-3xl mt-7">
                        Credit History
                    </div>
                    {(userDetails && userDetails.transactions.length < 1) ? (
                        <div className="text-3xl font-bold text-center m-5">No transaction found</div>
                    ) : (
                        <table className="table-auto border">
                            <tr className="border">
                                <th className="border">Date</th>
                                <th className="border">Type</th>
                                <th className="border">Institution ID</th>
                                <th className="border">Amount</th>
                                <th className="border">Note</th>
                            </tr>
                            {userDetails && (<RowsOfTransaction 
                                listOfTransactions={userDetails.transactions}
                                />)}
                        </table>
                    )}
                    
                </div>
            </div>
        </div>

    );
}