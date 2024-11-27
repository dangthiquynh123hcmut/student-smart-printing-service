import { NavLink } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FolderOutlined,
  UploadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./Print.css";
import ChosenPrinter from "./ChosenPrinter";

function Print() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [uploadTriggered, setUploadTriggered] = useState(false);
  const [formData, setFormData] = useState({
    printCopies: 1,
    scale: 100,
    pagesPerSheet: 1,
    paperSize: "A4",
    printType: "In trắng đen",
    orientation: "In dọc",
    layout: "1",
    coSo: "CS1", // New field
    toaNha: "A1", // New field
    tang: "Tầng 1",
  });
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Chuyển đổi đối tượng FileList thành mảng
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Thêm tệp mới vào mảng
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove)); // Xóa tệp khỏi mảng
  };

  const handleUpload = async () => {
    const uploadData = {
      files: files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      })),
    };
    try {
      const response = await axios.post(
        "https://671d178809103098807c3d9c.mockapi.io/api/uploadfiles",
        uploadData
      );
      setUploadTriggered("true");
      alert("Tải lên thành công: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Đã xảy ra lỗi khi tải lên: ", error);
      alert("Tải lên thất bại");
    }
  };

  useEffect(() => {
    async function fetchFiles() {
      if (uploadTriggered) {
        try {
          const response = await axios.get(
            "https://671d178809103098807c3d9c.mockapi.io/api/uploadfiles"
          );
          const lastFile = response.data[response.data.length - 1]; // Get only the last element
          setFiles([lastFile]);
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      }
    }
    fetchFiles();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Submit configuration to MockAPI
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file to configure.");
      return;
    }

    const configurationData = {
      fileId: selectedFile,
      ...formData,
    };

    try {
      await axios.post(
        "https://671d178809103098807c3d9c.mockapi.io/api/configureFiles",
        configurationData
      );
      alert("Configuration saved successfully!");
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Failed to save configuration.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // Thêm tệp được kéo thả vào mảng
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định
  };

  return (
    <div id="wrapper0">
      <div id="header">
        <NavLink to="/">&larr; Trở về trang chủ</NavLink>
        <h1>In ấn</h1>
      </div>

      <div className="file-upload-container">
        {/* Phần header phía trên */}
        <div className="file-upload-header">
          <div className="file-image">
            <FolderOutlined style={{ fontSize: "24px", color: "#000" }} />
            <h2>Tải tập tin</h2>
          </div>
          <div className="file-actions">
            <label className="file-choose-button">
              Chọn tệp
              <input
                type="file"
                multiple // Cho phép chọn nhiều tệp
                onChange={handleFileChange}
                style={{ display: "none" }} // Ẩn nút input file
              />
            </label>
            <button
              onClick={handleUpload}
              className="upload-button"
              disabled={files.length === 0} // Chỉ kích hoạt nút khi đã chọn tệp
            >
              Tải lên
            </button>
          </div>
        </div>

        {/* Phần khung kéo thả phía dưới */}
        <div
          className="file-dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <UploadOutlined style={{ fontSize: "24px", color: "#08c" }} />
          {files.length > 0 ? (
            <div className="file-info">
              {files.map((file) => (
                <div key={file.name} className="file-item">
                  <span>{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(file)}
                    style={{
                      marginLeft: "10px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Kéo thả tệp tin vào đây hoặc chọn tệp ở trên</p>
          )}
        </div>
      </div>

      <div className="file-upload-container">
        <div className="file-upload-header">
          <div className="file-image">
            <SettingOutlined style={{ fontSize: "24px", color: "#000" }} />
            <h2>Cấu hình in</h2>
          </div>
        </div>

        <div id="wrapper1">
          {/* Dropdown to select file */}
          <div className="chooseFile">
            <label>
              Chọn file để in
              <select
                className="node"
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
              >
                <option value="">Select a file</option>
                {files.map((file) => (
                  <option key={file.id} value={file.id}>
                    {file.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Configuration form */}
          <div className="input-group">
            <div className="quantity-input-container">
              <label className="quantity-input-label">Số lượng bản in</label>
              <input
                type="number"
                name="printCopies"
                value={formData.printCopies}
                onChange={handleInputChange}
                className="quantity-input"
              />
            </div>
            <div className="quantity-input-container">
              <label className="quantity-input-label">Tỉ lệ</label>
              <input
                type="number"
                name="scale"
                value={formData.scale}
                onChange={handleInputChange}
                className="quantity-input"
              />
            </div>
            <div className="quantity-input-container">
              <label className="quantity-input-label">Số trang mỗi tờ</label>
              <input
                type="number"
                name="pagesPerSheet"
                value={formData.pagesPerSheet}
                onChange={handleInputChange}
                className="quantity-input"
              />
            </div>
          </div>

          {/* Additional configuration fields */}
          <div className="input-group">
            <div className="quantity-input-container">
              <label>Kích thước trang</label>
              <select
                name="paperSize" // Add this attribute
                className="node"
                value={formData.paperSize}
                onChange={handleInputChange}
              >
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="A2">A2</option>
              </select>
            </div>

            <div className="quantity-input-container">
              <label>Kiểu in</label>
              <select
                name="printType"
                className="node"
                value={formData.printType}
                onChange={handleInputChange}
              >
                <option value="In trắng đen">In trắng đen</option>
                <option value="In màu nhám">In màu nhám</option>
                <option value="In màu bóng">In màu bóng</option>
              </select>
            </div>
            <div className="quantity-input-container">
              <label>Hướng giấy</label>
              <select
                name="orientation"
                className="node"
                value={formData.orientation}
                onChange={handleInputChange}
              >
                <option value="In dọc">In dọc</option>
                <option value="In ngang">In ngang</option>
              </select>
            </div>
          </div>

          {/* Layout selection */}
          <div className="input-group1">
            <p style={{ marginRight: "10px" }}>Bố cục</p>
            <label>
              <input
                type="radio"
                name="layout"
                value="1"
                checked={formData.layout === "1"}
                onChange={handleInputChange}
              />
              Chân dung
            </label>
            <label>
              <input
                type="radio"
                name="layout"
                value="2"
                checked={formData.layout === "2"}
                onChange={handleInputChange}
              />
              Toàn cảnh
            </label>
          </div>
        </div>
      </div>

      <ChosenPrinter />
      
    </div>
  );
}

export default Print;
