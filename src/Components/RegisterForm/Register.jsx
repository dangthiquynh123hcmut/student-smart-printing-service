import React from "react";
import { Button, Form, Input, notification, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import img from "../Assets/logobk.png";
import { NavLink } from "react-router-dom";
import "./Register.css";
import BKimg from "../Assets/login.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (formValues) => {
    const { email, username, password, firstname, lastname, id, date } =
      formValues;
    console.log(formValues);
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          firstName: firstname,
          lastName: lastname,
          mssv: id,
          birthDate: date,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error occurred");
      }

      await response.json();
      notification.success({
        message: "Register SUCCESS",
        description: "Success",
      });

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Register Failed",
        description: error.message || "Try Again, @hcmut.edu.vn",
      });
    }
  };

  return (
    <div
      className="register"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${BKimg})`,
        backgroundSize: "cover", 
        backgroundPosition: "center", 
      }}
    >
      <Row
        className="wrapper-register"
        style={{
          height: "80vh",
          width: "70%",
          maxWidth: "1200px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
          overflowY: "auto",
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={12}
          style={{
            paddingTop: "12vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
            overflow: "hidden",
          }}
        >
          <img
            src={img}
            alt="Register Visual"
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <h1
            style={{
              textAlign: "center",
              fontSize: "2.5rem", 
              color: "#007BFF", 
              fontWeight: "bold",
              margin: "8px",
            }}
          >
            Dịch vụ in thông minh
          </h1>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
            overflowY: "auto",
          }}
        >
          <h1 style={{ textAlign: "center", fontSize: "2.5rem",  color: "#007BFF"}}>Đăng kí</h1>
          <Form
            name="basic"
            style={{
              maxWidth: "400px",
              width: "100%",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được bỏ trống!",
                },
              ]}
            >
              <Input placeholder="Email phải có @hcmut.edu.vn" />
            </Form.Item>
            <Form.Item
              label="Tên đăng nhâp"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Tên đăng nhập phải có ít nhất 8 kí tự!",
                },
              ]}
            >
              <Input placeholder="Phải có ít nhất 8 kí tự" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu phải có ít nhất 8 kí tự",
                },
              ]}
            >
              <Input.Password placeholder="Phải có ít nhất 8 kí tự" />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Tên không được bỏ trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Họ"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Họ không được bỏ trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="MSSV"
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập MSSV!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Nhập ngày sinh theo định dạng: Năm-tháng-ngày!",
                },
              ]}
            >
              <Input placeholder="Vd: 2000-01-01" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Đăng kí
              </Button>
            </Form.Item>
            <div
              className="login-link"
              style={{
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              <p>
                Bạn có tài khoản? <NavLink to="/login">Đăng nhập</NavLink>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
