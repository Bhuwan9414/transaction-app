import axios from "axios";
import { Button } from "./Button";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
// import { User } from "../../../backend/db";

export function Users() {


    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")

    useEffect(function () {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(function (response) {
                setUsers(response.data.users)
            })
    }, [filter])

    return <div>
        <div className="font-bold mt-6  text-xl">
            USERS
        </div>
        <div className="my-2 mt-4">
            <input className="w-full px-2 py-1 border rounded border-slate-200" type="text" placeholder="Search" onChange={function (e) {
                setFilter(e.target.value)
            }} />
        </div>
        <div>
            {users.map(user => <User user={user} ></User>)}
        </div>
    </div>
}


function User({ user }) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-5 mr-4">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full mt-2">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                // navigate("/send?id=" + user._id + "&name=" + user.firstname);
                navigate("/sendmoney")
            }} label={"Send Money"} />
        </div>
    </div>
}





