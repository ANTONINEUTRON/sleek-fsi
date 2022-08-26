import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RecordDetails(){
    return (
        <div className="p-5">
            <div className="text-lg font-bold text-green-900">
                <button className="mr-3">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                Bvn Number
            </div>
            <div className="bg-white rounded-md m-8 p-5">
                Details to be shown here
            </div>
        </div>

    );
}