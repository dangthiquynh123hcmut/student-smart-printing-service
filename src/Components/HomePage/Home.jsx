import React from "react";
import "./Home.css";
import { UserOutlined } from '@ant-design/icons';

export default function Home() {

  return (
    <div className="homepage">
      {/* Phần hình ảnh nền */}
      <div className="banner">
        <img
          src="https://lms.hcmut.edu.vn/pluginfile.php/3/theme_academi/slide1image/1725955904/slbk.jpg"
          alt="Trường Đại học Bách Khoa"
          className="banner-image"
        />
        <div className="banner-text">
          <h1>TRƯỜNG ĐẠI HỌC BÁCH KHOA - ĐHQG TP HỒ CHÍ MINH</h1>
          <h2>SMART PRINTING SYSTEM</h2>
        </div>
      </div>

      {/* Phần thông báo chung */}
      <div className="notification-section">
        <h3>Thông báo chung</h3>

        <div className="notification">
          
            <UserOutlined  className="notification-icon"/>
          
          <div className="notification-content">
            <h4>Thông báo máy in H6211 tạm ngưng hoạt động</h4>
            <p className="notification-date">Bởi SPSO - Thứ tư, 3/1/2024</p>
            <p className="notification-text">
              Kể từ ngày 03/01/2024, nhà trường sẽ thay thế hệ thống BKeL cũ bằng hệ thống BKeL mới.
              Các bạn sinh viên sử dụng hệ thống mới cho các môn học kỳ 2 năm học 2023-2024.
              Sinh viên cần cập nhật địa chỉ <a href="https://lms.hcmut.edu.vn">lms.hcmut.edu.vn</a> hệ thống BKeL mới.
            </p>
          </div>
        
        </div>


      {/* delete after test */}

      <div className="notification">
          
            <UserOutlined  className="notification-icon"/>
          
          <div className="notification-content">
            <h4>Thông báo máy in H6211 tạm ngưng hoạt động</h4>
            <p className="notification-date">Bởi SPSO - Thứ tư, 3/1/2024</p>
            <p className="notification-text">
              Kể từ ngày 03/01/2024, nhà trường sẽ thay thế hệ thống BKeL cũ bằng hệ thống BKeL mới.
              Các bạn sinh viên sử dụng hệ thống mới cho các môn học kỳ 2 năm học 2023-2024.
              Sinh viên cần cập nhật địa chỉ <a href="https://lms.hcmut.edu.vn">lms.hcmut.edu.vn</a> hệ thống BKeL mới.
            </p>
          </div>
        
        </div>

        <div className="notification">
          
            <UserOutlined  className="notification-icon"/>
          
          <div className="notification-content">
            <h4>Thông báo máy in H6211 tạm ngưng hoạt động</h4>
            <p className="notification-date">Bởi SPSO - Thứ tư, 3/1/2024</p>
            <p className="notification-text">
              Kể từ ngày 03/01/2024, nhà trường sẽ thay thế hệ thống BKeL cũ bằng hệ thống BKeL mới.
              Các bạn sinh viên sử dụng hệ thống mới cho các môn học kỳ 2 năm học 2023-2024.
              Sinh viên cần cập nhật địa chỉ <a href="https://lms.hcmut.edu.vn">lms.hcmut.edu.vn</a> hệ thống BKeL mới.
            </p>
          </div>
        
        </div>

      </div>
    </div>
  );

}
