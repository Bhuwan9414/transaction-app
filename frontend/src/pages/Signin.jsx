import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import axios from "axios"
import { useState } from "react"
import { Bottomwarning } from "../components/Bottomwarning"

export const Signin = function () {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex  flex-col justify-center">
            <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"}></Heading>
                <Subheading label={"Enter below details to sign in"}></Subheading>
                <Inputbox placeholder={"xyz@gmail.com"} label={"Email"} onChange={function (e) { setUsername(e.target.value) }}></Inputbox>
                <Inputbox placeholder={"12345"} label={"Password"} onChange={function (e) { setPassword(e.target.value) }}></Inputbox>

                <div className="pt-4">
                    <Button onClick={async function () {
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username,
                                password
                            });
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard")
                        } catch (error) {
                            console.error("there is a error signing in", error)
                        }
                    }} label={"Sign In"}></Button>
                </div>

                <Bottomwarning label={"Don't have an account? "} buttontext={"Sign Up"} to={"/signup"}>

                </Bottomwarning>
            </div>
        </div>
    </div>
}