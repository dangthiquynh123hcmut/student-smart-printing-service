import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
//fetch api
//
import React, { useState, useEffect, useContext } from "react";
// pages
import Home from "./Components/HomePage/Home";
import Print from "./Components/PrintPage/Print";
import History from "./Components/HistoryPage/History";
import LoginForm from "./Components/LoginForm/LoginForm";
import Payment from "./Components/Payment/Payment";
import Printers from "./Components/Admin/Printers/Printers"
import CreateReport from "./Components/ReportPage/CreateReport/CreateReport";
import OldReport from "./Components/ReportPage/OldReport/OldReport";
import AdHome from "./Components/Admin/AdHome/AdHome"
import Configuration from "./Components/Admin/Configuration/Configuration"
import PriceSetting from "./Components/Admin/PriceSetting/PriceSetting"
// import UpdateUser from "./Components/updateUser/updateUser";
//authenticate
import { AuthContext } from "./Components/Authentication/Authenticate";
//decode token
import { decodeToken } from "react-jwt";
// layouts
import RootLayout from "./Layouts/RootLayout";
import RegisterPage from "./Components/RegisterForm/Register";
// import UserInfo from "./Layouts/UserInfo";


function PrivateRoute({ children, token }) {
  if(!token) return <Navigate to="/login" />
  const currentTime = Date.now(); // Current time in milliseconds
  const timeOut= decodeToken(token)
  console.log("timeout",timeOut.exp)
  console.log("time current", Date.now())
  console.log(token)
  const timeUntilExpiry = timeOut.exp - currentTime/1000;
  console.log("time remain",timeUntilExpiry)
  return timeUntilExpiry > 0 ? children : <Navigate to="/login" />


  // return token ? children : <Navigate to="/login" />;
}
function App() {
  // const [userData, setUserData] = useState(null); // State to store user data
  // const [token, setToken] = useState(null);

  const { token, userData,setToken } = useContext(AuthContext);
  // const { isExpired,reEvaluateToken} = useJwt(token)
  // console.log(token);


  // remember authentication
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/login"
          element={
            <LoginForm
              
            />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/" element={<RootLayout />}> */}
          {/* <Route
            index
            element={
              <PrivateRoute token={token} >
                {<Home />}
              </PrivateRoute>
            }
          /> */}
          <Route path="/" element={<RootLayout userData={userData} />}>
          <Route
            index
            element={
              <PrivateRoute token={token}>
                {userData?.result.role === "ADMIN" ? <AdHome /> : <Home />}
              </PrivateRoute>
            }
          />
          <Route
            path="print"
            element={
              <PrivateRoute token={token} >
                <Print />
              </PrivateRoute>
            }
          />

          <Route
            path="history"
            element={
              <PrivateRoute token={token} >
                <History />
              </PrivateRoute>
            }
          />
        
          <Route
            path="payment"
            element={
              <PrivateRoute token={token} >
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="printers"
            element={
              <PrivateRoute token={token} >
                <Printers />
              </PrivateRoute>
            }
          />
            {/* <Route
            path="updateUser"
            element={
              <PrivateRoute token={token} >
                <UpdateUser />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="createReport"
            element={
              <PrivateRoute token={token} >
                <CreateReport/>
              </PrivateRoute>
            }
          />
          <Route
            path="oldReport"
            element={
              <PrivateRoute token={token} >
                <OldReport/>
              </PrivateRoute>
            }
          />
            {/* <Route
            path="adHome"
            element={
              <PrivateRoute token={token} >
                <AdHome/>
              </PrivateRoute>
            }
          /> */}
          <Route
            path="configuration"
            element={
              <PrivateRoute token={token} >
                <Configuration/>
              </PrivateRoute>
            }
          />
          <Route
            path="price-setting"
            element={
              <PrivateRoute token={token} >
                <PriceSetting/>
              </PrivateRoute>
            }
          />

        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
