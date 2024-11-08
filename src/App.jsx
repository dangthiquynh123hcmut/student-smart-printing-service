import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
//fetch api
import axios from "./api/axiosConfig";
//
import React, { useState, useEffect } from "react";
// pages
import Home from "./Components/HomePage/Home";
import Print from "./Components/PrintPage/Print";
import History from "./Components/HistoryPage/History";
import LoginForm from "./Components/LoginForm/LoginForm";
import Payment from "./Components/Payment/Payment";
import Printers from "./Components/Admin/Printers/Printers"
import CreateReport from "./Components/ReportPage/CreateReport/CreateReport";
import OldReport from "./Components/ReportPage/OldReport/OldReport";
//authenticate
// layouts
import RootLayout from "./Layouts/RootLayout";
import RegisterPage from "./Components/RegisterForm/Register";
// import UserInfo from "./Layouts/UserInfo";

function PrivateRoute({ children, token }) {
  return token ? children : <Navigate to="/login" />;
}
function App() {
  const [userData, setUserData] = useState(null); // State to store user data

  const token = localStorage.getItem("token");
  if (token) {
      // Kiểm tra tính hợp lệ của token hoặc thực hiện xác minh nếu cần
      // Ví dụ: Gửi request lên backend để xác minh
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/login"
          element={
            <LoginForm
              setUserData={setUserData}
            />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<RootLayout userData={userData} />}>
          <Route
            index
            element={
              <PrivateRoute token={token}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="print"
            element={
              <PrivateRoute token={token}>
                <Print />
              </PrivateRoute>
            }
          />
          <Route
            path="history"
            element={
              <PrivateRoute token={token}>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="payment"
            element={
              <PrivateRoute token={token}>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="printers"
            element={
              <PrivateRoute token={token}>
                <Printers />
              </PrivateRoute>
            }
          />

          <Route
            path="createReport"
            element={
              <PrivateRoute token={token}>
                <CreateReport/>
              </PrivateRoute>
            }
          />
          <Route
            path="oldReport"
            element={
              <PrivateRoute token={token}>
                <OldReport/>
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
