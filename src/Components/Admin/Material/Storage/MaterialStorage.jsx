import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Authentication/Authenticate';
import { PlusOutlined } from '@ant-design/icons';
import { Select,Button, Modal,Form, Input, notification } from 'antd';
import InkImage from './ink-pic.jpeg'

const {Option} = Select

function MaterialStorage(){
  const {token} = useContext(AuthContext);
  const [materials, setMaterials] = useState([])
  const [addModalVisible, setIsAddModalVisible] = useState(false)
  const [selectedMaterial,setSelectedMaterial] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading,setLoading] = useState(false)
  const [addMaterial, setAddMaterial] = useState(null)
  const [modifiedValue, setModifiedValue] = useState({
    name:"",
    value:"",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedValue((prev) => ({
        ...prev,
        [name]: value,
        name:selectedMaterial.name,
    }));
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const getMaterialApi = async(e) =>{    
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8080/materialStorage", {
        method: "GET",
        headers : {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
    },
    }  
  );
    if (!response.ok) {
      throw new Error(`Network response was not ok : ${response.status}`);
    }
    const data = await response.json();
    console.log("fetch material success",data.result);
    setMaterials(Array.isArray(data.result) ? data.result : []);
  }
    catch (error) {
      console.error("Fetch failed:", error);
    }
    finally {
      setLoading(false);
    }
  }

  const showModal = (product) => {
    setSelectedMaterial(product);
    setIsModalVisible(true);
  };

  const handleModifiedMaterial =async()=>{
    console.log(modifiedValue)
    if (isNaN(modifiedValue.value)) {
      notification.error({
        message: "Vui lòng nhập một số hợp lệ!",
        description: "Error",
    });
    }
    else{
      notification.info({
        message: "Vui lòng chờ, đang cập nhật",
        description: "Updating"
      })
      await modifiedMaterialApi(); // Chờ API chỉnh sửa hoàn tất
      await getMaterialApi(); // Fetch dữ liệu mới sau khi chỉnh sửa
      setModifiedValue(0)
      handleCloseModal();
    }
  }

  const modifiedMaterialApi= async()=>{
   
  try{
    const response = await fetch("http://localhost:8080/materialStorage/addjustMaterialRequest", {
      method: "POST",
      headers : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name:modifiedValue.name,
        value: modifiedValue.value
      }),
    }  
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.message}`);
  }
  const data = await response.json();
  console.log("Modified material success",data.result);
  }
  catch(error){
      console.error("Modified failed:", error);
      notification.error({
        message: "Update error",
        description: `${error.message}`,
    });
  }
}

  const handleDeleteMaterial= async()=>{
    try{
      const response = await fetch("http://localhost:8080/materialStorage", {
        method: "DELETE",
        headers : {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name:selectedMaterial.name,
        }),
      }  
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok : ${response.status}`);
  }
  const data = await response.json();
  console.log("Delete material success",data.result);

  }catch(error){
      console.error("Modified failed:", error);
      notification.error({
        message: "Delete error",
        description: "Error",
    });
  }
  
  await getMaterialApi(); // Fetch dữ liệu mới sau khi chỉnh sửa
  handleCloseModal();

}
 const handleSelectAddMaterial = (value)=>{
  setAddMaterial(value)
 }

  const handleAddMaterial = async () =>{
    
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMaterial(null);
  };

  useEffect(() =>{
    
      getMaterialApi();
    
  },[]);

  return (
    <div id="wrapper">
      <div id="header">
          <a href="/" className="back-button">
              &larr; Trở về trang chủ
          </a>
          <h1>Material Storage</h1>
      </div>

      <div className="add-button">
          <button onClick={showAddModal} className="add-printer-button">
              <PlusOutlined style={{ marginRight: 8 }} />
              Thêm material
          </button>
      </div>

      <div className="printer-container">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
          ):
           (Array.isArray(materials) && materials.map((material) => (
            <div
                className={`printer `}
                key={material.id}
                style={{"border-bottom": "4px solid"}}
                onClick={() => showModal(material)}
            >
                {material.name!=="COLOR_INK" && material.name!== "BLACK_WHITE_INK" ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD8uGjW28XbcYbGWH3QGVihx2eaFFVRRynNA&s" alt="Ảnh máy in" /> 
                  : <img src={InkImage}/>  
              }
                <h3>Material name {material.name}</h3>
                <p>Material value : {material.value}</p>
            </div>
        )))
        }
          
      </div>

      <Modal title={selectedMaterial?.name}
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={[

                  <Button key="submit" type="primary" onClick={handleDeleteMaterial} danger>
                      Xóa
                  </Button>,
              ]}
        >
          {selectedMaterial &&(
            <>
              {selectedMaterial.name!=="COLOR_INK" && selectedMaterial.name!== "BLACK_WHITE_INK" ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD8uGjW28XbcYbGWH3QGVihx2eaFFVRRynNA&s" alt="Ảnh máy in" /> 
                : <img src={InkImage}/>  }
              
              <div>
              <p>Date update: {selectedMaterial.dateUpdate}</p>

                <p>Value : {selectedMaterial.value}</p>
                <Form>
                  <Form.Item label="Tăng/giảm">
                        <Input name="value" value={modifiedValue.value} onChange={handleInputChange} />
                    </Form.Item>
                  <Button key="submit" type="primary" onClick={handleModifiedMaterial}> Điều chỉnh </Button>
                </Form>
                
              </div>
            </>
          
          )}
      </Modal>

      <Modal title="Add Material"
        visible={addModalVisible}
        footer={[

          <Button key="submit" type="primary" onClick={handleAddMaterial}>
              Thêm
          </Button>,
      ]}
      >

      <>
      <img src='https://adsmo.vn/wp-content/uploads/2019/11/in-an.png' style={{"width":"100%"}}/>
      <Select
      className='select'
        placeholder="Chọn Material"
        style={{ width: '120px' }}
        value={addMaterial}
        onChange={handleSelectAddMaterial}
        
      >
        <Option value="A5Page">A5Page</Option>
        <Option value="A4Page">A4Page</Option>
        <Option value="A3Page">A3Page</Option>
        <Option value="A2Page">A2Page</Option>
        <Option value="A1Page">A1Page</Option>
        <Option value="A0Page">A0Page</Option>
        <Option value="BLACK_WHITE_INK">BLACK_WHITE_INK</Option>
        <Option value="COLOR_INK">COLOR_INK</Option>

      </Select>
      </>

      </Modal>


    </div>
  );
}

export default MaterialStorage;
