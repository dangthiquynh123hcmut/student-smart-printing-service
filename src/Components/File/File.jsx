import React, { useState, useEffect } from "react";
import { FolderOutlined, UploadOutlined } from "@ant-design/icons";
import { uploadFile, getAllFile, deleteFile } from "../../api/studentApi";
import { Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./File.css";

function File() {
  const [files, setFiles] = useState([]); // Danh sách các file đã chọn
  const [uploading, setUploading] = useState(false); // Trạng thái tải lên
  const [uploadedFiles, setUploadedFiles] = useState([]); // Danh sách file từ server
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái cho tìm kiếm
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Gọi API getAllFile để lấy danh sách file khi component được render
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getAllFile(token);

        setUploadedFiles(Array.isArray(data) ? data : []); // Đảm bảo luôn là mảng
      } catch (error) {
        console.error("Không thể lấy danh sách file:", error);
        setUploadedFiles([]); // Đặt giá trị mặc định nếu lỗi xảy ra
      }
    };

    fetchFiles();
  }, [token]);

  // Xử lý khi người dùng chọn file
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
    

  // Xử lý kéo thả file
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
  };

  // Xử lý sự kiện khi kéo file vào vùng thả
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Xóa file khỏi danh sách
  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  // Upload từng file
  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);

    for (const file of files) {
      try {
        const response = await uploadFile(token, file);
        console.log(`File ${file.name} uploaded successfully:`, response);
        // Sau khi upload thành công, gọi lại API để cập nhật danh sách file

        const data = await getAllFile(token);

        setUploadedFiles(data);
      } catch (error) {
        console.error(`Failed to upload file ${file.name}:`, error);
      }
    }

    setUploading(false);
    setFiles([]); // Xóa danh sách file sau khi tải lên xong
  };

  // Xử lý xóa file
  // const handleDeleteFile = async (fileId) => {
  //   try {
  //     await deleteFile(token, fileId);
  //     console.log(`File với ID ${fileId} đã được xóa`);

  //     // Cập nhật danh sách file sau khi xóa
  //     const data = await getAllFile(token);
  //     setUploadedFiles(data);
  //   } catch (error) {
  //     console.error("Không thể xóa file:", error);
  //   }
  // };

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
  
          // Gọi lại API để cập nhật danh sách file sau khi xóa
          const data = await getAllFile(token);
          setUploadedFiles(data);
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
  

  // Xử lý in file
  const handlePrintFile = (file) => {
    console.log("In file:", file);
    
    // Điều hướng đến trang Print và truyền toàn bộ thông tin file qua state
    navigate("/print", { state: { file } });
  };

  return (
    <div>
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
              disabled={
                !Array.isArray(files) || files.length === 0 || uploading
              }
            >
              {uploading ? "Đang tải lên..." : "Tải lên"}
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

        {/* Phần danh sách file đã upload */}
      </div>

      <div className="file-upload-container">
  <div className="uploaded-files">
    <h2>Danh sách file đã tải lên</h2>
    
    <p>
      Tổng số file: {uploadedFiles.length} | Tổng kích thước:{" "}
      {uploadedFiles.reduce((acc, file) => acc + file.fileSize / 1024, 0).toFixed(2)} KB
    </p>

    <div className="file-search-container">
      <input
        type="text"
        placeholder="Tìm kiếm file theo tên"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
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
              <td>{index + 1}</td>
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
      <p>Không tìm thấy file nào khớp với từ khóa.</p>
    )}

    
  </div>
</div>


    </div>
  );
}

export default File;
