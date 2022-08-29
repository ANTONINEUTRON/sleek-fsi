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
                                sendSms();
                                setUserDetails((oldVal)=>docSnap.data());
                            } else {
                                // doc.data() will be undefined in this case
                                showToast("No Details For BVN was Found");
                                setUserDetails();
                            }
                        },
                        (reasonForReject)=>{
                            showToast("Error: "+ reasonForReject);
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

    
    const sendSms = ()=>{
        fetch('https://fsi.ng/api/v1/africastalking/version1/messaging',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Sandbox-key': '2I7a8CP4M1wkdU1F9eUS7zsmi98mfDaS1661538618'
            },
            body: {
                "username" : "Safe A",
                "to" : "+2348120534617",
                "message": "Your Account Was Accessed By FaiirMoney"
            } 
        }).then(
            (response)=>{
                showToast("User Notified!");
            },
            (err)=>{
                console.log("Error Ocured ", err);
            }
        )
    }
    
    const postNibssEndpoint = ()=>{
        fetch('https://fsi.ng/api/bvnr/GetSingleBVN', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Sandbox-key': '2I7a8CP4M1wkdU1F9eUS7zsmi98mfDaS1661538618'
            },
            body: '"37643632623062303762326637383430170a00eb8149ee3eda479f57de1bebbd66b6996b75da5a46ab6e8ebebebd5e503ad53ad160791a8189b891ad084c786fb71baa1efa03b6d9cc1cf54c8d43f004"' 
        }).then(
            (response)=>{
                console.log(response);
            },
            (err)=>{
                console.log("ERROR occurred "+err);
            }
        );
    }

    return (
        <div>
            {userDetails && (
                <div className="flex flex-row">
                <div className="md:w-56 md:h-56 md:ml-5 md:mr-8 mb-5">
                    <img src={userDetails.image}  alt="dp" />
                </div>
                <div className="flex flex-col md:w-full">
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
                            <b>DOB: </b>{userDetails.DateOfBirth}
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
                            <b>Income (per Month): </b>{userDetails.income.toLocaleString('en-US')} NGN
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