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
import AdHistory from "./Components/Admin/AdHistory/AdHistory";
import AdHome from "./Components/Admin/AdHome/AdHome"
import Configuration from "./Components/Admin/Configuration/Configuration"
import File from "./Components/File/File";
import Warranty from "./Components/Admin/Warranty/Warranty";
import { UserProfile } from "./Components/Profile/Profile";
import MaterialStorage from "./Components/Admin/Material/Storage/MaterialStorage";
import MaterialHistory from "./Components/Admin/Material/History/MaterialHistory";
import PriceSetting from "./Components/Admin/PriceSetting/PriceSetting"
import CreateStaff from "./Components/Admin/CreateStaff/CreateStaff";
import { UserAdminis } from "./Components/Admin/UserAdminis/UserAdminis";

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
  // console.log("timeout",timeOut.exp)
  // console.log("time current", Date.now())
  console.log(token)
  const timeUntilExpiry = timeOut.exp - currentTime/1000;
  // console.log("time remain",timeUntilExpiry)
  return timeUntilExpiry > 0 ? children : <Navigate to="/login" />

}
function App() {
  

  const { token, userData,setToken } = useContext(AuthContext);
 
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
            path="file"
            element={
              <PrivateRoute token={token} >
                <File />
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
            path="warranty"
            element={
              <PrivateRoute token={token} >
                <Warranty />
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
          <Route
            path="AdHistory"
            element={
              <PrivateRoute token={token} >
                <AdHistory/>
              </PrivateRoute>
            }
          />
          <Route
          path="materialStorage"
          element={
            <PrivateRoute token={token}>
              <MaterialStorage/>
            </PrivateRoute>
          }          
          />

          <Route
          path="materialHistory"
          element={
            <PrivateRoute token={token}>
              <MaterialHistory/>
            </PrivateRoute>
          }          
          />
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
          <Route
            path="user-profile"
            element={
              <PrivateRoute token={token} >
                <UserProfile/>
              </PrivateRoute>
            }
          />

          <Route
            path="user-adminis"
            element={
              <PrivateRoute token={token} >
                <UserAdminis/>
              </PrivateRoute>
            }
          />
           <Route
            path="create-staff"
            element={
              <PrivateRoute token={token} >
                <CreateStaff/>
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
