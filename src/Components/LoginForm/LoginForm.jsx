
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { notification, Input } from "antd";
import "./LoginForm.css";
import { AuthContext } from "../Authentication/Authenticate";

import { FaUser, FaLock } from "react-icons/fa"; // Sử dụng FaLock cho mật khẩu
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import PropTypes from "prop-types";

// import { loginApi} from "../../api/API";

const LoginForm = () => {
  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //check token exsit

  // Handle form submission
  const onFinish = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;
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
      console.log(data);
      notification.success({
        message: "Login SUCCESS",
        description: "Success",
      });
      localStorage.setItem("token", data.result.token);
      setToken(data.result.token); // Cập nhật token trong AuthContext
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Login Failed",
        description: "Username or password wrong",
      });
    }

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
    </div>
  );
};

// LoginForm.prototype = {
//   setToken: PropTypes.func.isRequired,
// };

export default LoginForm;
