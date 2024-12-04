// import { NavLink } from "react-router-dom";
// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import {

//   SettingOutlined,
// } from "@ant-design/icons";
// import "./Print.css";
// import ChosenPrinter from "./ChosenPrinter";
// import File from "../File/File";

// function Print() {
//   const [files, setFiles] = useState([]);
//   const [selectedFile, setSelectedFile] = useState("");
//   const [uploadTriggered, setUploadTriggered] = useState(false);
//   const [formData, setFormData] = useState({
//     copiesNum: 1,
//     typeOfPage: "A4Page",
//     printColor: "true",
//     sideOfPage: "false"
//   });
//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files); // Chuyển đổi đối tượng FileList thành mảng
//     setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Thêm tệp mới vào mảng
//   };

//   const handleRemoveFile = (fileToRemove) => {
//     setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove)); // Xóa tệp khỏi mảng
//   };

//   useEffect(() => {
//     async function fetchFiles() {
//       if (uploadTriggered) {
//         try {
//           const response = await axios.get(
//             "https://671d178809103098807c3d9c.mockapi.io/api/uploadfiles"
//           );
//           const lastFile = response.data[response.data.length - 1]; // Get only the last element
//           setFiles([lastFile]);
//         } catch (error) {
//           console.error("Error fetching files:", error);
//         }
//       }
//     }
//     fetchFiles();
//   }, []);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   // Submit configuration to MockAPI
//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       alert("Please select a file to configure.");
//       return;
//     }

//     const configurationData = {
//       fileId: selectedFile,
//       ...formData,
//     };

//     try {
//       await axios.post(
//         "https://671d178809103098807c3d9c.mockapi.io/api/configureFiles",
//         configurationData
//       );
//       alert("Configuration saved successfully!");
//     } catch (error) {
//       console.error("Error saving configuration:", error);
//       alert("Failed to save configuration.");
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const droppedFiles = Array.from(event.dataTransfer.files);
//     setFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // Thêm tệp được kéo thả vào mảng
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault(); // Ngăn chặn hành vi mặc định
//   };

//   return (
//     <div id="wrapper0">
//       <div id="header">
//         <NavLink to="/">&larr; Trở về trang chủ</NavLink>
//         <h1>In ấn</h1>
//       </div>

//       <div className="file-upload-container">
//         <div className="file-upload-header">
//           <div className="file-image">
//             <SettingOutlined style={{ fontSize: "24px", color: "#000" }} />
//             <h2>Cấu hình in</h2>
//           </div>
//         </div>

//         <div id="wrapper1">
//           {/* Dropdown to select file */}
//           <div className="chooseFile">

//           </div>

//           {/* Configuration form */}
//           <div className="input-group">
//             <div className="quantity-input-container">
//               <label className="quantity-input-label">Số lượng bản in</label>
//               <input
//                 type="number"
//                 name="copiesNum"
//                 value={formData.copiesNum}
//                 onChange={handleInputChange}
//                 className="quantity-input"
//               />
//             </div>
//             <div className="quantity-input-container">
//               <label>Kích thước trang</label>
//               <select
//                 name="typeOfPage" // Add this attribute
//                 className="node"
//                 value={formData.typeOfPage}
//                 onChange={handleInputChange}
//               >
//                 <option value="A0Page">A0</option>
//                 <option value="A1Page">A1</option>
//                 <option value="A2Page">A2</option>
//                 <option value="A3Page">A3</option>
//                 <option value="A4Page">A4</option>
//                 <option value="A5Page">A5</option>
//               </select>
//             </div>
//           </div>

//           {/* Additional configuration fields */}
//           <div className="input-group">
//             <div className="quantity-input-container">
//               <label>Kiểu in</label>
//               <select
//                 name="printType"
//                 className="node"
//                 value={formData.printType}
//                 onChange={handleInputChange}
//               >
//                 <option value="false">In 1 mặt</option>
//                 <option value="true">In 2 mặt</option>

//               </select>
//             </div>
//             <div className="quantity-input-container">
//               <label>Loại in</label>
//               <select
//                 name="printColor"
//                 className="node"
//                 value={formData.printColor}
//                 onChange={handleInputChange}
//               >
//                 <option value="true">In màu</option>
//                 <option value="false">In đen trắng</option>
//               </select>
//             </div>
//           </div>

//         </div>
//       </div>

//       <ChosenPrinter />

//     </div>
//   );
// }
// export default Print;

import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SettingOutlined } from "@ant-design/icons";
import "./Print.css";
import ChosenPrinter from "./ChosenPrinter";
import { useLocation, useNavigate } from "react-router-dom";
import { implementPrint } from "../../api/studentApi";
import { notification } from "antd";
import { AuthContext } from "../Authentication/Authenticate";
import { useContext } from "react";


