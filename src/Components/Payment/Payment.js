import "./Payment.css";
import { useState, useEffect } from "react";
import { notification, Button, Pagination } from "antd"; // Import Pagination
import vnpayimg from "../Assets/vnpay.png";
import html2pdf from 'html2pdf.js';
import { getPaymentInfo } from "../../api/studentApi";

function Payment() {
  const [bill, setBill] = useState([]);
  const [formData, setFormData] = useState({
    paperNumber: 1,
    paperSize: "A4",
    date: new Date(),
    price: 0,
  });
  const [payment, setPayment] = useState({
    bankCode: "NCB",
    amount: 0,
  });
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái cho trang hiện tại
  const itemsPerPage = 5; // Số hóa đơn trên mỗi trang

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    const pricePerPaper = updatedFormData.paperSize === "A4" ? 500 :
      updatedFormData.paperSize === "A3" ? 1000 :
        updatedFormData.paperSize === "A2" ? 2000 :
          updatedFormData.paperSize === "A1" ? 5000 : 0;

    const totalAmount = updatedFormData.paperNumber * pricePerPaper;

    setFormData({ ...updatedFormData, price: totalAmount });
  };

  const handleSubmit = () => {
    fetch('https://671d199b09103098807c4344.mockapi.io/api/bill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(() => {
        notification.success({
          message: "Thanh toán thành công",
          description: "Success",
        });
        setFormData({
          paperNumber: 1,
          paperSize: "A4",
          date: new Date(),
          price: 0,
        });
      })
      .catch(() => {
        notification.error({
          message: "Thanh toán thất bại",
          description: "Error",
        });
      });
  };

  const handlePaymentInfo = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const generatePDF = (item) => {
    const billContent = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h2>HÓA ĐƠN THANH TOÁN</h2>
      </div>
      <div style="padding-left: 20px;">
        <p><strong>ID hóa đơn:</strong> ${item.id}</p>
        <p><strong>Ngày thanh toán:</strong> ${new Date(item.date).toLocaleDateString("vi-VN")}</p>
        <p><strong>Loại giấy:</strong> ${item.paperSize}</p>
        <p><strong>Số lượng:</strong> ${item.paperNumber}</p>
        <p><strong>Tổng tiền:</strong> ${item.price} VNĐ</p>
      </div>
    `;

    const opt = {
      margin: 1,
      filename: `HoaDon_${item.id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(billContent).set(opt).save();
  };

  useEffect(() => {
    fetch('https://671d199b09103098807c4344.mockapi.io/api/bill')
      .then(res => res.json())
      .then(bill => {
        setBill(bill);
      })
      .catch(error => {
        console.error('Error fetching bill:', error);
      });
  }, [formData]);

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
            <h3>Thông tin thanh toán</h3>
            <div className="personal-info">
              <label>
                Số lượng giấy
                <input type="number" name="paperNumber" step="1" min="1" value={formData.paperNumber} onChange={handleInputChange} />
              </label>
              <label>
                Kích cỡ
                <select name="paperSize" value={formData.paperSize} onChange={handleInputChange}>
                  <option value="A4">A4</option>
                  <option value="A3">A3</option>
                  <option value="A2">A2</option>
                  <option value="A1">A1</option>
                </select>
              </label>
              <div className="payment-button">
                <button onClick={handleSubmit}>Mua thêm</button>
              </div>
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
                  <th>Số hóa đơn</th>
                  <th>Giá tiền</th>
                  <th>Ngày</th>
                  <th>Loại giấy</th>
                  <th>Số lượng giấy</th>
                  <th>Tải hóa đơn</th>
                </tr>
              </thead>
              <tbody>
                {currentBills.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.price} VNĐ</td>
                    <td>{new Date(item.date).toLocaleDateString("vi-VN")}</td>
                    <td>{item.paperSize}</td>
                    <td>{item.paperNumber}</td>
                    <td>
                      <Button onClick={() => generatePDF(item)}>Tải hóa đơn</Button>
                    </td>
                  </tr>
                ))}
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