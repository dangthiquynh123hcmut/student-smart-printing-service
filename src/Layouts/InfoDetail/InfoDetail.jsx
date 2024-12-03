// import "./InfoDetail.css";
// import { NavLink } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
// import { LogoutOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { AuthContext } from "../../Components/Authentication/Authenticate";

// function InfoDetail() {
//   const { setToken, userData } = useContext(AuthContext);
//   const [isEditing, setIsEditing] = useState(false); // Quản lý hiển thị bảng chỉnh sửa
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     mssv: "",
//     birthDate: "",
//     email: "",
//     password: "",
//     username: "",
//   });

//   useEffect(() => {
//     // Gán dữ liệu ban đầu từ userData khi component được mount
//     if (userData) {
//       setFormData({
//         firstName: userData?.result.firstName || "",
//         lastName: userData?.result.lastName || "",
//         mssv: userData?.result.mssv || "",
//         birthDate: userData?.result.birthDate || "",
//         email: userData?.result.email || "",
//         password: "", // Đặt trống cho password mới
//         username: userData?.result.username || "",
//       });
//     }
//   }, [userData]);

//   const handleLogout = () => {
//     logOutApi();
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   const logOutApi = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await fetch("https://projectprintmachine-backend.onrender.com/auth/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           token: token,
//         }),
//       });
//       if (!response.ok) {
//         throw new Error("Unable to delete token");
//       } else {
//         alert("Đã đăng xuất");
//       }
//     } catch (error) {
//       console.error("Logout token failed", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleEditClick = () => {
//     setIsEditing(true); // Hiển thị bảng chỉnh sửa
//   };

//   const handleCancel = () => {
//     setIsEditing(false); // Ẩn bảng chỉnh sửa
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.put(
//         `https://projectprintmachine-backend.onrender.com/users/${userData.result.id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Cập nhật thông tin thành công!");
//         setIsEditing(false); // Ẩn modal chỉnh sửa
//         window.location.reload(); // Tải lại trang để cập nhật thông tin
//       }
//     } catch (error) {
//       console.error("Lỗi khi cập nhật thông tin:", error);
//       alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
//     }
//   };

//   if (!userData) {
//     return <div>No user data available.</div>;
//   }

//   return (
//     <div className="infodetail">
//       {!(userData?.result.role === "ADMIN") ? (
//         <>
//           <ul>
//             <p>Thông tin sinh viên</p>
//             <hr className="custom-hr" />
//             <li>
//               <strong>Họ tên:</strong> {`${userData?.result.firstName} ${userData?.result.lastName}`}
//             </li>
//             <li>
//               <strong>MSSV:</strong> {userData?.result.mssv}
//             </li>
//             <li>
//               <strong>Vai trò:</strong> {userData?.result.role}
//             </li>
//             <li>
//               <strong>Ngày sinh:</strong> {userData?.result.birthDate}
//             </li>
//             <li>
//               <strong>Email:</strong> {userData?.result.email}
//             </li>
//           </ul>
//         </>
//       ) : (
//         <>
//           <ul>
//             <p>Thông tin quản lí</p>
//             <hr className="custom-hr" />
//             <li>
//               <strong>Họ tên:</strong> {userData?.result.username}
//             </li>
//             <li>
//               <strong>Mã số:</strong> {userData?.result.mssv}
//             </li>
//             <li>
//               <strong>Chức vụ:</strong> {userData?.result.role}
//             </li>
//             <li>
//               <strong>Email:</strong> {userData?.result.email}
//             </li>
//           </ul>
//         </>
//       )}

//       <div className="buttons-container">
//         {!(userData?.result.role === "ADMIN") && (
//           <>
//             <button className="buy">
//               <NavLink to="/payment" className="nav-link">
//                 Mua thêm
//               </NavLink>
//             </button>
//             <button className="modification" onClick={handleEditClick}>
//               Chỉnh sửa
//             </button>
//           </>
//         )}

//         {isEditing && (
//           <div className="edit-modal">
//             <div className="edit-modal-content">
//               <h2>Chỉnh sửa thông tin</h2>
//               <form onSubmit={handleSubmit}>
//                 <label>
//                   Họ:
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Tên:
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   MSSV:
//                   <input
//                     type="text"
//                     name="mssv"
//                     value={formData.mssv}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Ngày sinh:
//                   <input
//                     type="date"
//                     name="birthDate"
//                     value={formData.birthDate}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Email:
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Password mới:
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Username:
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//                 <div className="button-group">
//                   <button type="submit" className="submit-button">
//                     Nộp
//                   </button>
//                   <button type="button" className="cancel-button" onClick={handleCancel}>
//                     Hủy
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <button className="exit">
//           <NavLink to="/login" onClick={handleLogout} className="nav-link">
//             <LogoutOutlined style={{ marginRight: 14 }} />
//             Thoát
//           </NavLink>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default InfoDetail;


import "./InfoDetail.css";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import { AuthContext } from "../../Components/Authentication/Authenticate";
//import fetchUserData from "../../Components/Authentication/Authenticate";

function InfoDetail() {
  const { setToken, userData, fetchUserData } = useContext(AuthContext); // Thêm setUserData để cập nhật context
  const [isEditing, setIsEditing] = useState(false); // Quản lý hiển thị bảng chỉnh sửa
  const [formData, setFormData] = useState({
    firstName: userData?.result.firstName || "",
    lastName: userData?.result.lastName || "",
    mssv: userData?.result.mssv || "",
    birthDate: userData?.result.birthDate || "",
    email: userData?.result.email || "",
    password: "",
    username: userData?.result.username || "",
  });

  const handleLogout = () => {
    logOutApi();
    localStorage.removeItem("token");
    setToken(null);
  };

  const logOutApi = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://projectprintmachine-backend.onrender.com/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        throw new Error("Unable to delete token");
      } else {
       // alert("Đã đăng xuất");
      }
    } catch (error) {
      console.error("Logout token failed", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `https://projectprintmachine-backend.onrender.com/users/${userData.result.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Cập nhật thông tin thành công!");
        setIsEditing(false);

        // Cập nhật lại context
         await fetchUserData(); 
        
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    }
  };

  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="infodetail">
      {!(userData?.result.role === "ADMIN") ? (
        <>
          <ul>
            <p>Thông tin sinh viên</p>
            <hr className="custom-hr" />
            <li>
              <strong>Họ tên:</strong> {`${userData?.result.lastName} ${userData?.result.firstName}`}
            </li>
            <li>
              <strong>MSSV:</strong> {userData?.result.mssv}
            </li>
            <li>
              <strong>Vai trò:</strong> {userData?.result.role}
            </li>
            <li>
              <strong>Ngày sinh:</strong> {userData?.result.birthDate}
            </li>
            <li>
              <strong>Email:</strong> {userData?.result.email}
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul>
            <p>Thông tin quản lí</p>
            <hr className="custom-hr" />
            <li>
              <strong>Họ tên:</strong> {userData?.result.username}
            </li>
            <li>
              <strong>Mã số:</strong> {userData?.result.mssv}
            </li>
            <li>
              <strong>Chức vụ:</strong> {userData?.result.role}
            </li>
            <li>
              <strong>Email:</strong> {userData?.result.email}
            </li>
          </ul>
        </>
      )}

      <div className="buttons-container">
        {!(userData?.result.role === "ADMIN") && (
          <>
            <button className="buy">
              <NavLink to="/payment" className="nav-link">
                Mua thêm
              </NavLink>
            </button>
            <button className="modification" onClick={handleEditClick}>
              Chỉnh sửa
            </button>
          </>
        )}

        {isEditing && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h2>Chỉnh sửa thông tin</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Họ:
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Tên:
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  MSSV:
                  <input
                    type="text"
                    name="mssv"
                    value={formData.mssv}
                    onChange={handleInputChange}
                    readOnly
                    className="read-only-input"
                  />
                </label>
                <label>
                  Ngày sinh:
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly
                    className="read-only-input"
                  />
                </label>
                <label>
                  Password mới:
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    readOnly
                    className="read-only-input"
                  />
                </label>
                <div className="button-group">
                  <button type="submit" className="submit-button">
                    Nộp
                  </button>
                  <button type="button" className="cancel-button" onClick={handleCancel}>
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <button className="exit">
          <NavLink to="/login" onClick={handleLogout} className="nav-link">
            <LogoutOutlined style={{ marginRight: 14 }} />
            Thoát
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default InfoDetail;
