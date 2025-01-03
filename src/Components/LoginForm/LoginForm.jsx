import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { notification, Input } from "antd";
import "./LoginForm.css";
import { AuthContext } from "../Authentication/Authenticate";

import { FaUser, FaLock } from "react-icons/fa";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

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
  const API_URL = process.env.REACT_APP_DB_URL;
  const onFinish = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;

    try {
      const response = await fetch(`${API_URL}/auth/token`, {
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
      //console.log(data);
      notification.success({
        message: "Đăng nhập thành công",
        // description: "Success",
      });
      localStorage.setItem("token", data.result.token);
      setToken(data.result.token);
      navigate("/");
    } catch (error) {
      //console.error("Error:", error);
      notification.error({
        message: "Login Failed",
        description: "Username or password wrong",
      });
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form action="" onSubmit={onFinish}>
          {" "}
          <h1>Đăng nhập</h1>
          <div className="input-box">
            <Input
              type="text"
              placeholder="Tên đăng nhập"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
              prefix={<FaUser className="icon" />}
              className="custom-input"
            />
          </div>
          <div className="input-box">
            <Input.Password
              placeholder="Mật khẩu"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              prefix={<FaLock className="icon" />}
              className="custom-input"
            />
          </div>
          <div className="member-forgot">
            <label>
              <input type="checkbox" />
              Nhớ mật khẩu
            </label>
            <a href="#">Quên mật khẩu?</a>
          </div>
          <button type="submit">Đăng nhập</button>
          <div className="register-link">
            <p>
              Chưa có tài khoản? <NavLink to="/register">Đăng kí</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
