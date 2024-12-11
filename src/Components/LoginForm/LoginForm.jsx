import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { notification, Row, Col } from "antd";
import "./LoginForm.css";
import { AuthContext } from "../Authentication/Authenticate";
import img from "../Assets/logobk.png";
import { FaUser, FaClock } from "react-icons/fa";
=======
import { notification, Input } from "antd";
import "./LoginForm.css";
import { AuthContext } from "../Authentication/Authenticate";

import { FaUser, FaLock } from "react-icons/fa"; // Sử dụng FaLock cho mật khẩu
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import PropTypes from "prop-types";

// import { loginApi} from "../../api/API";
>>>>>>> origin/main

const LoginForm = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;
<<<<<<< HEAD

=======
    // try{
    //   const res = await loginApi(email, password);

    //   // debugger;
    //   if (res && res.code === 0) {
    //     //depend on backend return res => will be set again
    //     notification.success({
    //       message: "Login SUCCESS",
    //       description: "Success",
    //     });
    //     localStorage.setItem("token", res.result.token);
    //     setToken(res.result.token);  // Cập nhật token trong AuthContext
    //     console.log(">>Success:", res);
    //     navigate("/");
    //     console.log("still login")
    //   } else {
    //     alert("fail");
    //     notification.error({
    //       message: "Login Failed",
    //       description: res?.code ?? "error",
    //     });
    //   }
    // }catch (error){
    //   alert("Login error:", error);

    // }

>>>>>>> origin/main
    try {
      const response = await fetch("http://localhost:8080/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      notification.success({
        message: "Login SUCCESS",
        description: "Success",
      });
      localStorage.setItem("token", data.result.token);
<<<<<<< HEAD
      setToken(data.result.token);
=======
      setToken(data.result.token); // Cập nhật token trong AuthContext
>>>>>>> origin/main
      navigate("/");
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: "Username or password wrong",
      });
    }
<<<<<<< HEAD
  };

  return (
    <div
      className="login"
      style={{
        height: "100vh",
        // overflowY: "auto", // Cho phép cuộn khi nội dung vượt quá
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Row
        className="wrapper"
        style={{
          height: "80vh", // Chỉ chiếm 80% chiều cao màn hình
          width: "100%",
          maxWidth: "1200px", // Giới hạn chiều rộng tối đa
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Tạo bóng mờ
          overflowY: "auto",
        }}
      >
        {/* Cột bên trái: Ảnh và tiêu đề */}
        <Col
          xs={24}
          sm={24}
          md={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
          }}
        >
          <img
            src={img}
            alt="Login Visual"
            style={{ width: "80%", marginBottom: "10px" }}
          />
          <h1
            style={{
              textAlign: "center",
              fontSize: "2.5rem", // Tăng kích thước chữ
              color: "#007BFF", // Màu xanh dương
              fontWeight: "bold",
              margin:"8px",
            }}
          >
            Dịch vụ in thông minh
          </h1>
        </Col>

        {/* Cột bên phải: Form đăng nhập */}
        <Col
          xs={24}
          sm={24}
          md={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={onFinish}
            style={{
              maxWidth: "400px",
              width: "100%",
              padding: "20px",
              marginTop:"10px",
            }}
          >
            <h1 style={{ textAlign: "center",fontSize: "2.5rem", }}>Đăng nhập</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
              <FaClock className="icon" />
            </div>
            <div className="member-forgot">
              <label>
                <input type="checkbox" className="checkbox-input" />
                Nhớ mật khẩu
              </label>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "5px",
              }}
            >
              Đăng nhập
            </button>
            <div
              className="register-link"
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <p>
                Chưa có tài khoản? <NavLink to="/register">Đăng kí</NavLink>
              </p>
            </div>
          </form>
        </Col>
      </Row>
=======

    // console.log(">>Success:", res);
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form action="" onSubmit={onFinish}>
          {" "}
          {/*onSubmit={handleSubmit} */}
          <h1>Login</h1>
          <div className="input-box">
            <Input
              type="text"
              placeholder="Username"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
              prefix={<FaUser className="icon" />} // Thêm biểu tượng người dùng
              className="custom-input"
            />
          </div>
          <div className="input-box">
            <Input.Password
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              } // Biểu tượng ẩn/hiện
              prefix={<FaLock className="icon" />} // Thêm biểu tượng khóa
              className="custom-input"
            />
          </div>
          <div className="member-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account? <NavLink to="/register">Register</NavLink>
            </p>
          </div>
        </form>
      </div>
>>>>>>> origin/main
    </div>
  );
};

export default LoginForm;
