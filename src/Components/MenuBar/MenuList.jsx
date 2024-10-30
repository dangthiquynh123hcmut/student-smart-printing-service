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
  // console.log(userData.admin)
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


      {!userData?.admin && <Menu.Item key="payment" icon={<DollarOutlined />}>
      <NavLink to="/payment">Thanh toán</NavLink>

      </Menu.Item>}

      {userData?.admin && <Menu.Item key="printers" icon={<PrinterOutlined />}>
      <NavLink to="/printers">Quản lý máy in</NavLink>

      </Menu.Item>}
      

    </Menu>
  );
}

export default MenuList;
