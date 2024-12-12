import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker, message,notification } from "antd";
import { createStaff } from "../../../api/adminApi";
import "./CreateStaff.css";

function CreateStaff() {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const onFinish = async (values) => {
    const token = localStorage.getItem("token"); 
  
    if (!token) {
      message.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
      return;
    }
  
    const newStaff = {
      email: values.email,
      username: values.username,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
      mssv: values.mssv,
      date: values.date.format("YYYY-MM-DD"),
    };
  
    try {
      setLoading(true);
      const response = await createStaff(token, newStaff);
        console.log(response)
        notification.success({
            message: "Thêm nhân viên thành công",
            description: "Thành công",
          });
          navigate("/user-adminis");
    }catch (error) {
        console.error("Error:", error);
        notification.error({
          message: "Tạo tài khoản thất bại",
          description: error.response.data.message,
        });
      } 
    finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="creat-staff">
      <div className="header-staff">
        <NavLink to="/">&larr; Trở về trang chủ</NavLink>
        <h1>Thêm nhân viên</h1>
      </div>
      <div className="form-container">
        <h2>Đăng kí tài khoản nhân viên</h2>
        <Form
          name="createStaff"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input placeholder="Nhập email có đuôi @hcmut.edu.vn" />
          </Form.Item>

          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input placeholder="Tên đăng nhập phải từ 8 đến 20 kí tự" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Mật khẩu phải từ 8 đến 20 kí tự" />
          </Form.Item>

          <Form.Item
            label="Họ"
            name="firstname"
            rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
          >
            <Input placeholder="Nhập họ" />
          </Form.Item>

          <Form.Item
            label="Tên"
            name="lastname"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>

          <Form.Item
            label="Mã nhân viên"
            name="mssv"
            rules={[{ required: true, message: "Vui lòng nhập mã nhân viên!" }]}
          >
            <Input placeholder="Nhập mã nhân viên" />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="date"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Thêm nhân viên
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default CreateStaff;
