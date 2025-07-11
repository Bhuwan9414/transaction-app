// import { useNavigate } from "react-router-dom"
// import { Bottomwarning } from "../components/Bottomwarning"
// import { Button } from "../components/Button"
// import { Heading } from "../components/Heading"
// import { Inputbox } from "../components/Inputbox"
// import { Subheading } from "../components/Subheading"
// import { useState } from "react"
// import axios from "axios";


// export const Signup = function(){

//     const [firstname, setFirstname] = useState("")
//     const [lastname, setLastname] = useState("")
//     const [username, setusername] = useState("")
//     const [password, setPassword] = useState("")
//     const navigate = useNavigate();

//     return <div className="bg-slate-300 h-screen flex justify-center">
//         <div className="flex flex-col justify-center">
//             <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//             <Heading label={"Sign up"}></Heading>
//             <Subheading label={"enter your details to create an account"}></Subheading>
//             <Inputbox placeholder={"john"} label={"First Name"}></Inputbox>
//             <Inputbox placeholder={"Doe"} label={"Last Name"}></Inputbox>
//             <Inputbox placeholder={"xyz@gmail.com"} label={"Email"}></Inputbox>
//             <Inputbox placeholder={"12345"} label={"password"}></Inputbox>

//             <div className="pt-4">
//                 <Button onClick={ async function(){
//                     const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
//                         username,
//                         firstname,
//                         lastname,
//                         password
//                     })
//                     localStorage.setItem("token", response.data.token)
//                     navigate("/dashboard")
//                 }} label={"Sign Up"}>
//                 </Button>
//             </div>
//             {/* <Bottomwarning label={"Already have an account"} buttontext={"Sign In"} to={"/signin"}></Bottomwarning> */}
//             </div>
//         </div>
//     </div>
// }



import { useNavigate } from "react-router-dom";
import { Bottomwarning } from "../components/Bottomwarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { useState } from "react";
import axios from "axios";

export const Signup = function() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <Subheading label={"Enter your details to create an account"} />
                    <Inputbox placeholder={"John"} label={"First Name"}  onChange={(e) => setFirstname(e.target.value)} />
                    <Inputbox placeholder={"Doe"} label={"Last Name"}  onChange={(e) => setLastname(e.target.value)} />
                    <Inputbox placeholder={"xyz@gmail.com"} label={"Email"} onChange={(e) => setUsername(e.target.value)} />
                    <Inputbox placeholder={"12345"} label={"Password"}  onChange={(e) => setPassword(e.target.value)} />

                    <div className="pt-4">
                        <Button onClick={async function() {
                            try {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                    username,
                                    firstname,
                                    lastname,
                                    password
                                });
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard");
                            } catch (error) {
                                console.error("There was an error signing up:", error);
                            }
                        }} label={"Sign Up"} />
                    </div>
                    <Bottomwarning label={"Already have an account"} buttontext={"Sign In"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
}