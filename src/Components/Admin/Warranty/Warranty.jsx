import React, { useState, useEffect } from "react";
import {
  GetAllReportWarranty,
  GetReportWarrantyByMachineID,
} from "../../../api/adminApi";
import "./Warranty.css";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

function Warranty() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchID, setSearchID] = useState("");
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token không tồn tại. Vui lòng đăng nhập lại.");
        setLoading(false);
        return;
      }

      try {
        const data = await GetAllReportWarranty(token);
        setReportData(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        setError(err.message || "Đã xảy ra lỗi khi lấy dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reportData.slice(startIndex, endIndex);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    if (!searchID.trim()) {
      alert("Vui lòng nhập ID máy in để tìm kiếm!");
      return;
    }

    try {
      setLoading(true);
      const data = await GetReportWarrantyByMachineID(token, searchID);
      const dataArray = data.content;
      console.log("click sreach", dataArray);

      setReportData(dataArray);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error("Error fetching report by ID:", err);
      setError("Không tìm thấy dữ liệu cho ID đã nhập.");
      setReportData([]);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="warranty-container">
      <div id="header">
        <NavLink to="/">&larr; Trở về trang chủ</NavLink>

        <h1>Báo cáo bảo hành</h1>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Nhập ID máy in..."
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          <SearchOutlined /> Tìm kiếm
        </button>
      </div>
      {error && (
        <div className="error">
          <p>Không tìm thấy máy in này</p>
        </div>
      )}

      {reportData.length > 0 ? (
        <>
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
              {getPaginatedData().map((report, index) => (
                <tr key={report.id || index}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
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
          <div className="pagination">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              &lt;
            </button>
            <span className="pagination-info">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              &gt;
            </button>
          </div>
        </>
      ) : !error ? (
        <p>Không có báo cáo bảo hành nào được tìm thấy.</p>
      ) : null}
    </div>
  );
}

export default Warranty;
