import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Authentication/Authenticate";


import {
  HomeOutlined,
  ClockCircleOutlined,
  PrinterOutlined,
  DollarOutlined,
  BarChartOutlined,
  EyeOutlined,
  FileAddOutlined,
  SettingOutlined,
  EditOutlined
} from "@ant-design/icons";
import "./MenuList.css";
const {SubMenu} =Menu

function MenuList() {
  const { token, userData } = useContext(AuthContext);

  // console.log(userData.admin)
  return (
    <Menu mode="inline" className="menu-bar">
      {!(userData?.result.role === "ADMIN") && <Menu.Item key="home" icon={<HomeOutlined />}>
        <NavLink to="/">Home</NavLink>
      </Menu.Item>}

      {(userData?.result.role === "ADMIN") && <Menu.Item key="adHome" icon={<HomeOutlined />}>
        <NavLink to="/">Trang Chủ</NavLink>
      </Menu.Item>}


      {!(userData?.result.role === "ADMIN") && <Menu.Item key="print" icon={<PrinterOutlined />}>
        <NavLink to="/print">Print</NavLink>
      </Menu.Item>}

      {!(userData?.result.role === "ADMIN") && <Menu.Item key="history" icon={<ClockCircleOutlined />}>
        <NavLink to="/history">History</NavLink>
      </Menu.Item>}



      {!(userData?.result.role === "ADMIN") && <Menu.Item key="payment" icon={<DollarOutlined />}>
      <NavLink to="/payment">Thanh toán</NavLink>
      </Menu.Item>}
      {/* {!(userData?.result.role === "ADMIN") && <Menu.Item key="updateUser" icon={<EditOutlined />}>
      <NavLink to="/updateUser">Chỉnh sửa thông tin</NavLink>
      </Menu.Item>} */}


      {(userData?.result.role === "ADMIN") && <Menu.Item key="printers" icon={<PrinterOutlined />}>
      <NavLink to="/printers">Quản lý máy in</NavLink>

      </Menu.Item>}
      {/* {userData?.admin && <Menu.Item key="Configuration" icon={<SettingOutlined />}>
      <NavLink to="/configuration">Cấu hình in</NavLink>
      </Menu.Item>} */}

      {(userData?.result.role === "ADMIN") && <SubMenu key="report" className="submenu" icon={<BarChartOutlined />} title="Quản lí báo cáo">
        <Menu.Item key="old-report" icon={<EyeOutlined />}>
          <NavLink to="/oldReport">Xem báo cáo cũ</NavLink>
        </Menu.Item>
        <Menu.Item key="create-report" icon={<FileAddOutlined />}>
          <NavLink to="/createReport">Tạo báo cáo mới</NavLink>
        </Menu.Item>
      </SubMenu>}

    </Menu>
  );
}

export default MenuList;
