import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Profile";

export default function RecordDetails(){
    const [userDetails, setUserDetails] = useState();

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
        <div className="p-5">
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
                Bvn Number
            </Link>
            <div className="bg-white rounded-md m-8 p-5">
                <Profile 
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    bvn = "12345678901"
                    showToast={showToast}
                    />

                <div>
                    <div className="text-green-800 font-bold text-3xl mt-7">
                        Credit History
                    </div>
                    {(userDetails && userDetails.transactions.length < 1) ? (
                        <div className="text-3xl font-bold text-center m-5">No transaction found</div>
                    ) : (
                        <table>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Institution</th>
                                <th>Status</th>
                            </tr>
                        </table>
                    )}
                    
                </div>
            </div>
        </div>

    );
}