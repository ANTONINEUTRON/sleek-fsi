import {doc, getDoc, getFirestore} from "firebase/firestore";
import fireBaseInstance from "./../FirebaseConfig"
import {useEffect, useRef} from "react"

export default function Profile({userDetails, setUserDetails, bvn, showToast}){
    const db = getFirestore(fireBaseInstance);
    const firstRender = useRef(true);

    useEffect(
        ()=>{
            if(firstRender.current){
                firstRender.current = false;
                try{
                    getDoc(doc(db, "/users", bvn))
                    .then(
                        (docSnap)=>{
                            if (docSnap.exists()) {
                                console.log("Document data:", docSnap.data());
                                setUserDetails((oldVal)=>docSnap.data());
                            } else {
                                // doc.data() will be undefined in this case
                                showToast("No Details For BVN was Found");
                                setUserDetails();
                            }
                        },
                        (reasonForReject)=>{
                            console.log("Reject ", reasonForReject)
                            
                            showToast("No Details For BVN was Found");
                            setUserDetails();
                        }
                    );
                }catch(err){
                    showToast("Couldn't find Details")
                    setUserDetails();
                }
            }
        },
        []
    );

    return (
        <div>
            {userDetails && (
                <div className="flex flex-row">
                <div className="w-36 h-36 ml-5 mr-8 mb-5">
                    Image To Be Shown
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row m-5 justify-between w-full">
                        <span className="mr-3">
                            <b>First Name: </b>{userDetails.FirstName}
                        </span>
                        <span className="mr-3">
                            <b>Last Name: </b>{userDetails.LastName}
                        </span>
                        <span className="mr-3">
                            <b>Middle Name: </b>{userDetails.MiddleName}
                        </span>
                        <span className="mr-3">
                            <b>DOB: </b>{userDetails.DOB}
                        </span>
                    </div>
                    <div className="flex flex-row m-3 justify-between w-full">
                        <span className="mr-3">
                            <b>NIN: </b>{userDetails.NIN}
                        </span>
                        <span className="mr-3">
                            <b>Phone Number: </b>{userDetails.PhoneNumber}
                        </span>
                        <span className="mr-3">
                            <b>Phone Number 2: </b>{userDetails.PhoneNumber2}
                        </span>
                    </div>
                    <div className="flex flex-row m-3 justify-between w-full">
                        
                        <span className="mr-3">
                            <b>Email: </b>{userDetails.Email}
                        </span>
                        <span className="mr-3">
                            <b>Address: </b>{userDetails.Address}
                        </span>
                    </div>
                    <div className="flex flex-row m-3 justify-between w-full">
                        {/* <span className="mr-3">
                            <b>Account Level: </b>{userDetails.LevelOfAccount}
                        </span> */}
                        <span className="mr-3">
                            <b>Income (per Month): </b>{userDetails.income.toLocaleString('en-US')}
                        </span>
                        <span className="mr-3 text-xl text-green-900">
                            <b>Credit Score: </b>{userDetails.CreditScore}
                        </span>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}