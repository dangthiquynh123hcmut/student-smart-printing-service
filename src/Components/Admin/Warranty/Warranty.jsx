import React, { useState, useEffect } from "react";
import {
  GetAllReportWarranty,
  GetReportWarrantyByMachineID,
} from "../../../api/adminApi";
import { SearchOutlined } from "@ant-design/icons";
import "./Warranty.css";
import { NavLink } from "react-router-dom";

function Warranty() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [size, setSize] = useState(10); // Page size
  const [searchID, setSearchID] = useState(""); // Search ID
  const [totalReport, setTotalReport] = useState(0); // Total reports
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [isFiltered, setIsFiltered] = useState(false); // Check if filtering by ID
  const token = localStorage.getItem("token");

  // Fetch all reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const pageReal = page - 1; // Backend pagination starts at 0
      const data = await GetAllReportWarranty(token, pageReal, size);
      setTotalReport(data.totalElements);
      setTotalPages(data.totalPages);
      setReportData(Array.isArray(data.content) ? data.content : []);
      setIsFiltered(false); // Reset filter
    } catch (error) {
      console.error("Không thể lấy danh sách bảo hành:", error);
      setError("Đã xảy ra lỗi khi lấy dữ liệu.");
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch report by ID
  const fetchReportByID = async () => {
    if (!searchID.trim()) {
      alert("Vui lòng nhập ID máy in để tìm kiếm!");
      return;
    }

    try {
      setLoading(true);
      const pageReal = page - 1;
      const data = await GetReportWarrantyByMachineID(
        token,
        searchID,
        pageReal,
        size
      );
      setReportData(data.content || []);
      setTotalReport(data.totalElements || data.content.length || 0);
      setTotalPages(data.totalPages || 1);
      setIsFiltered(true); // Indicate filtering mode
      setError(null);
    } catch (err) {
      console.error("Không tìm thấy dữ liệu cho ID đã nhập:", err);
      setError("Không tìm thấy dữ liệu cho ID đã nhập.");
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset to full report list
  const handleReset = () => {
    setSearchID(""); // Clear search ID
    setPage(1); // Reset page to 1
    setSize(10); // Reset page size to 10
    fetchReports(); // Fetch all reports
  };

  // Fetch data on page or size change
  useEffect(() => {
    if (isFiltered && searchID) {
      fetchReportByID();
    } else {
      fetchReports();
    }
  }, [page, size]);

  const handlePageChange = (event) => {
    const newPage = Number(event.target.value);
    setPage(newPage > 0 ? newPage : 1);
  };

  const handleSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setSize(newSize > 0 ? newSize : 10);
  };

  // if (loading) {
  //   return <div className="loading">Đang tải dữ liệu...</div>;
  // }

  return (
    <div className="warranty-container">
      <div id="header">
        {searchID ? (
          <button onClick={handleReset} className="nav-link-warranty">
            &larr; Trở về báo cáo đầy đủ
          </button>
        ) : (
          <NavLink to="/">&larr; Trở về trang chủ</NavLink>
        )}

        <h1>Báo cáo bảo hành</h1>
      </div>
      <div className="file-container">
        <div className="search-container">
          <div className="search-input-warranty">
            <SearchOutlined className="search-icon" />
            <input
              type="text"
              placeholder="Nhập ID máy in..."
              value={searchID}
              onChange={(e) => setSearchID(e.target.value)}
              className="search-input-file"
            />
          </div>
          <button onClick={fetchReportByID} className="search-button">
            Tìm kiếm
          </button>
        </div>

        <div className="file-information">
          <div className="general-information">
            <h4>Tổng báo cáo: {totalReport}</h4>
            <h4>Tổng số trang: {totalPages}</h4>
          </div>
          <div className="pagination-controls">
            <label>
              Trang:{" "}
              <input
                type="number"
                value={page}
                onChange={handlePageChange}
                className="pagination-input"
                min="1"
              />
            </label>
            <label>
              Kích thước trang:{" "}
              <input
                type="number"
                value={size}
                onChange={handleSizeChange}
                className="pagination-input"
                min="1"
              />
            </label>
          </div>
        </div>

        {reportData.length > 0 ? (
          <table className="file-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>ID máy in</th>
                <th>Mô tả</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((report, index) => (
                <tr key={report.id || index}>
                  <td>{(page - 1) * size + index + 1}</td>
                  <td>{report.idMachine || "Không xác định"}</td>
                  <td>{report.description || "Không có mô tả"}</td>
                  <td>
                    {report.createDate
                      ? new Date(report.createDate).toLocaleDateString()
                      : "Không có ngày tạo"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không tìm thấy báo cáo nào khớp với lựa chọn.</p>
        )}
      </div>
    </div>
  );
}

export default Warranty;
