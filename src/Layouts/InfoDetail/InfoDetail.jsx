import "./InfoDetail.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { LogoutOutlined } from '@ant-design/icons';
import axios from "axios";
import { AuthContext } from "../../Components/Authentication/Authenticate";

function InfoDetail() {
  const { setToken,userData } = useContext(AuthContext);
  //careful with auth
  const logOutApi = async () =>{
    const token = localStorage.getItem("token")
    try{
      const response = await fetch("https://projectprintmachine-backend.onrender.com/auth/logout",{
        method: "POST",
        header:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token:token
        })
      })
      if(!response.ok){
        throw new Error("Unable to delete token")
      
      }
    else{
      alert("logout")
    }
    }catch(error){
      console.log("Logout token failed",error)
    }
  }

  const handleLogout = ()=>{
    //logout api

    logOutApi();
    localStorage.removeItem("token");
    setToken(null);

  }
    // check data tí xóa
    console.log("user data in info site",userData);

    if (!userData) {
      return <div>No user data available.</div>;
    }
  return (
    <div className="infodetail">
      {!(userData?.result.role ==="admin") ? (
        <ul>
          <p>Thông tin sinh viên</p>
          <hr className="custom-hr" />
          <li>Họ tên: {userData?.result.firstname} {userData?.result.lastname} {userData?.result.username}</li>
          <li>MSSV: {userData?.result.mssv}</li>
          <li>Khoa: {userData?.result.role}</li>
          <li>Lớp: {userData?.class}</li>
          <li>Số trang còn lại: {userData?.page}</li>
          <li>Số dư BK pay: {userData?.money}</li>
        </ul>
        
      ) : (
        <ul>
          <p>Thông tin quản lí</p>
          <hr className="custom-hr" />
          <li>Họ tên: {userData?.name}</li>
          <li>Mã số: {userData?.ID}</li>
          <li>Chức vụ: {userData?.role}</li>
          <li>Email: {userData?.email}</li>
          <li>Điện thoại: {userData?.phone}</li>
        </ul>
      )}
      <div className="buttons-container">
      {!userData?.admin && ( 
          <button className="buy">
            <NavLink to='/payment'>Mua thêm</NavLink>
          </button>
        )}
        <button className="exit">
          <NavLink to='/login'
          onClick={handleLogout}>
            <LogoutOutlined style={{ marginRight: 14 }} />
            Thoát
          </NavLink>
        </button>
      </div>
    </div>
  );

  
  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://6720b2f898bbb4d93ca593f3.mockapi.io/api/userInfoS/1');
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div className="infodetail">
  //     <ul>
  //       <p>Thông tin sinh viên</p>
  //       <hr className="custom-hr" />
  //       <li>Họ tên: {userData.name}</li>
  //       <li>MSSV: {userData.studentID}</li>
  //       <li>Khoa: {userData.faculty}</li>
  //       <li>Lớp: {userData.class}</li>
  //       <li>Số trang còn lại: {userData.remainingPages}</li>
  //       <li>Số dư BK pay: {userData.bkPayBalance}</li>
  //     </ul>
  //     <div className="buttons-container">
  //       <button className="buy"><NavLink to='/payment'>Mua thêm</NavLink></button>
  //       <button className="exit">
          
  //         <NavLink to='/login'>
  //           <LogoutOutlined style={{ marginRight: 14 }} />
  //           Thoát
  //         </NavLink>
  //       </button>
  //     </div>
  //   </div>
  // );
}
export default InfoDetail;
