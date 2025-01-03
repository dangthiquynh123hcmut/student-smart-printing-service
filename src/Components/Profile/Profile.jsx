import "./Profile.css";
import React from "react";
import { Button, Input, Form, DatePicker, notification, Modal } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import { AuthContext } from "../Authentication/Authenticate";
import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import avatar from "../Assets/default-avatar.png";
import axios from "axios";
import { getBalanceInfo } from "../../api/studentApi";
import { NavLink } from "react-router-dom";

export function UserProfile() {
  dayjs.extend(customParseFormat);

  const dateFormat = "YYYY-MM-DD";
  const { userData, fetchUserData } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [formData, setFormData] = useState({
    firstName: userData?.result.firstName,
    lastName: userData?.result.lastName,
    birthDate: userData?.result.birthDate,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPassword({
      oldPassword: "",
      password: "",
    });
  };

  useEffect(() => {
    if (userData && userData.result) {
      setFormData({
        firstName: userData.result.firstName,
        lastName: userData.result.lastName,
        birthDate: userData.result.birthDate,
      });
    }
  }, [userData]);

  const handleInputChange = (name) => (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${API_URL}/users/${userData.result.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        notification.success({
          message: "Thành công",
          description: "Cập nhật thông tin thành công.",
        });
        await fetchUserData();
        setIsEditing(!isEditing);
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: `Cập nhật thất bại: ${error.message || error}`,
      });
    }
  };
  const API_URL = process.env.REACT_APP_DB_URL;
  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${API_URL}/users/${userData.result.id}/password`,
        password,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        notification.success({
          message: "Thành công",
          description: "Cập nhật mật khẩu thành công.",
        });
        handleCancel();
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: `${error.message || error}`,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    getBalanceInfo(token)
      .then((res) => {
        setBalance(res.data.result.balance);
      })
      .catch((error) => {
        //console.error("Error get balance:", error);
      });
  }, []);

  return (
    <div id="wrapper">
      <div id="header">
        <NavLink to="/">&larr; Trở về trang chủ</NavLink>
        <h1>Thông tin người dùng</h1>
      </div>
      <div className="outer">
        <div className="profile-container" style={{ padding: "20px" }}>
          <h2>Thông tin cá nhân</h2>
          <div className="header-container">
            <div className="avatar-container">
              <img src={avatar} alt="Avatar" className="avatar" />
            </div>
            <div className="email-container">
              <div>
                {userData?.result.lastName} {userData?.result.firstName}
              </div>
              <p className="email">{userData?.result.email}</p>
            </div>
            <div className="change-password">
              <Button onClick={handleEditClick}>Chỉnh sửa</Button>
              <Button color="default" variant="solid" onClick={showModal}>
                <KeyOutlined />
                Đổi mật khẩu
              </Button>
            </div>
          </div>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Họ tên">
              <Input.Group compact>
                <Form.Item name="lastName" noStyle>
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Last name"
                    defaultValue={userData?.result.lastName}
                    value={formData.lastName}
                    onChange={handleInputChange("lastName")}
                    disabled={!isEditing}
                  />
                </Form.Item>
                <Form.Item name="firstName" noStyle>
                  <Input
                    style={{ width: "50%" }}
                    placeholder="First name"
                    defaultValue={userData?.result.firstName}
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              style={{ display: "inline-block", width: "48%" }}
            >
              <Form.Item name="birthdate" noStyle>
                <DatePicker
                  defaultValue={dayjs(
                    `${userData?.result.birthDate}`,
                    dateFormat
                  )}
                  value={formData.birthDate}
                  onChange={(date) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      birthDate: date ? date.format(dateFormat) : "",
                    }));
                  }}
                  disabled={!isEditing}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item
              label="Mã số quản lý"
              style={{
                display: "inline-block",
                width: "48%",
                marginLeft: "4%",
              }}
            >
              <Form.Item name="mssv" noStyle>
                <Input defaultValue={userData?.result.mssv} disabled />
              </Form.Item>
            </Form.Item>

            <Form.Item label="Email">
              <Form.Item name="email" noStyle>
                <Input defaultValue={userData?.result.email} disabled />
              </Form.Item>
            </Form.Item>

            <Form.Item label="Username">
              <Form.Item name="username" noStyle>
                <Input defaultValue={userData?.result.username} disabled />
              </Form.Item>
            </Form.Item>

            {!(userData?.result.role === "ADMIN") && (
              <div>
                Số dư:{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(balance)}
              </div>
            )}

            <Form.Item style={{ textAlign: "center", marginTop: "10px" }}>
              <Button type="primary" htmlType="submit" disabled={!isEditing}>
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Modal
          title="Đổi mật khẩu"
          visible={isModalVisible}
          onOk={handleChangePassword}
          onCancel={handleCancel}
          okText="Đổi mật khẩu"
          cancelText="Hủy"
        >
          <Form layout="vertical">
            <Form.Item label="Mật khẩu cũ">
              <Input.Password
                value={password.oldPassword}
                onChange={(e) =>
                  setPassword({ ...password, oldPassword: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Mật khẩu mới">
              <Input.Password
                value={password.password}
                onChange={(e) =>
                  setPassword({ ...password, password: e.target.value })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
