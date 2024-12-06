import "./Payment.css";
import React from 'react';
import { useState, useEffect } from "react";
import { notification, Button, Pagination} from "antd";
import vnpayimg from "../Assets/vnpay.png";
import { getPaymentInfo, getBalanceHistory } from "../../api/studentApi";
import { parseISO, format } from 'date-fns';

function Payment() {
  const [bill, setBill] = useState([]);
  const [payment, setPayment] = useState({
    bankCode: "NCB",
    amount: 0,
  });
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái cho trang hiện tại
  const itemsPerPage = 5; // Số hóa đơn trên mỗi trang

  const token = localStorage.getItem("token");

  const handlePaymentInfo = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const fetchBill = () => {
    getBalanceHistory(token)
      .then((response) => {
        setBill(response.data.result.content);
      })
      .catch(error => {
        console.error('Error fetching bill:', error);
      });
  };

  useEffect(() => {
    fetchBill();
  }, []);

  const handlePayment = (amount, bankCode) => {
    getPaymentInfo(token, amount, bankCode)
      .then((res) => {
        if (res.data.result.paymentUrl) {
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

  // Tính toán hóa đơn cho trang hiện tại
  const indexOfLastBill = currentPage * itemsPerPage;
  const indexOfFirstBill = indexOfLastBill - itemsPerPage;
  const currentBills = bill.slice(indexOfFirstBill, indexOfLastBill);

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
            <div>
              <img src={require('../Assets/printer.gif')} alt="GIF Example" />
            </div>
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
            <div className="payment-button">
              <button onClick={() => handlePayment(payment.amount, payment.bankCode)}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>

        <div className="box billing-history">
          <h3>Lịch sử hóa đơn</h3>
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
                {currentBills.length > 0 ? (
                  currentBills.map((item, index) => (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.balance}</td>
                      <td>{format(parseISO(item.updatedAt), 'dd/MM/yyyy')}</td> {/* Định dạng ngày */}
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
          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={bill.length}
              onChange={(page) => setCurrentPage(page)} // Cập nhật trang hiện tại
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;