// import { colors } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import React from "react";
import { useState, useEffect } from 'react';
import {
  FolderOutlined,
  UploadOutlined,
  SettingOutlined,
  PrinterOutlined,
  SearchOutlined
} from "@ant-design/icons";
import "./Print.css";
function Print() {

  const [files, setFiles] = useState([]); // Sử dụng mảng để lưu trữ các tệp

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Chuyển đổi đối tượng FileList thành mảng
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Thêm tệp mới vào mảng
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove)); // Xóa tệp khỏi mảng
  };

  const handleUpload = () => {
    // Logic tải lên tệp
    alert('upload thành công');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // Thêm tệp được kéo thả vào mảng
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định
  };
  const [myCar, setMyCar] = useState("Volvo");
  const [selectedOption, setSelectedOption] = useState('1'); // Quản lý trạng thái của radio buttons

  const handleChange = (event) => {
    setMyCar(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Cập nhật khi người dùng chọn radio button
  };

  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrinterId, setSelectedPrinterId] = useState(null);

  // Danh sách máy in giả định
  const printers = [
    { id: 1, coSo: "Cơ sở 1", toaNha: "Tòa nhà A", tang: 1, trangThai: "Hoạt động", hangCho: 2 },
    { id: 2, coSo: "Cơ sở 2", toaNha: "Tòa nhà B", tang: 3, trangThai: "Hoạt động", hangCho: 5 },
    { id: 3, coSo: "Cơ sở 3", toaNha: "Tòa nhà C", tang: 2, trangThai: "Bảo trì", hangCho: 0 },
    { id: 4, coSo: "Cơ sở 4", toaNha: "Tòa nhà D", tang: 2, trangThai: "Hoạt động", hangCho: 1 }
  ];

  // Hàm toggle hiển thị bảng
  const toggleTable = () => {
    setShowTable(!showTable);
  };
  // Hàm để lọc danh sách máy in theo tên tòa nhà
  const filteredPrinters = printers.filter(printer =>
    printer.toaNha.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Cập nhật giá trị tìm kiếm khi người dùng nhập
  };

  // Hàm xử lý chọn máy in
  const handleSelectPrinter = (id) => {
    setSelectedPrinterId(id); // Cập nhật máy in được chọn
  };
  return (
    <div id='wrapper'>

      <div id="header">
        <a href="/" className="back-button">&larr; Trở về trang chủ</a>
        <h1>In ấn</h1>
      </div>

      <div className="file-upload-container">
        {/* Phần header phía trên */}
        <div className="file-upload-header">
          <div className="file-image">
            <FolderOutlined style={{ fontSize: '24px', color: '#000' }} />
            <h2>Tải tập tin</h2>
          </div>
          <div className="file-actions">
            <label className="file-choose-button">
              Chọn tệp
              <input
                type="file"
                multiple // Cho phép chọn nhiều tệp
                onChange={handleFileChange}
                style={{ display: 'none' }} // Ẩn nút input file
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
          <UploadOutlined style={{ fontSize: '24px', color: '#08c' }} />
          {files.length > 0 ? (
            <div className="file-info">
              {files.map((file) => (
                <div key={file.name} className="file-item">
                  <span>{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(file)}
                    style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }} 
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
            <SettingOutlined style={{ fontSize: '24px', color: '#000' }} />
            <h2>Cấu hình in</h2>
          </div>
        </div>
        <div id='wrapper1'>
          {/* Nhóm 1: Số lượng bản in, Tỉ lệ, You have selected */}
          <div className="input-group">
            <div className="quantity-input-container">
              <label htmlFor='input' className="quantity-input-label">Số lượng bản in</label>
              <input
                id='input'
                type='number'
                className="quantity-input"
              />
            </div>
            <div className="quantity-input-container">
              <label htmlFor='input' className="quantity-input-label">Tỉ lệ</label>
              <input
                id='input'
                type='number'
                className="quantity-input"
              />
            </div>
            <div className="quantity-input-container">
              <label htmlFor='input' className="quantity-input-label">Số trang mỗi tờ</label>
              <input
                id='input'
                className="quantity-input"
              />
            </div>
          </div>

          {/* Nhóm 2: Kích thước trang, Kiểu in */}
          <div className="input-group">
            <div className="quantity-input-container">
              <form>
                <label>Kích thước trang
                  <select class="node" value={myCar} onChange={handleChange}>
                    <option value="A4">A4</option>
                    <option value="A3">A3</option>
                    <option value="A2">A2</option>
                  </select>
                </label>
              </form>
            </div>
            <div className="quantity-input-container">
              <form>
                <label>Kiểu in
                  <select class="node" value={myCar} onChange={handleChange}>
                    <option value="In trắng đen">In trắng đen</option>
                    <option value="In màu nhám">In màu nhám</option>
                    <option value="In màu bóng">In màu bóng</option>
                  </select>
                </label>
              </form>
            </div>
            <div className="quantity-input-container">
              <form>
                <label>Hướng giấy

                  <select class="node" value={myCar} onChange={handleChange}>
                    <option value="In dọc">In dọc</option>
                    <option value="In ngang">In ngang</option>
                  </select>
                </label>
              </form>
            </div>
          </div>

          {/* Nhóm 3: Số trang mỗi tờ, Hướng giấy */}
          <div>
            <div className="input-group1">
              {/* Thêm hai nút chọn */}

              <p style={{ marginRight: '10px' }}>Bố cục</p>

              <label>
                <input
                  type="radio"
                  value="1"
                  checked={selectedOption === '1'}
                  onChange={handleOptionChange}
                />
                Chân dung
              </label>

              <label>
                <input
                  type="radio"
                  value="2"
                  checked={selectedOption === '2'}
                  onChange={handleOptionChange}
                />
                Toàn cảnh
              </label>

            </div>
            <div className="button-container">
              <button className="preview-button">Xem trước</button>
              <button className="done-button">Xong</button>
            </div>
          </div>
        </div>

      </div>


      <div className="file-upload-container">
        <div className="file-upload-header">
          <div className="file-image">
            <PrinterOutlined style={{ fontSize: '24px', color: '#000' }} />
            <h2>Chọn máy in</h2>
          </div>
          <div className="file-actions">
            <div className="file-image">
              {/* Khi bấm vào icon, toggle hiển thị bảng */}
              <SearchOutlined
                style={{ fontSize: '24px', color: '#000', cursor: 'pointer' }}
                onClick={toggleTable}
              />
            </div>

            {/* Hiển thị bảng nếu showTable là true */}
            {showTable && (
              <div className="overlay">
                <div className="table-container">
                  <div className="search-container">
                    <h2>Danh sách máy in</h2>
                    <div className="search-filter">
                      <label htmlFor="search">Tìm kiếm theo tòa nhà:</label>
                      <input
                        id="search"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange} // Gọi hàm khi người dùng thay đổi ô tìm kiếm
                        className="search-input" // Thêm lớp CSS cho ô input
                      />
                    </div>

                  </div>


                  <table className="printer-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Cơ sở</th>
                        <th>Tòa nhà</th>
                        <th>Tầng</th>
                        <th>Trạng thái</th>
                        <th>Hàng chờ</th>
                        <th>Chọn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPrinters.map((printer) => (
                        <tr key={printer.id}>
                          <td>{printer.id}</td>
                          <td>{printer.coSo}</td>
                          <td>{printer.toaNha}</td>
                          <td>{printer.tang}</td>
                          <td className={printer.trangThai === "Bảo trì" ? "trang-thai-bao-tri" : ""}>
                            {printer.trangThai}
                          </td>
                          <td>{printer.hangCho}</td>
                          <td>
                            <input
                              type="radio"
                              name="selectPrinter"
                              value={printer.id}
                              disabled={printer.trangThai !== "Hoạt động"} 
                              checked={selectedPrinterId === printer.id}
                              onChange={() => handleSelectPrinter(printer.id)}
                            />
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className="close-button" onClick={toggleTable}>Đóng</button>
                </div>
              </div>
            )}

          </div>
        </div>


        <div id='wrapper1'>
          {/* Nhóm 2 */}
          <div className="input-group">
            <div className="quantity-input-container">
              <form>
                <label>Cơ sở
                  <select class="node" value={myCar} onChange={handleChange}>
                    <option value="CS1">CS1</option>
                    <option value="CS2">CS2</option>
                  </select>
                </label>
              </form>
            </div>
            <div className="quantity-input-container">
              <form>
                <label>Tòa nhà
                  <select class="node" value={myCar} onChange={handleChange}>
                    <option value="A1">A1</option>
                    <option value="B1">B1</option>
                    <option value="C1">C1</option>
                    <option value="H1">H1</option>
                  </select>
                </label>
              </form>
            </div>
            <div className="quantity-input-container">
              <form>
                <label>Tầng

                  <select class="node" value={myCar} onChange={handleChange}>
                    <option value="Tầng 1">Tầng 1</option>
                    <option value="Tầng 2">Tầng 2</option>
                    <option value="Tầng 3">Tầng 3</option>
                    <option value="Tầng 4">Tầng 4</option>
                    <option value="Tầng 5">Tầng 5</option>
                  </select>
                </label>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Print;








