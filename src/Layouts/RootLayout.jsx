import { Outlet } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from "@ant-design/icons";
import MenuList from "../Components/MenuBar/MenuList";
import React from "react";
import "../Layouts/Layout.css";
import "./UserInfo.jsx";
import UserInfo from "./UserInfo.jsx";

// import Sider from "antd/es/layout/Sider";

const { Header, Sider } = Layout;
function RootLayout({userData}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="page-wrapper">
      <Header className="header">
        <div className="logobk"></div>
        <Button
          className="menu-button-toggle"
          onClick={() => setCollapsed(!collapsed)}
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <div className="right-corner">
          <Button className="notification-button" icon={<BellOutlined />} />
          <UserInfo userData={userData} />
        </div>
      </Header>
      <Layout className="layout-sidebar">
        <Sider
          className="sidebar"
          collapsed={collapsed}
          collapsible
          trigger={null}
        >
          <MenuList userData = {userData}/>
        </Sider>

        <main>
          <Outlet />
        </main>
      </Layout>
    </div>
  );
}

export default RootLayout;
