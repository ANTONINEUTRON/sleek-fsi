import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Record(){
    const [bvn, setBvn] = useState("");
    const navigateTo = useNavigate()

    const fetchRecord = (event)=>{
        postNibssEndpoint();//Ping FSI server

        if(bvn.length < 9){
            showToast("You entered an invalid BVN")
        }else{
            showToast("Loading BVN Details");
            //Navigate to BVN Details page
            navigateTo("/record-details", {state: {dBvn: bvn}});
        }
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
        <div>
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
            <div className="bg-white flex flex-col md:w-3/4 p-12 pl-10 pr-10 m-auto rounded-lg mt-10">
                <input type={"number"} value={bvn} onChange={(e)=> {setBvn((oldV)=>e.target.value)}} name="bvn"  
                    className="border border-orange-300  bg-gray-300 h-12 m-3 mr-8 ml-8 p-2 hover:bg-gray-200" placeholder="Enter BVN"/>
                <input type={"button"} onClick={(e)=>fetchRecord(e)} value="Fetch Credit History" 
                    className="mt-8 font-bold text-xl bg-green-800 text-white p-2 rounded-md ml-8 mr-8"/>
                <Link to={"/add-record"} 
                    className="font-bold text-center text-xl bg-green-50 text-green-900 p-3 rounded-md ml-8 mr-8 mt-20 border border-orange-500">
                    <FontAwesomeIcon icon={faAdd} />
                    Add New Record
                </Link>
            </div>

        </div>
    );
}