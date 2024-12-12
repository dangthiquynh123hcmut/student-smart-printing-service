import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
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
  EditOutlinedFolderOutlined,
  SafetyOutlined,
  UserOutlined,
  DropboxOutlined,
  FieldTimeOutlined,
  FolderOutlined
} from "@ant-design/icons";
import "./MenuList.css";
import MenuItem from "antd/es/menu/MenuItem";
const {SubMenu} =Menu

function MenuList() {
  const { userData } = useContext(AuthContext);
  const location = useLocation();
  const selectedKey = location.pathname; // Đồng bộ trạng thái mục được chọn

  // Kiểm tra vai trò người dùng
  const isAdmin = userData?.result.role === "ADMIN";

  return (
    <Menu mode="inline" className="menu-bar" selectedKeys={[selectedKey]}>
      {/* Menu chung */}
      <Menu.Item key="/" icon={<HomeOutlined style={{ fontSize: 22 }} />}>
        <NavLink to="/">Trang chủ</NavLink>
      </Menu.Item>

      {!isAdmin && (
        <>
          <Menu.Item key="/file" icon={<FolderOutlined style={{ fontSize: 22 }} />}>
            <NavLink to="/file">Tập tin</NavLink>
          </Menu.Item>
          <Menu.Item key="/print" icon={<PrinterOutlined style={{ fontSize: 22 }} />}>
            <NavLink to="/print">In ấn</NavLink>
          </Menu.Item>
          <Menu.Item key="/history" icon={<ClockCircleOutlined style={{ fontSize: 22 }} />}>
            <NavLink to="/history">Lịch sử in</NavLink>
          </Menu.Item>
          <Menu.Item key="/payment" icon={<DollarOutlined style={{ fontSize: 22 }} />}>
            <NavLink to="/payment">Thanh toán</NavLink>
          </Menu.Item>
        </>
      )}

      {isAdmin && (
        <>
          <Menu.Item key="/printers" icon={<PrinterOutlined style={{ fontSize: 22 }} />}>
            <NavLink to="/printers">Quản lý máy in</NavLink>
          </Menu.Item>
          <Menu.Item key="/warranty" icon={<SafetyOutlined style={{ fontSize: 22 }} />}>
            <NavLink to="/warranty">Bảo hành máy in</NavLink>
          </Menu.Item>
          <Menu.Item key="/price-setting" icon={<DollarOutlined style={{ fontSize: 22 }} />}>
            <NavLink to="/price-setting">Cập nhật giá in</NavLink>
          </Menu.Item>
        <Menu.Item key="report" className="submenu" icon={<EyeOutlined style={{ fontSize: 22 }} />} >
          <NavLink to="/AdHistory">Lịch sử in</NavLink>
        </Menu.Item>

      <Menu.Item key="material-storage" icon={<DropboxOutlined style={{ fontSize: 22 }} />} > 
        <NavLink to="/materialStorage"> Material Storage </NavLink>
      </Menu.Item>
      
      <Menu.Item key="material-history" icon={<BarChartOutlined style={{ fontSize: 22 }} />} > 
        <NavLink to="/materialHistory"> Material History</NavLink>
      </Menu.Item>
      </>
      )}
    </Menu>
  );
}

export default MenuList;