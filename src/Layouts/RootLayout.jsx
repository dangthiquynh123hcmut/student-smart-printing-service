import { Outlet } from "react-router-dom";
import { Button, Layout } from "antd";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import MenuList from "../Components/MenuBar/MenuList";
import React from "react";
import "../Layouts/Layout.css";
import "./UserInfo.jsx";
import UserInfo from "./UserInfo.jsx";

const { Header, Sider } = Layout;
function RootLayout() {
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
        
        <UserInfo/>
      </div>
       
      </Header>
      <Layout className="layout-sidebar">
        <Sider
          className="sidebar"
          width={225} 
          collapsedWidth={80}
          collapsed={collapsed}
          collapsible
          trigger={null}
          style={{
            transition: "all 0.3s ease",
          }}
        >
          <MenuList/>
        </Sider>

        <main>
          <Outlet />
        </main>
      </Layout>
    </div>
  );
}

export default RootLayout;
