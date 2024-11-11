import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import React, { useState, useContext } from "react";
import InfoDetail from "../Layouts/InfoDetail/InfoDetail";
import { Button } from "antd";
import "./Layout.css";
import { AuthContext } from "../Components/Authentication/Authenticate";

function UserInfo() {
  const [openProfile, setOpenProfile] = useState(false);
  const { token, userData } = useContext(AuthContext);

  return (
    <div className="info-form">
      <UserOutlined className="user-icon" />
      <ul className="info-list">
        <li style={{ fontWeight: "bold", color: "white" }}>{userData?.name}</li>
        <li style={{ color: "white" }}>{userData?.result.role}</li>
      </ul>
      <Button
        className="dropdown"
        icon={<CaretDownOutlined />}
        onClick={() => setOpenProfile(!openProfile)}
      ></Button>
      {openProfile && <InfoDetail/>}
    </div>
  );
}

export default UserInfo;
