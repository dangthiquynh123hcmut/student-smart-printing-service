import React, { useState, useEffect } from "react";
import {
  FolderOutlined,
  UploadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { uploadFile, getAllFile, deleteFile } from "../../api/studentApi";
import { Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./File.css";

function File() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // Giá trị số trang
  const [size, setSize] = useState(10); // Giá trị kích thước trang
  const [totalFiles, setTotalFiles] = useState(0); // Tổng số file
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchFiles = async () => {
    try {
      const pageReal = page - 1;
      const data = await getAllFile(token, pageReal, size);
      setTotalFiles(data.totalElements);
      setTotalPage(data.totalPages);
      setUploadedFiles(Array.isArray(data.content) ? data.content : []);
    } catch (error) {
      console.error("Không thể lấy danh sách file:", error);
      setUploadedFiles([]);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [token, page, size]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    setFiles(selectedFiles);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredFiles = uploadedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery)
  );

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);

    for (const file of files) {
      try {
        const response = await uploadFile(token, file);
        console.log(`File ${file.name} uploaded successfully:`, response);
        await fetchFiles(); // Gọi lại API sau khi upload thành công
      } catch (error) {
        console.error(`Failed to upload file ${file.name}:`, error);
      }
    }

    setUploading(false);
    setFiles([]);
  };

  const handleDeleteFile = (fileId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa file này không?",
      okText: "Có",
      cancelText: "Không",
      onOk: async () => {
        try {
          const response = await deleteFile(token, fileId);
          notification.success({
            message: "Delete SUCCESS",
            description: "File đã được xóa thành công.",
          });
          await fetchFiles(); // Gọi lại API sau khi xóa
        } catch (error) {
          notification.error({
            message: "Delete FAILED",
            description: "Không thể xóa file. Vui lòng thử lại.",
          });
        }
      },
      onCancel: () => {
        console.log("Hủy xóa file");
      },
    });
  };

  const handlePrintFile = (file) => {
    console.log("In file:", file);
    navigate("/print", { state: { file } });
  };

  return (
    <div>
      <div className="header-file">
        <NavLink to="/">&larr; Trở về trang chủ</NavLink>
        <h1>Tập tin</h1>
      </div>
      <div className="file-upload-container">
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
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
            <button
              onClick={handleUpload}
              className="upload-button"
              disabled={
                !Array.isArray(files) || files.length === 0 || uploading
              }
            >
              {uploading ? "Đang tải lên..." : "Tải lên"}
            </button>
          </div>
        </div>

        <div
          className="file-dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <UploadOutlined style={{ fontSize: "24px", color: "#08c" }} />
          {Array.isArray(files) && files.length > 0 ? (
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
      <div className="uploaded-files">
        <h2>Danh sách file đã tải lên</h2>

        <div className="file-container">
          <div className="search-container">
            <div className="search-input-wrapper">
              <SearchOutlined className="search-icon" />
              <input 
                type="text"
                placeholder="Tìm kiếm file theo tên"
                value={searchQuery}
                onChange={handleSearchChange}
                 className="search-input-file"
              />
            </div>
          </div>

          <div className="file-infomation">
            <div className="general-information">
              <h4>Tổng file tải lên: {totalFiles}</h4>
              <h4>Tổng số trang: {totalPage}</h4>
            </div>
            
            <div className="pagination-controls">
              <label>
                Trang thứ:{" "}
                <input
                  type="number"
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                  className="pagination-input"
                />
              </label>
              <label>
                Kích thước:{" "}
                <input
                  type="number"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="pagination-input"
                />
              </label>
            </div>
          </div>

          {filteredFiles.length > 0 ? (
            <table className="file-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên tệp</th>
                  <th>Kích thước (KB)</th>
                  <th>Ngày tải lên</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file, index) => (
                  <tr key={file.id}>
                    <td>{(index + 1) + (page-1)*size}</td>
                    <td>{file.name}</td>
                    <td>{(file.fileSize / 1024).toFixed(2)}</td>
                    <td>{new Date(file.uploadDate).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className="action-button delete-button"
                      >
                        Xóa file
                      </button>
                      <button
                        onClick={() => handlePrintFile(file)}
                        className="action-button print-button"
                      >
                        In tài liệu
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không tìm thấy file nào khớp với lựa chọn.</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default File;
