import "./Payment.css";
import React, { useState, useEffect } from "react";
import { notification, Button, Pagination, DatePicker, Spin } from "antd";
import vnpayimg from "../Assets/vnpay.png";
import { getPaymentInfo, getBalanceHistory, getBalanceInfo } from "../../api/studentApi";
import { parseISO, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;

function Payment() {
  const [bill, setBill] = useState([]);
  const [filteredBill, setFilteredBill] = useState([]);
  const [balance, setBalance] = useState(0);
  const [payment, setPayment] = useState({ bankCode: "NCB", amount: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handlePaymentInfo = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const fetchBill = () => {
    setLoading(true);
    getBalanceHistory(token, 0, 1000)
      .then((response) => {
        const allBills = response.data.result.content;
        setBill(allBills);
        setFilteredBill(allBills);
      })
      .catch(error => {
        console.error('Error fetching bill:', error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBill();
  }, []);

  useEffect(() => {
    if (!bill || !Array.isArray(bill)) return;
    let filtered = bill;
    if (dateRange[0] && dateRange[1]) {
      filtered = bill.filter(item => {
        const updatedAt = new Date(item.updatedAt);
        const endDate = new Date(dateRange[1]);
        endDate.setDate(endDate.getDate() + 1);
        return updatedAt >= dateRange[0] && updatedAt < endDate;
      });
    }

    const sortedBills = filtered.sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredBill([...sortedBills]);
    setCurrentPage(1);
  }, [dateRange, sortOrder, bill]);


  const paginatedBills = filteredBill.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handlePayment = (amount, bankCode) => {
    if (amount < 10000) {
      notification.error({
        message: "Không thể giao dịch",
        description: "Số tiền giao dịch tối thiểu là 10.000đ",
      });
      return;
    }
    getPaymentInfo(token, amount, bankCode)
      .then((res) => {
        if (res.data.result.paymentUrl) {
          navigate('/file');
          window.open(res.data.result.paymentUrl, '_blank');
        } else {
          notification.error({
            message: "Lỗi",
            description: "Không nhận được URL thanh toán từ API.",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Lỗi kết nối",
          description: "Có lỗi xảy ra khi kết nối với API thanh toán.",
        });
        console.error(error);
      });
  };

  useEffect(() => {
    getBalanceInfo(token)
      .then((res) => {
        setBalance(res.data.result.balance);
      })
      .catch((error) => {
        console.error("Error getting balance:", error);
      });
  }, []);

  const handleDateRangeChange = (dates) => {
    if (!dates || dates.length === 0) {
      setDateRange([null, null]);
    } else {
      setDateRange(dates);
    }
  };


  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div id="wrapper">
      <div id="header">
        <a href="/" className="back-button">
          &larr; Trở về trang chủ
        </a>
        <h1>Thanh toán</h1>
      </div>

      <div className="payment-container">
        <div className="row">
          <div className="box payment-info">
            <img src={require('../Assets/printer.gif')} alt="GIF Example" />
          </div>

          <div className="box payment-method">
            <h3>Phương thức thanh toán</h3>
            <div className="user-payment">
              <img src={vnpayimg} alt="vnpay-img" />
              <label>
                Mã ngân hàng
                <input type="text" name="bankCode" placeholder="NCB" value={payment.bankCode} onChange={handlePaymentInfo} />
              </label>
              <label>
                Số tiền
                <input type="number" name="amount" placeholder="0đ" step="1" min="1" value={payment.amount} onChange={handlePaymentInfo} />
              </label>
            </div>
            <div className="outer-button">
              <Button className="custom-button" type="primary" onClick={() => handlePayment(payment.amount, payment.bankCode)}>
                Thanh toán
              </Button>
            </div>
          </div>
        </div>

        <div className="box billing-history">
          <h3>Lịch sử hóa đơn</h3>
          <h4>Số dư: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(balance)}</h4>
          <div className="filter-sort-container">
            <div className="filter-section">
              <span className="filter-label">Lọc theo ngày:</span>
              <RangePicker onChange={handleDateRangeChange} />
            </div>

            <div className="sort-section">
              <span className="sort-label">Sắp xếp theo ngày:</span>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
              </select>
            </div>
          </div>


          {loading ? (
            <Spin tip="Đang tải..." />
          ) : (
            <div id="billing-history-table">
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Số tiền giao dịch</th>
                    <th>Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBills.length > 0 ? (
                    paginatedBills.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>{item.balance}</td>
                        <td>{format(parseISO(item.updatedAt), 'dd/MM/yyyy')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">Không có hóa đơn nào.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={filteredBill.length}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
