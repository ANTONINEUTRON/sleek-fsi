import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import firebaseInstance from "../FirebaseConfig";

export default function RowsOfTransaction({listOfTransactions, showToast}){
    const isFirst = useRef(true);
    const [listOfTransDetails, setLOTD] = useState([]);
    // {//Sample object being stored
    //     date : "",
    //     type: "",
    //     orgId: "",
    //     amt: "",
    //     note: ""
    // }

    const db = getFirestore(firebaseInstance);

    useEffect(
        ()=>{
            if(isFirst.current){
                isFirst.current = false;

                for(let i=0; i<listOfTransactions.length; i++){
                    let transID = listOfTransactions[i];
                    //access firestore and fetch document
                    getDoc(doc(db, "credits_tranx",transID))
                        .then(
                            (docSnap)=>{
                                if(docSnap.exists()){
                                    let d = docSnap.data();
                                    let objToInsert = {};
                                    objToInsert.date = getDateFromTimestamp(d.date);
                                    objToInsert.type = "Credit Provided";
                                    objToInsert.orgId = d.orgId;
                                    objToInsert.amt = parseInt(d.amount).toLocaleString('en-US');
                                    objToInsert.note = d.note;

                                    setLOTD((oldVal)=>[...oldVal, objToInsert]);

                                    //loop through repayment history and add
                                    for (var item in objToInsert.repaymentHistory) {
                                        let rObj = {};
                                        //get date
                                        rObj.date = getDateFromTimestamp(Object.keys(item)[0])
                                        rObj.type = "Repayment Made";
                                        rObj.orgId = d.orgId;
                                        rObj.amt = parseInt(item[Object.keys(item)[0]].amount).toLocaleString('en-US');
                                        rObj.note = item[Object.keys(item)[0]].note;

                                        setLOTD((oldVal)=>[...oldVal, rObj]);
                                    }
                                }else{
                                    console.log("couldn't find data for ",transID);
                                }
                            },
                            (err)=>{
                                showToast("Issue Occured While Accessing Transaction "+err);
                            }
                        );
                }
                
                sortListOfTransactionsObject();
            }
        },
        []
    );

    const getDateFromTimestamp = (timeStamp)=>{
        let date = new Date(parseInt(timeStamp));
        return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    }

    const sortListOfTransactionsObject = ()=>{
        listOfTransDetails.sort((a,b)=>(a.date > b.date) ? 1 : -1);
        setLOTD((oldVal)=>[...oldVal]);
    }

    return (
        <tbody>
            {listOfTransDetails.length > 0 && listOfTransDetails.map((item, index)=>(
                <tr>
                    <td className="border">{item.date}</td>
                    <td className="border">{item.type}</td>
                    <td className="border">{item.orgId}</td>
                    <td className="border">{item.amt}</td>
                    <td className="border">{item.note}</td>
                </tr>
            ))}
        </tbody>
    );
}