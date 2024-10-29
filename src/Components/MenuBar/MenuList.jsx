import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  ClockCircleOutlined,
  PrinterOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import "./MenuList.css";
function MenuList({userData}) {
  return (
    <Menu mode="inline" className="menu-bar">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      {!userData?.admin && <Menu.Item key="print" icon={<PrinterOutlined />}>
        <NavLink to="/print">Print</NavLink>
      </Menu.Item>}
      {!userData?.admin && <Menu.Item key="history" icon={<ClockCircleOutlined />}>
        <NavLink to="/history">History</NavLink>
      </Menu.Item>}
      <Menu.Item key="payment" icon={<DollarOutlined />}>
        <NavLink to="/payment">Payment</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuList;
