import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseInstance from "../FirebaseConfig";
import logo from "./../logo/logo.png"

const ORG_IDS = {
    "aaKnXYBBN123gGh":{
        name: "Fairmoney",
        address: "Kimba crescent",
        key: "Axcv45478JSNNJujwj778"
    },
    "HhhtyUkIllBnvdjd":{
        name: "Akcess Bank",
        address: "Konleen crescent",
        key: "KKALkska8892JjHHahnn77V"
    }
};

export default function Login(){
    const [userName, setUsername] = useState("");
    const [pKey, setPKey] = useState("");
    const navigateTo = useNavigate();

    const db = getFirestore(firebaseInstance);

    const processSubmit = (event)=>{
        event.preventDefault();
        if(!userName){//if username is empty
            showToast("organization ID cannot be blank");
            return;
        } 
        if(!pKey){//if private key is not provided
            showToast("Private key cannot be blank");
            return;
        }

        try {
            //fetch credentials from FB
            getDoc(doc(db, "/orgs",userName))
                .then(
                    (docSnap)=>{
                        if (docSnap.exists()) {
                            let orgData = docSnap.data();//an object
                            orgData.id = docSnap.id;
                            if(pKey === orgData.key){
                                showToast("Successfully Signed In");
                                //save credentials to session
                                sessionStorage.setItem("orgData", JSON.stringify(orgData))
                                //Take to new page
                                setTimeout(() => {
                                    navigateTo("/",{replace: true});
                                }, 1000);
                            }else{
                                showToast("Wrong Private Key Was Entered");
                            }
                        } else {
                            // doc.data() will be undefined in this case
                            showToast("No Details For The BVN was Found");
                        }
                    }
                );
        } catch (error) {
            showToast("Something went wrong. Ensure you enter the correct credentials and try again");            
        }
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
        <div className="ml-48 mr-48 mt-3 pb-40 p-7 pl-10 pr-10 bg-white rounded-md">
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
            <div className="flex flex-col items-center mb-5">
                <img src={logo} alt="SafeA Logo"  width="150"/>
            </div>
            <div className="flex flex-col p-auto text-5xl text-green-800 text-center">
                Login
            </div>
            <div className="flex flex-col text-2xl text-center">
                Sign in to the Organization's Node
            </div>
            <div className="flex flex-col mt-4">
                <label for="org_id">Organization ID</label>
                <input type={"text"} name="org_id" value={userName} onChange={(e)=> {setUsername((oldV)=>e.target.value)}} className="border border-orange-300  bg-gray-300 h-12 m-3 p-2 hover:bg-gray-200" placeholder="Enter Organization ID"/>
                <label for="password">Private Key</label>
                <input type={"password"} value={pKey} onChange={(e)=> {setPKey((oldV)=>e.target.value)}} name="key"  className="border border-orange-300  bg-gray-300 h-12 m-3 p-2 hover:bg-gray-200" placeholder="Enter private key"/>
                <input type={"button"} value="Login" onClick={(e)=>processSubmit(e)}
                className="bg-green-800 rounded-md ml-10 mr-10 mt-10 font-bold m-auto text-white p-3 hover:bg-green-600"/>

                <Link to={"/recover-credentials"} className="text-green-800 text-xl m-auto mt-6">Recover Credentials</Link>
            </div>
        </div>
    );
}