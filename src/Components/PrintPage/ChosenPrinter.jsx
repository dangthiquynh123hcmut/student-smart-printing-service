import React, { useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { GetAvailablePrinters } from "../../api/studentApi";
import "./ChosenPrinter.css";
import printerImage from "../Assets/printer-img.jpg";
import { notification } from "antd";

function ChosenPrinter({ onPrinterSelect }) {
  const [formData, setFormData] = useState({
    coSo: "CS1",
    toaNha: "A1",
    tang: "1",
  });

  const [printers, setPrinters] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setError(null);
    const { coSo, toaNha, tang } = formData;

    try {
      const response = await GetAvailablePrinters(token, coSo, toaNha, tang);

      setPrinters(response.data.result || []);
      setShowModal(true);
      setError("");
    } catch (err) {
      setError("Không thể lấy danh sách máy in. Vui lòng thử lại.");
      setPrinters([]);
    }
  };

  const handlePrinterSelection = (printer) => {
    notification.success({
      message: "Chọn máy in thành công",
      description: `Bạn đã chọn máy in: ${printer.name}`,
      placement: "topRight",
    });
    onPrinterSelect(printer.id);
    setShowModal(false);
    setSelectedPrinter(printer.name);
  };

  return (
    <div className="configure-container">
      <div className="configure-header">
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
              <option value="1">Tầng 1</option>
              <option value="2">Tầng 2</option>
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
