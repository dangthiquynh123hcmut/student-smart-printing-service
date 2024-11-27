import React from "react";
import { Button, Form, Input, notification, DatePicker } from "antd";
import { useState } from "react";
// import { createUserApi } from "../../api/API";
import { useNavigate } from "react-router-dom";
import "./Register.css";
const RegisterPage = () => {
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


  const onFinish = async (formValues) => {
    const { firstname, email, password, lastname,id,date,username } = formValues;
    console.log(formValues)
    try {
      const response = await fetch("https://projectprintmachine-backend.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstname,
          lastName:lastname,
          mssv:id,
          birthDate:date,
          username:username,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      notification.success({
          message: "Register SUCCESS",
          description: "Success",
      });
  
      navigate("/login");

    } catch (error) {
      console.error("Error:", error);
      notification.error({
              message: "Register Failed",
              description: "Try Again, @hcmut.edu.vn",
      });
    }


  };

  return (
    <div className="register-form" style={{ padding: "50px"  }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          // backdropFilter: 'blur(10px)',

          
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          // value={formValues.email} // Bind value to state
          // onChange={handleChange}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="Email should have @hcmut.edu.vn"/>
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          // value={formValues.username} // Bind value to state
          // onChange={handleChange}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="At least 8 characters"/>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          // value={formValues.password} // Bind value to state
          // onChange={handleChange}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
        <Input.Password placeholder="At least 8 characters"/>
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstname"
          // value={formValues.firstname} // Bind value to state
          // onChange={handleChange}
          rules={[
            {
              required: true,
              message: "Please input your First name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastname"
          // value={formValues.lastname} // Bind value to state
          // onChange={handleChange}
          rules={[
            {
              required: true,
              message: "Please input your Last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Id"
          name="id"
          // value={formValues.id} // Bind value to state
          // onChange={handleChange}
          rules={[
            {
              required: true,
              message: "Please input your ID!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Date of birth"
          name="date"
          // value={formValues.date} // Bind value to state
          // onChange={handleChange}
          
          rules={[
            {
              required: true,
              message: "Please select your date: year-month-date!",
            },
          ]}
        >
          <Input placeholder="Ex: 2000-01-01"/>
        </Form.Item>



        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <div className="imageBK"></div> */}
    </div>
  );
};

export default RegisterPage;
