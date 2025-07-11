// export const Sendmoney = function(){
//     return <div>
//         <div className="h-screen flex justify-center bg-slate-300">
//             <div className="bg-green-200 w-100 h-max mt-70 flex justify-center border rounded-lg">
//                 {/* <div className="font-bold text-2xl">
//                     SEND MONEY
//                 </div> */}
//                 <Heading label></Heading>
//                 <div className="">
//                     friend name
//                 </div>
//             </div>
//         </div>
//     </div>
// }

// import axios from "axios";
// import { Heading } from "../components/Heading"
// import { useSearchParams } from "react-router-dom";
// import { useState } from "react";


// export const Sendmoney = function () {

//     const [searchParams] = useSearchParams();
//     const id = searchParams.get("id");
//     const name = searchParams.get("name");

//     const [amount, setAmount] = useState(0);
//     const [msg, setmsg] = useState("");


//     return <div className="bg-slate-200 h-screen flex justify-center">
//         <div className="flex flex-col justify-center">
//             <div className="bg-white w-80 h-max text-center rounded-lg px-4 p-2">

//                 <Heading label={"SEND MONEY"}></Heading>

//                 <div className="p-4">
//                     <div className="font-medium text-xl">
//                         <h2>{name}</h2>
//                     </div>

//                     <div className="mt-4">
//                         <input onChange={function(e){
//                             setAmount(e.target.value);
//                         }} type="number" placeholder="Enter Amount in Rs" />
//                     </div>

//                     <div className="rounded-lg bg-black text-white mt-4 w-50 ml-6 ">
//                         <button onClick={function () {
//                             axios.post("http://localhost:3000/api/v1/account/transfer", {
//                                 to : id,
//                                 amount
//                             },{
//                                 headers : {
//                                     Authorization : "Bearer " + localStorage.getItem("token")
//                                 }
//                             })
//                             setmsg("transfer successfull")
//                         }}>
//                             Initiate Transfer
//                         </button>
//                         <div>
//                             {msg}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// }

import axios from "axios";
import { Heading } from "../components/Heading";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const Sendmoney = function () {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    const [amount, setAmount] = useState(0);
    const [msg, setMsg] = useState("");

    // ✅ Function to handle the transfer
    const handleTransfer = async () => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            setMsg("Error: User not authenticated.");
            return;
        }

        try {
            // ✅ Wait for the transfer request to complete
            await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMsg("✅ Transfer successful! 🎉"); // ✅ Set success message

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setMsg("❌ Transfer failed. Please try again.");
        }
    };

    return (
        <div className="bg-slate-200 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white w-80 h-max text-center rounded-lg px-4 p-2">

                    <Heading label={"SEND MONEY"} />

                    <div className="p-4">
                        <div className="font-medium text-xl">
                            <h2>{name}</h2>
                        </div>

                        <div className="mt-4">
                            <input
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                placeholder="Enter Amount in Rs"
                                className="border p-2 w-full"
                            />
                        </div>

                        <div className="rounded-lg bg-black text-white mt-4 w-full p-2">
                            <button onClick={handleTransfer} className="w-full">
                                Initiate Transfer
                            </button>
                        </div>

                        {/* ✅ Show success or error message */}
                        {msg && (
                            <div className={`mt-4 text-lg font-semibold ${
                                msg.includes("✅") ? "text-green-600" : "text-red-600"
                            }`}>
                                {msg}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
