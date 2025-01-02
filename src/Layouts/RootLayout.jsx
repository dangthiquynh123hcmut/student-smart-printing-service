import { Outlet } from "react-router-dom";
import { Button, Layout, Drawer } from "antd";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import MenuList from "../Components/MenuBar/MenuList";
import React from "react";
import "../Layouts/Layout.css";
import UserInfo from "./UserInfo.jsx";

const { Header, Sider } = Layout;

function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="page-wrapper">
      <Header className="header">
        <div className="logobk"></div>
        <Button
          className="menu-button-toggle"
          onClick={() => {
            if (isMobile) {
              setIsDrawerVisible(true); 
            } else {
              setCollapsed(!collapsed); 
            }
          }}
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <div className="right-corner">
          <UserInfo />
        </div>
      </Header>

      <Layout className="layout-sidebar">
        {!isMobile && (
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
            <MenuList />
          </Sider>
        )}

        {isMobile && (
          <Drawer
            title="Menu"
            placement="left"
            onClose={() => setIsDrawerVisible(false)}
            visible={isDrawerVisible}
            bodyStyle={{ padding: 0 }}
            width="55%" 
          >
            <MenuList />
          </Drawer>
        )}

        <main>
          <Outlet />
        </main>
      </Layout>
    </div>
  );
}

export default RootLayout;
