import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import firebaseInstance from "../FirebaseConfig";


export default function ShowCreditDetails({transId, setIsCreditByOrg, showToast, orgId, transData, setTransData, setShouldShowCD}){
    const db = getFirestore(firebaseInstance);
    const isFirstRun = useRef(true);

    useEffect(
        ()=>{
            if(isFirstRun.current){
                isFirstRun.current = false;
                getDoc(doc(db, "/credits_tranx",transId))
                    .then(
                        (docSnap)=>{
                            if(docSnap.exists()){
                                console.log()
                                let tranxData = docSnap.data();
                                if(orgId){
                                    let organizationId = orgId();
                                    if(tranxData.orgId === organizationId){
                                        setIsCreditByOrg(true);
                                        setTransData(docSnap.data());
                                    }else{
                                        setIsCreditByOrg(false);
                                    }
                                }else{
                                    setTransData(docSnap.data())
                                }
                            }else {
                                // doc.data() will be undefined in this case
                                showToast("No Details For The Transaction ID was Found");
                                setShouldShowCD(false);
                            }
                        },
                        (err)=>{
                            console.log("Couldn't get transaction details: ")
                        }
                    );
            }
        },
        []
    );

    const getDateFromTimestamp = (timeStamp)=>{
        let date = new Date(parseInt(timeStamp));
        return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    }

    return (
        <div>
            {transData && (
                <div className="flex flex-col m-3 rounded-lg shadow-lg bg-green-50 text-black p-2">
                    <div className="flex flex-row justify-between">
                        <span><b>User ID: </b> {transData.userId}</span>
                        <span><b>Date: </b> {getDateFromTimestamp(transData.date)}</span>
                    </div>
                    <div className="flex flex-row justify-between m-4">
                        <span><b>Principal/Amount: </b> {parseInt(transData.amount).toLocaleString('en-US')} NGN</span>
                        <span><b>Interest (per Annum): </b> {transData.interest}%</span>
                        <span><b>Term: </b> {transData.term} months</span>
                    </div>
                    <div className="ml-5">
                        <b>Notes: </b> {transData.note}
                    </div>
                    <div className="flex flex-col m-4">
                        <span className="text-2xl text-green-900 mb-2">Repayments</span>
                        {(transData.repaymentHistory.length > 0) ? (
                            <table className="table-auto">
                                <thead>
                                    <tr className="border">
                                        <th className="border">Date</th>
                                        <th className="border">Amount</th>
                                        <th className="border">Note</th>
                                    </tr>
                                </thead>
                                <tbody className="border">
                                {transData.repaymentHistory.map(
                                    (item, index)=>(
                                        <tr>
                                            {/* The Date */}
                                            <td className="border">{getDateFromTimestamp(Object.keys(item)[0])}</td>
                                            {/* The Amount  */}
                                            <td className="border">{parseInt(item[Object.keys(item)[0]].amount).toLocaleString('en-US')}</td>
                                            {/* The Note of repayment */}
                                            <td className="border">{item[Object.keys(item)[0]].note}</td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                No Repayment Has Been Made For This Credit
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}