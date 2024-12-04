import React, { useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { GetAvailablePrinters } from "../../api/studentApi"; // Đường dẫn tệp API
import "./ChosenPrinter.css";
import printerImage from "../Admin/Printers/printer.jpg";
import { notification } from "antd";

function ChosenPrinter({ onPrinterSelect }) {
  const [formData, setFormData] = useState({
    coSo: "CS1",
    toaNha: "A1",
    tang: "Tầng 1",
  });

  const [printers, setPrinters] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null); // Trạng thái lưu máy in đã chọn

  const token = localStorage.getItem("token"); 
  console.log(token);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setError(null); // Xóa lỗi trước đó, có thể xóa
    const { coSo, toaNha, tang } = formData;
    const floorNumber = tang.replace("Tầng ", ""); // Loại bỏ chữ "Tầng"

    try {
      const response = await GetAvailablePrinters(
        token,
        coSo,
        toaNha,
        floorNumber
      );

      setPrinters(response.result || []); // Ghi danh sách máy in
      console.log("get api", response.result);

      // setShowPrinters(true); // Hiển thị danh sách máy in
      setShowModal(true); // Hiển thị modal với danh sách máy in
      setError(""); // Xóa lỗi
    } catch (err) {
      console.error(err);
      setError("Không thể lấy danh sách máy in. Vui lòng thử lại.");
      // setShowPrinters(false);
      setPrinters([]); // Reset danh sách
    }
  };

  const handlePrinterSelection = (printer) => {
    console.log("Máy in được chọn:", printer);

    // Hiển thị thông báo thành công
    notification.success({
      message: "Chọn máy in thành công",
      description: `Bạn đã chọn máy in: ${printer.name}`,

      placement: "topRight", // Vị trí hiển thị thông báo
    });
    onPrinterSelect(printer.id); // Gửi idPrinter qua callback

    setShowModal(false); // Đóng modal sau khi chọn máy in
    setSelectedPrinter(printer.name); // Lưu tên máy in
  };

  
  return (
    <div className="file-upload-container">
      <div className="file-upload-header">
        <div className="file-image">
          <PrinterOutlined style={{ fontSize: "24px", color: "#000" }} />
          <h2>Chọn máy in</h2>
        </div>
      </div>

      <div id="wrapper1">
        <div className="input-group">
          <div className="field-container">
            <label className="form-label">Cơ sở</label>
            <select
              name="coSo"
              className="form-select"
              value={formData.coSo}
              onChange={handleInputChange}
            >
              <option value="CS1">CS1</option>
              <option value="CS2">CS2</option>
            </select>
          </div>

          <div className="field-container">
            <label className="form-label">Tòa nhà</label>
            <select
              name="toaNha"
              className="form-select"
              value={formData.toaNha}
              onChange={handleInputChange}
            >
              <option value="H1">H1</option>
              <option value="H2">H2</option>
              <option value="H3">H3</option>
              <option value="H6">H6</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="A3">A3</option>
              <option value="A4">A4</option>
              <option value="A5">A5</option>
            </select>
          </div>

          
          <div className="field-container">
            <label className="form-label">Tầng</label>
            <select
              name="tang"
              className="form-select"
              value={formData.tang}
              onChange={handleInputChange}
            >
             <option value="Tầng 1">Tầng 1</option>
                  <option value="Tầng 2">Tầng 2</option>
                  <option value="Tầng 3">Tầng 3</option>
                  <option value="Tầng 4">Tầng 4</option>
                  <option value="Tầng 5">Tầng 5</option>
                  <option value="Tầng 6">Tầng 6</option>
                  <option value="Tầng 7">Tầng 7</option>
                  <option value="Tầng 8">Tầng 8</option>
            </select>
          </div>
        </div>
        <div>
          <p>
            {selectedPrinter ? (
              <>
                Máy in đã chọn: <strong>{selectedPrinter}</strong>
              </>
            ) : (
              <strong>Chưa chọn máy in cụ thể.</strong>
            )}
          </p>
        </div>

        <div className="button-container">
          <button className="preview-button" onClick={handleSubmit}>
            Chọn máy in
          </button>

          {/* <button className="send-button">In tệp</button> */}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                X
              </button>

              <div className="printer-list">
                {error && <p className="error-message">{error}</p>}
                {printers.length > 0 ? (
                  <div className="printer-grid">
                    {printers.map((printer, index) => (
                      <div className="printer-card" key={index}>
                        {/* Thêm ảnh máy in */}
                        <img
                          src={printerImage}
                          alt="Printer"
                          className="printer-image"
                        />

                        <h3>Tên: {printer.name}</h3>
                        <p>
                          <strong>Lượng mực đen:</strong>{" "}
                          {printer.blackWhiteInkStatus}
                        </p>
                        <p>
                          <strong>Lượng mực màu:</strong>{" "}
                          {printer.colorInkStatus}
                        </p>
                        <p>
                          <strong>Số lượng chờ in:</strong>{" "}
                          {printer.printWaiting}
                        </p>
                        <p>
                          <strong>Số giấy A0:</strong> {printer.a0paperStatus}
                        </p>
                        <p>
                          <strong>Số giấy A1:</strong> {printer.a1paperStatus}
                        </p>
                        <p>
                          <strong>Số giấy A2:</strong> {printer.a2paperStatus}
                        </p>
                        <p>
                          <strong>Số giấy A3:</strong> {printer.a3paperStatus}
                        </p>
                        <p>
                          <strong>Số giấy A4:</strong> {printer.a4paperStatus}
                        </p>
                        <button
                          className="select-button"
                          onClick={() => handlePrinterSelection(printer)}
                        >
                          Chọn
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-printer-message">
                    <p>Không có máy in nào ở vị trí này.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChosenPrinter;
