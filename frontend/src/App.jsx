// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Signin } from "./pages/Signin";
// import { Signup } from "./pages/signup";
// import { Dashboard } from "./pages/Dashboard";

// function App(){
//   return (
//     <>
//       <BrowserRouter>
//       <Routes>
//         <Route path="/singup" element = {<Signup/>}></Route>
//         <Route path="/signin" element = {<Signin/>}></Route>
//         <Route path="/dashboard" element = {<Dashboard/>}></Route>
//       </Routes>
//       </BrowserRouter>
//       </>
//   )
// }

// export default App;


import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Sendmoney } from "./pages/Sendmoney";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sendmoney" element={<Sendmoney />} />
        {/* Catch-all route to redirect unknown paths */}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;