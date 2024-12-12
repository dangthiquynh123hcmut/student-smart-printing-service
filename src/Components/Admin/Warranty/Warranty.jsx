import React, { useState, useEffect } from "react";
import {
  GetAllReportWarranty,
  GetReportWarrantyByMachineID,
} from "../../../api/adminApi";
import { SearchOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import "./Warranty.css";
import { NavLink } from "react-router-dom";

function Warranty() {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Dữ liệu đã được lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [searchID, setSearchID] = useState(""); // ID tìm kiếm
  const [totalReport, setTotalReport] = useState(0); // Tổng số báo cáo
  const [isFiltered, setIsFiltered] = useState(false); // Chế độ tìm kiếm
  const token = localStorage.getItem("token");

  // Fetch tất cả báo cáo
  const fetchReports = async () => {
    try {
      setLoading(true);
      const pageReal = page - 1; // Pagination bắt đầu từ 0
      const data = await GetAllReportWarranty(token, pageReal);
      setTotalReport(data.totalElements);
      setReportData(Array.isArray(data.content) ? data.content : []);
      setFilteredData(Array.isArray(data.content) ? data.content : []); // Dữ liệu ban đầu để lọc
      setIsFiltered(false); // Reset trạng thái lọc
    } catch (error) {
      console.error("Không thể lấy danh sách bảo hành:", error);
      setError("Đã xảy ra lỗi khi lấy dữ liệu.");
      setReportData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch báo cáo theo ID
  const fetchReportByID = async () => {
    if (!searchID.trim()) {
      alert("Vui lòng nhập ID máy in để tìm kiếm!");
      return;
    }

    try {
      setLoading(true);
      const pageReal = page - 1;
      const data = await GetReportWarrantyByMachineID(token, searchID, pageReal);
      setReportData(data.content || []);
      setFilteredData(data.content || []);
      setTotalReport(data.totalElements || data.content.length || 0);
      setIsFiltered(true); // Bật trạng thái lọc
      setError(null);
    } catch (err) {
      console.error("Không tìm thấy dữ liệu cho ID đã nhập:", err);
      setTotalReport(0);
      setError("Không tìm thấy dữ liệu cho ID đã nhập.");
      setReportData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset danh sách đầy đủ
  const handleReset = () => {
    setSearchID(""); // Xóa ID tìm kiếm
    setPage(1); // Reset trang về 1
    fetchReports(); // Fetch tất cả báo cáo
  };

  // Tìm kiếm linh hoạt khi nhập từ khóa
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchID(value);

    // Lọc dữ liệu dựa trên từ khóa
    if (value) {
      const filtered = reportData.filter(
        (report) =>
          (report.idMachine && report.idMachine.toLowerCase().includes(value)) ||
          (report.name && report.name.toLowerCase().includes(value)) ||
          (report.description && report.description.toLowerCase().includes(value))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(reportData); // Reset nếu không có từ khóa
    }
  };

  // Pagination
  const handlePaginationChange = (current) => {
    setPage(current);
  };

  // Fetch dữ liệu khi thay đổi trang
  useEffect(() => {
    if (!isFiltered) {
      fetchReports();
    }
  }, [page]);

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
              placeholder="Nhập từ khóa hoặc ID máy in..."
              value={searchID}
              onChange={handleSearch} // Sử dụng hàm handleSearch
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
          </div>
        </div>

        {filteredData.length > 0 ? (
          <table className="file-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>ID máy in</th>
                <th>Tên máy in</th>
                <th>Mô tả</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((report, index) => (
                <tr key={report.id || index}>
                  <td>{(page - 1) * 10 + index + 1}</td>
                  <td>{report.idMachine || "Không xác định"}</td>
                  <td>{report.name || "Chưa có tên"}</td>
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

        <div className="pagination">
          <Pagination
            current={page}
            pageSize={10}
            total={totalReport}
            onChange={handlePaginationChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Warranty;
