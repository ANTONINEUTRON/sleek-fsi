export default function Login(){
    return (
        <div className="ml-36 mr-36 mt-3 p-7 bg-white rounded-md">
            <div className="flex flex-col items-center">
                Logo
            </div>
            <div className="flex flex-col mt-4">
                <label for="org_id">Organization ID</label>
                <input type={"text"} name="org_id"/>
                <label for="password">Password</label>
                <input type={"password"} name="org_id"/>
                <input type={"submit"} className="bg-blue-600 rounded-lg ml-25 mr-25 w-24 mt-10 text-bold m-auto text-white p-3"/>
            </div>
        </div>
    );
}