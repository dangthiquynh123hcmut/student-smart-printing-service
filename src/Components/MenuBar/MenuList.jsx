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
<<<<<<< HEAD
  SafetyOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import "./MenuList.css";

const { SubMenu } = Menu;
=======
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
>>>>>>> origin/main

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

<<<<<<< HEAD
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
          <SubMenu
            key="/report"
            className="submenu"
            icon={<BarChartOutlined style={{ fontSize: 22 }} />}
            title="Quản lí báo cáo"
          >
            <Menu.Item key="/oldReport" icon={<EyeOutlined style={{ fontSize: 22 }} />}>
              <NavLink to="/oldReport">Xem báo cáo cũ</NavLink>
            </Menu.Item>
            <Menu.Item key="/createReport" icon={<FileAddOutlined style={{ fontSize: 22 }} />}>
              <NavLink to="/createReport">Tạo báo cáo mới</NavLink>
            </Menu.Item>
          </SubMenu>
        </>
      )}
=======
      {(userData?.result.role === "ADMIN") && <Menu.Item key="adHome" icon={<HomeOutlined style={{ fontSize: 22 }} />}>
        <NavLink to="/">Trang chủ</NavLink>
      </Menu.Item>}

      {!(userData?.result.role === "ADMIN") && <Menu.Item key="file" icon={<FolderOutlined style={{ fontSize: 22 }} />}>
      <NavLink to="/file">Tệp</NavLink>
      </Menu.Item>}

      {!(userData?.result.role === "ADMIN") && <Menu.Item key="print" icon={<PrinterOutlined style={{ fontSize: 22 }} />}>
        <NavLink to="/print">In ấn</NavLink>
      </Menu.Item>}

      {!(userData?.result.role === "ADMIN") && <Menu.Item key="history" icon={<ClockCircleOutlined style={{ fontSize: 22 }} />}>
        <NavLink to="/history">Lịch sử in</NavLink>
      </Menu.Item>}



      {!(userData?.result.role === "ADMIN") && <Menu.Item key="payment" icon={<DollarOutlined style={{ fontSize: 22 }} />}>
      <NavLink to="/payment">Thanh toán</NavLink>
      </Menu.Item>}
     


      {(userData?.result.role === "ADMIN") && <Menu.Item key="printers" icon={<PrinterOutlined style={{ fontSize: 22 }} />}>
      <NavLink to="/printers">Quản lý máy in</NavLink>
      </Menu.Item>}

      
      {(userData?.result.role === "ADMIN") && <Menu.Item key="warranty" icon={<SafetyOutlined style={{ fontSize: 22 }} />}>
      <NavLink to="/warranty">Bảo hành máy in</NavLink>
      </Menu.Item>}
      {/* {userData?.admin && <Menu.Item key="Configuration" icon={<SettingOutlined />}>
      <NavLink to="/configuration">Cấu hình in</NavLink>
      </Menu.Item>} */}
      {(userData?.result.role === "ADMIN") && <Menu.Item key="priceSetting" icon={<DollarOutlined style={{ fontSize: 22 }} />}>
      <NavLink to="/price-setting">Cập nhật giá in</NavLink>


      </Menu.Item>}

      {(userData?.result.role === "ADMIN") && <SubMenu key="report" className="submenu" icon={<FieldTimeOutlined style={{ fontSize: 22 }} />} title="Quản lí báo cáo">
        <Menu.Item key="old-report" icon={<EyeOutlined style={{ fontSize: 22 }} />}>
          <NavLink to="/oldReport">Xem báo cáo cũ</NavLink>
        </Menu.Item>
        <Menu.Item key="create-report" icon={<FileAddOutlined style={{ fontSize: 22 }} />}>
          <NavLink to="/createReport">Tạo báo cáo mới</NavLink>
        </Menu.Item>

      </SubMenu>}

      {(userData?.result.role === "ADMIN")&&
      <Menu.Item key="material-storage" icon={<DropboxOutlined style={{ fontSize: 22 }} />} > 
        <NavLink to="/materialStorage"> Material Storage </NavLink>
      </Menu.Item>
      }
      {(userData?.result.role === "ADMIN")&&
      <Menu.Item key="material-history" icon={<BarChartOutlined style={{ fontSize: 22 }} />} > 
        <NavLink to="/materialHistory"> Material History</NavLink>
      </Menu.Item>
      }
>>>>>>> origin/main
    </Menu>
  );
}

export default MenuList;
