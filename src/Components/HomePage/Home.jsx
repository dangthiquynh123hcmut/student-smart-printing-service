import "./Home.css";
import React from 'react';

function Home() {
   
    return (
        <div className="Home">
            <div>
                <div className="banner">
                    <img
                        src="https://lms.hcmut.edu.vn/pluginfile.php/3/theme_academi/slide1image/1725955904/slbk.jpg"
                        alt="Trường Đại học Bách Khoa"
                        className="banner-image"
                    />
                    <div className="banner-text">
                        <h1 className="first-h1">TRƯỜNG ĐẠI HỌC BÁCH KHOA - ĐHQG TP HỒ CHÍ MINH</h1>
                        <h1 style={{marginTop: "15px"}}>SMART PRINTING SYSTEM</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;