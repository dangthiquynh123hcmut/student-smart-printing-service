import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import InfoDetail from "../Layouts/InfoDetail/InfoDetail";
import { Button } from "antd";
import "./Layout.css";

function UserInfo() {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="info-form">
      <UserOutlined className="user-icon" />
      <ul className="info-list">
        <li style={{ fontWeight: "bold", color: "white" }}>Username</li>
        <li style={{ color: "white" }}>Role</li>
      </ul>
      <Button
        className="dropdown"
        icon={<CaretDownOutlined />}
        onClick={() => setOpenProfile(!openProfile)}
      ></Button>
      {openProfile && <InfoDetail />}
    </div>
  );
}

export default UserInfo;
