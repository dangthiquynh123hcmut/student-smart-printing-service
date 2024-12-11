import "./UserAdminis.css";
import { Pagination, notification, Modal, Input } from "antd"; // Import Input
import { getAllUsers, deleteUserById } from "../../../api/adminApi";
import { useEffect, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';

export function UserAdminis() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDelete, setIsDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho tìm kiếm
  const pageSize = 9; // Số lượng người dùng hiển thị trên mỗi trang
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = () => {
      getAllUsers(token)
        .then((res) => {
          if (res.status === 200) {
            setUsers(res.data.result.content);
          }
        })
        .catch((error) => {
          notification.error({
            message: "Lỗi",
            description: `Không thể lấy thông tin người dùng: ${error.message || error}`,
          });
        });
    };
    fetchUsers();
  }, [isDelete]);

  const handleDeleteUser = (userId, firstName) => {
    Modal.confirm({
      title: `Bạn có chắc chắn muốn xóa ${firstName}?`,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteUserById(token, userId) // Gọi hàm xóa người dùng
          .then((res) => {
            if (res.status === 200) {
              setUsers(users.filter((user) => user.id !== userId));
              notification.success({
                message: "Thành công",
                description: `${res.data.result}`,
              });
              setIsDelete(!isDelete);
            }
          })
          .catch((error) => {
            notification.error({
              message: "Lỗi",
              description: `Không thể xóa người dùng: ${error.message || error}`,
            });
          });
      },
    });
  };

  const paginatedUsers = users
    .filter(user => {

      const fullName = `${user.lastName} ${user.firstName}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mssv.toString().includes(searchTerm)
      );
    })
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div id="wrapper">
      <div id="header">
        <a href="/" className="back-button">
          &larr; Trở về trang chủ
        </a>
        <h1>Quản lý người dùng</h1>
      </div>

      <div className="outer">
        <div className="containerr">
          {/* Trường nhập tìm kiếm */}
          <Input
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
            style={{ marginBottom: "20px" }}
            prefix={<SearchOutlined />}
            size="large"
          />
          <div className="table-responsive">
            <table className="user-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Tên người dùng</th>
                  <th>Ngày sinh</th>
                  <th>Vai trò</th>
                  <th>Mã số</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, index) => (
                  <tr key={user.id} onClick={() => handleDeleteUser(user.id, user.firstName)}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{`${user.lastName} ${user.firstName}`}</td>
                    <td>{user.birthDate}</td>
                    <td>{user.role}</td>
                    <td>{user.mssv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={users.length}
            onChange={(page) => setCurrentPage(page)}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
}