function Print() {
  const [files, setFiles] = useState([]);
  const [file1, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [uploadTriggered, setUploadTriggered] = useState(false);
  const [selectedPrinterId, setSelectedPrinterId] = useState(null);
  const { userData } = useContext(AuthContext);

  const handlePrinterSelect = (idPrinter) => {
    setSelectedPrinterId(idPrinter);
    console.log("Selected Printer ID:", idPrinter); // Xử lý hoặc sử dụng `idPrinter` tại đây
  };
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    copiesNum: 1,
    typeOfPage: "A4Page",
    printColor: "true",
    sideOfPage: "false",
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null); // Xóa file đã chọn
    navigate("/file"); // Điều hướng lại sang trang File
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
   const userId = userData.result.id;
   console.log("user data", userData)

  const handleSubmit = async () => {
    if (!file) {
      notification.success({
        message: "Bạn vui lòng chọn máy in và tài liệu cần in trước",
        // description: `Bạn đã chọn máy in: ${printer.name}`,
  
        placement: "topRight", // Vị trí hiển thị thông báo
      });
      return;
    }

    const printData = {
      idUser: userId, 
      idPrinter: selectedPrinterId, 
      idFile: file.id, 
      copiesNum: formData.copiesNum,
      typeOfPage: formData.typeOfPage,
      printColor: formData.printColor,
      sideOfPage: formData.sideOfPage,
    };

    try {
      console.log("printData", printData)
      const response = await implementPrint(printData, token); // Gọi API
      // console.log("In tập tin thành công:", response);
      // alert("In tập tin thành công!");
      notification.success({
        message: response,
        // description: `Bạn đã chọn máy in: ${printer.name}`,
  
        placement: "topRight", // Vị trí hiển thị thông báo
      });

    } catch (error) {
      console.error("Lỗi khi in tập tin:", error);
      // alert("Không thể in tập tin. Vui lòng thử lại!");
      notification.error({
        message: "Error",
        description: error.message || "Something went wrong",
        placement: "topRight",
      });
      
    }
  };

  return (
    <div id="wrapper0">
      <div id="header">
        <NavLink to="/">&larr; Trở về trang chủ</NavLink>
        <h1>In ấn</h1>
      </div>
      <ChosenPrinter onPrinterSelect={handlePrinterSelect} />
      {/* {selectedPrinterId && <p>Máy in đã chọn có ID: {selectedPrinterId}</p>} */}

      <div className="file-upload-container">
        <div className="file-upload-header">
          <div className="file-image">
            <SettingOutlined style={{ fontSize: "24px", color: "#000" }} />
            <h2>Cấu hình in</h2>
          </div>
        </div>

        <div id="wrapper1">
          <div className="choosen-file">
            {file ? (
              <div className="file-info">
                <p>
                  <strong>Tên file in:</strong> {file.name}
                </p>

                <p>
                  <strong>Kích thước:</strong>{" "}
                  {(file.fileSize / 1024).toFixed(2)} KB
                </p>

                <button onClick={handleRemoveFile} className="remove-button">
                  X
                </button>
              </div>
            ) : (
              <p>Không có file nào được chọn để in.</p>
            )}
          </div>

          <div className="input-group">
            <div className="field-container">
              <label className="form-label">Số lượng bản in</label>
              <input
                type="number"
                name="copiesNum"
                value={formData.copiesNum}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="field-container">
              <label className="form-label">Kích thước trang</label>
              <select
                name="typeOfPage"
                className="form-select"
                value={formData.typeOfPage}
                onChange={handleInputChange}
              >
                <option value="A0Page">A0</option>
                <option value="A1Page">A1</option>
                <option value="A2Page">A2</option>
                <option value="A3Page">A3</option>
                <option value="A4Page">A4</option>
                <option value="A5Page">A5</option>
              </select>
            </div>

            <div className="field-container">
              <label className="form-label">Kiểu in</label>
              <select
                name="printType"
                className="form-select"
                value={formData.printType}
                onChange={handleInputChange}
              >
                <option value="false">In 1 mặt</option>
                <option value="true">In 2 mặt</option>
              </select>
            </div>

            <div className="field-container">
              <label className="form-label">Loại in</label>
              <select
                name="printColor"
                className="form-select"
                value={formData.printColor}
                onChange={handleInputChange}
              >
                <option value="true">In màu</option>
                <option value="false">In đen trắng</option>
              </select>
            </div>
          </div>
          <div className="button-container">
            <button className="send-button" onClick={handleSubmit}>
              In tập tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Print;
