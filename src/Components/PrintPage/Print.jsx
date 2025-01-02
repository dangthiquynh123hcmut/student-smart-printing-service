import { NavLink } from "react-router-dom";
import React, { useState} from "react";
import { SettingOutlined } from "@ant-design/icons";
import "./Print.css";
import ChosenPrinter from "./ChosenPrinter";
import { useLocation, useNavigate } from "react-router-dom";
import { implementPrint } from "../../api/studentApi";
import { notification } from "antd";
import { AuthContext } from "../Authentication/Authenticate";
import { useContext } from "react";


function Print() {
  const [selectedPrinterId, setSelectedPrinterId] = useState(null);
  const { userData } = useContext(AuthContext);

  const handlePrinterSelect = (idPrinter) => {
    setSelectedPrinterId(idPrinter);
    ////console.log("Selected Printer ID:", idPrinter);
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

  const handleRemoveFile = () => {
    navigate("/file"); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
   const userId = userData.result.id;
   ////console.log("user data", userData)

  const handleSubmit = async () => {
    if (!file) {
      notification.success({
        message: "Bạn vui lòng chọn máy in và tài liệu cần in trước",
        placement: "topRight", 
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
      ////console.log("printData", printData)
      const response = await implementPrint(printData, token); 
      ////console.log(response);
      notification.success({
        message: response,
        placement: "topRight",
      });
      if( response==="Print registration successful") navigate("/history"); 

    } catch (error) {
      ////console.error("Lỗi khi in tập tin:", error);
      notification.error({
        message: "Máy in chưa được chọn",
        placement: "topRight",
      });
      
    }
  };

  return (
    <div className="wrapper0">
      <div id="header">
        <NavLink to="/">&larr; Trở về trang chủ</NavLink>
        <h1>In ấn</h1>
      </div>
      <ChosenPrinter onPrinterSelect={handlePrinterSelect} />
      <div className="configure-container">
        <div className="configure-header">
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
