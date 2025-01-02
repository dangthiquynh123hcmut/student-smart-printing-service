import "./UserAdminis.css";
import { Pagination, notification, Modal, Input, Spin } from "antd";
import { getAllUsers, deleteUserById } from "../../../api/adminApi";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export function UserAdminis() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDelete, setIsDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const pageSize = 9;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = () => {
      setLoading(true);
      getAllUsers(token, 0, 100)
        .then((res) => {
          if (res.status === 200) {
            setUsers(res.data.result.content);
          }
        })
        .catch((error) => {
          notification.error({
            message: "Lỗi",
            description: `Không thể lấy thông tin người dùng: ${
              error.message || error
            }`,
          });
        })
        .finally(() => {
          setLoading(false);
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
        deleteUserById(token, userId)
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
              description: `Không thể xóa người dùng: ${
                error.message || error
              }`,
            });
          });
      },
    });
  };

  const paginatedUsers = users
    .filter((user) => {
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
        <NavLink to="/">&larr; Trở về trang chủ</NavLink>
        <h1>Quản lý người dùng</h1>
      </div>

      <div className="outer">
        <div className="containerr">
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
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
          ) : (
            <>
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
                    {paginatedUsers.map((user, index) => {
                      const fullName =
                        !user.firstName && !user.lastName ? (
                          <i>Chưa có tên</i>
                        ) : (
                          `${user.lastName || ""} ${
                            user.firstName || ""
                          }`.trim()
                        );

                      return (
                        <tr
                          key={user.id}
                          onClick={() =>
                            handleDeleteUser(user.id, user.firstName)
                          }
                        >
                          <td>{(currentPage - 1) * pageSize + index + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{fullName}</td>
                          <td>{user.birthDate}</td>
                          <td>{user.role}</td>
                          <td>{user.mssv}</td>
                        </tr>
                      );
                    })}
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
                  position: "sticky",
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
