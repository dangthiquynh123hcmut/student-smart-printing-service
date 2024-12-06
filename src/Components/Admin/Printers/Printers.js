import "./Printers.css";
import printerImage from '../../Assets/printer-img.jpg';
import { useState, useEffect } from "react";
import { Input, Pagination, Modal, Button, Form, notification, Switch, Select } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { postNewPrinterApi, editPrinterInfo, deletePrinter, addPrinterMaterial, getAllPrinter } from "../../../api/adminApi";

function Printers() {
    const [printers, setPrinters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isAddMaterial, setIsAddMaterial] = useState(false);
    const token = localStorage.getItem("token");
    const [newPrinter, setNewPrinter] = useState({
        name: "",
        manufacturer: "",
        model: "",
        description: "",
        base: "",
        building: "",
        floor: "",
        blackWhiteInkStatus: 500,
        colorInkStatus: 500,
        a0paperStatus: 500,
        a1paperStatus: 500,
        a2paperStatus: 500,
        a3paperStatus: 500,
        a4paperStatus: 500,
        a5paperStatus: 500,
        capacity: 500,
        warrantyDate: "",
    });

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddMaterialModal, setIsAddMaterialModal] = useState(false);
    const [editedPrinter, setEditedPrinter] = useState({});
    const [addedPrinter, setAddedPrinter] = useState({});
    const { Option } = Select;
    const paperType = [
        { value: "A0Page", label: "A0" },
        { value: "A1Page", label: "A1" },
        { value: "A2Page", label: "A2" },
        { value: "A3Page", label: "A3" },
        { value: "A4Page", label: "A4" },
        { value: "A5Page", label: "A5" },
        { value: "COLOR_INK", label: "In Màu" },
        { value: "BLACK_WHITE_INK", label: "Đen Trắng" }
    ];
    const [materialType, setMaterialType] = useState(null);
    const [amount, setAmount] = useState(0);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // const currentProducts = printers.slice(indexOfFirstProduct, indexOfLastProduct);
    // const totalPages = Math.ceil(printers.length / productsPerPage);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBase, setSelectedBase] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const baseOptions = [...new Set(printers.map(printer => printer.address.base))];
    const buildingOptions = [...new Set(printers.map(printer => printer.address.building))];
    const floorOptions = [...new Set(printers.map(printer => printer.address.floor))];

    const statusOptions = [
        { value: "", label: "Tất cả" },
        { value: "active", label: "Đang hoạt động" },
        { value: "inactive", label: "Tạm dừng" },
    ];

    // Hàm xử lý tìm kiếm
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Lọc danh sách máy in theo tên và vị trí
    const filteredPrinters = printers.filter(printer =>
        printer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedBase ? printer.address.base === selectedBase : true) &&
        (selectedBuilding ? printer.address.building === selectedBuilding : true) &&
        (selectedFloor ? printer.address.floor === selectedFloor : true) &&
        (selectedStatus ? (selectedStatus === "active" ? printer.status : !printer.status) : true)
    );

    const currentProducts = filteredPrinters.slice(indexOfFirstProduct, indexOfLastProduct);



    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const showModal = (product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
    };

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalVisible(false);
        setNewPrinter({
            name: "",
            manufacturer: "",
            model: "",
            description: "",
            base: "",
            building: "",
            floor: "",
            paperStatus: 500,
            capacity: 500,
            warrantyDate: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPrinter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitNewPrinter = () => {
        if (!newPrinter.base || !newPrinter.building || !newPrinter.floor || !newPrinter.name || !newPrinter.manufacturer || !newPrinter.model || !newPrinter.description) {
            notification.error({
                message: "Vui lòng điền đầy đủ thông tin",
                description: "Error",
            });
            return;
        }


        postNewPrinterApi(token, newPrinter)

            .then((response) => {
                const data = response.data;
                setPrinters((prev) => [...prev, data]);
                handleCloseAddModal();
                notification.success({
                    message: "Thêm máy in thành công",
                    description: "Success",
                });
            })
            .catch((error) => {
                notification.error({
                    message: "Không thể thêm máy in",
                    description: `Lỗi: ${error.message}`,
                });
            });
    };

    const showEditModal = () => {
        setEditedPrinter(selectedProduct || {});
        setIsEditModalVisible(true);
        // handleCloseModal();
    };
    const showAddMaterialModal = () => {
        setAddedPrinter(selectedProduct || {});
        setIsAddMaterialModal(true);
        setIsEditModalVisible(false);
    };
    const resetModal = () => {
        setMaterialType(null);
        setAmount(0);
    };

    const handleSubmitEditPrinter = () => {
        const { id, status } = editedPrinter;


        editPrinterInfo(token, id, status)

            .then((response) => {
                const updatedPrinter = response.data;
                setPrinters((prev) => prev.map((printer) => (printer.id === updatedPrinter.id ? updatedPrinter : printer)));
                setIsEditModalVisible(false);
                setIsEdit(!isEdit);
                notification.success({
                    message: "Cập nhật trạng thái máy in thành công",
                    description: "Success",
                });
                setIsModalVisible(false);
            })
            .catch((error) => {
                notification.error({
                    message: "Không thể cập nhật trạng thái máy in",
                    description: `Lỗi: ${error.message}`,
                });
            });
    };

    const showDeleteConfirmation = () => {
        Modal.confirm({
            title: 'Bạn chắc chắn muốn xóa máy in?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => {
                handleDeletePrinterConfirmed();
            },
            onCancel() {
                handleCloseModal();
            },
        });
    };

    const handleDeletePrinterConfirmed = () => {

        deletePrinter(token, selectedProduct.id)

            .then(() => {
                setPrinters(prevPrinters => prevPrinters.filter(printer => printer.id !== selectedProduct.id));
                notification.success({
                    message: `Xóa máy in thành công máy in ID ${selectedProduct.id}`,
                    description: "Success",
                });
                handleCloseModal();
            })
            .catch((error) => {
                notification.error({
                    message: "Không thể xóa máy in",
                    description: `Lỗi: ${error.message}`,
                });
            });
    };

    const handleDeletePrinter = () => {
        showDeleteConfirmation();
    };

    const handleAddMaterialPrinter = () => {
        const data = {
            printerId: addedPrinter.id,
            materialType: materialType,
            amount: amount,
        };


        addPrinterMaterial(token, data)

            .then((response) => {
                notification.success({
                    message: "Thêm vật liệu thành công",
                    description: "Vật liệu đã được thêm vào máy in.",
                });
                resetModal();
                setIsAddMaterialModal(false);
                setIsModalVisible(false);
                setIsAddMaterial(!isAddMaterial);
            })
            .catch((error) => {
                notification.error({
                    message: "Không thể thêm vật liệu",
                    description: `Lỗi: ${error.message}`,
                });
            });
    };

    useEffect(() => {

        getAllPrinter(token)

            .then((res) => {
                setPrinters(res.data.result);
            })
            .catch((error) => {
                console.error("Error fetching printers:", error);
            });
    }, [isEdit, isAddMaterial]);

    const resetFilters = () => {
        setSelectedBase("");
        setSelectedBuilding("");
        setSelectedFloor("");
        setSelectedStatus("");
    };

    return (
        <div id="wrapper">
            <div id="header">
                <a href="/" className="back-button">
                    &larr; Trở về trang chủ
                </a>
                <h1>Quản lý máy in</h1>
            </div>
            <div className="search-wrapper">
                <Input
                    placeholder="Nhập tên máy in"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{
                        borderRadius: "5px",
                        padding: "10px",
                        width: "40%",
                    }}
                    prefix={<SearchOutlined />}
                />
            </div>
            <div className="filter-and-button-wrapper">
                <div className="filter-wrapper">
                    <div>
                        {/* <p>Cơ sở</p> */}
                        <Select
                            placeholder="Chọn cơ sở"
                            value={selectedBase || undefined}
                            onChange={value => {
                                setSelectedBase(value);
                                setSelectedBuilding("");
                                setSelectedFloor("");
                            }}
                        >
                            {baseOptions.map(base => (
                                <Option key={base} value={base}>{base}</Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        {/* <p>Tòa</p> */}
                        <Select
                            placeholder="Chọn tòa"
                            value={selectedBuilding || undefined}
                            onChange={value => {
                                setSelectedBuilding(value);
                                setSelectedFloor("");
                            }}
                        >
                            {buildingOptions.map(building => (
                                <Option key={building} value={building}>{building}</Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        {/* <p>Tầng</p> */}
                        <Select
                            placeholder="Chọn tầng"
                            value={selectedFloor || undefined}
                            onChange={setSelectedFloor}
                        >
                            {floorOptions.map(floor => (
                                <Option key={floor} value={floor}>{floor}</Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        {/* <p>Trạng thái</p> */}
                        <Select
                            placeholder="Chọn trạng thái"
                            value={selectedStatus || undefined}
                            onChange={setSelectedStatus}
                        >
                            {statusOptions.map(status => (
                                <Option key={status.value} value={status.value}>
                                    {status.label}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Button color="default" variant="solid" onClick={resetFilters} className="reset-button">
                            Reset
                        </Button>
                    </div>
                </div>

                <div className="add-button" style={{ marginLeft: "auto" }}>
                    <button onClick={showAddModal} className="add-printer-button">
                        Thêm máy in
                    </button>
                </div>
            </div>

            <div className="printer-container">
                {currentProducts && currentProducts.map((product) => (
                    <div
                        className={`printer ${product.status ? 'active' : 'inactive'}`}
                        key={product.id}
                        onClick={() => showModal(product)}
                    >
                        <img src={printerImage} alt="Ảnh máy in" />
                        <h3>Máy in {product.name}</h3>
                        <p>{product.address.base}, tòa {product.address.building}, tầng {product.address.floor}</p>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <Pagination
                    current={currentPage}
                    pageSize={productsPerPage}
                    total={printers.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>

            <Modal
                title={selectedProduct?.name}
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button type="primary" key="edit" onClick={showEditModal}>
                        Chỉnh sửa
                    </Button>,
                    <Button type="primary" key="delete" onClick={handleDeletePrinter} danger>
                        Xóa
                    </Button>,
                ]}
            >
                {selectedProduct && (
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                        <img
                            src={printerImage}
                            alt="Ảnh máy in"
                            style={{ width: "150px", height: "auto", marginRight: "20px" }}
                        />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", margin: "10px 0" }}>
                                <p style={{ margin: 0 }}>
                                    <span className={`status-box ${selectedProduct.status ? "status-active" : "status-inactive"}`}>
                                        {selectedProduct.status ? "Đang hoạt động" : "Tạm dừng"}
                                    </span>
                                </p>
                            </div>

                            <p><strong>Kiểu in:</strong> {selectedProduct.model}</p>
                            <p><strong>Vị trí:</strong> {selectedProduct.address.base}, tòa {selectedProduct.address.building}, tầng {selectedProduct.address.floor}</p>
                            <p><strong>Mực in trắng đen:</strong> {selectedProduct.blackWhiteInkStatus}</p>
                            <p><strong>Mực in màu:</strong> {selectedProduct.colorInkStatus}</p>
                            <p><strong>Số giấy A0:</strong> {selectedProduct.a0paperStatus}</p>
                            <p><strong>Số giấy A1:</strong> {selectedProduct.a1paperStatus}</p>
                            <p><strong>Số giấy A2:</strong> {selectedProduct.a2paperStatus}</p>
                            <p><strong>Số giấy A3:</strong> {selectedProduct.a3paperStatus}</p>
                            <p><strong>Số giấy A4:</strong> {selectedProduct.a4paperStatus}</p>
                            <p><strong>Số giấy A5:</strong> {selectedProduct.a5paperStatus}</p>
                            <p><strong>Sức chứa:</strong> {selectedProduct.capacity}</p>
                            <p><strong>Ngày bảo hành:</strong> {new Date(selectedProduct.warrantyDate).toLocaleDateString("vi-VN")}</p>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                title="Thêm Máy In"
                visible={isAddModalVisible}
                onCancel={handleCloseAddModal}
                footer={[
                    <Button key="back" onClick={handleCloseAddModal}>
                        Đóng
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmitNewPrinter}>
                        Thêm
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Tên máy in">
                        <Input name="name" value={newPrinter.name} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Nhà sản xuất">
                        <Input name="manufacturer" value={newPrinter.manufacturer} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Kiểu in">
                        <Input name="model" value={newPrinter.model} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Mô tả">
                        <Input name="description" value={newPrinter.description} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Vị trí">
                        <Input name="base" placeholder="CS1 hoặc CS2" value={newPrinter.base} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Tòa">
                        <Input name="building" placeholder="H6, H1..." value={newPrinter.building} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Tầng">
                        <Input name="floor" placeholder="1, 2..." value={newPrinter.floor} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Mực in trắng đen">
                        <Input type="number" name="blackWhiteInkStatus" value={newPrinter.blackWhiteInkStatus} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Mực in màu">
                        <Input type="number" name="colorInkStatus" value={newPrinter.colorInkStatus} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Số lượng giấy a0">
                        <Input type="number" name="a0paperStatus" value={newPrinter.a0paperStatus} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Số lượng giấy a1">
                        <Input type="number" name="a1paperStatus" value={newPrinter.a1paperStatus} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Số lượng giấy a2">
                        <Input type="number" name="a2paperStatus" value={newPrinter.a2paperStatus} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Số lượng giấy a3">
                        <Input type="number" name="a3paperStatus" value={newPrinter.a3paperStatus} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Số lượng giấy a4">
                        <Input type="number" name="a4paperStatus" value={newPrinter.a4paperStatus} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Số lượng giấy a5">
                        <Input type="number" name="a5paperStatus" value={newPrinter.a5paperStatus} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Sức chứa">
                        <Input type="number" name="capacity" value={newPrinter.capacity} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Ngày bảo hành">
                        <Input type="date" name="warrantyDate" value={newPrinter.warrantyDate} onChange={handleInputChange} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Chỉnh sửa Máy In"
                visible={isEditModalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="addMaterial" onClick={showAddMaterialModal}>
                        Thêm vật liệu
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmitEditPrinter}>
                        Xong
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Trạng thái hoạt động">
                        <Switch
                            checked={editedPrinter.status}
                            onChange={(checked) => setEditedPrinter({ ...editedPrinter, status: checked })}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Thêm vật liệu"
                visible={isAddMaterialModal}
                onCancel={() => setIsAddMaterialModal(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={handleAddMaterialPrinter}>
                        Xong
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Chọn vật liệu">
                        <Select
                            placeholder="A0"
                            style={{ width: 200 }}
                            onChange={value => setMaterialType(value)}
                        >
                            {paperType.map((type) => (
                                <Option key={type.value} value={type.value}>
                                    {type.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Số lượng giấy">
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
}

export default Printers;