import React, { useContext, useEffect, useState } from "react";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Menu,
  Popover,
} from "@mui/material";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveAs } from "file-saver";
import { api } from "../../../api/baseURL";
import { AuthContext } from "../../Authentication/Authenticate";
import "../Material/History/MaterialHistory.css";
import "../Material/Storage/MaterialStorage.css";
import { NavLink } from "react-router-dom";
import { alignProperty } from "@mui/material/styles/cssUtils";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

function CircularWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}
function HighlightedMachine({ machineName }) {
  return (
    <Box
      sx={{
        backgroundColor: "#e0f7fa",
        border: "1px solid #80deea",
        color: "#00695c",
        fontWeight: "bold",
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "16px",
        textAlign: "center",
        fontSize: "0.85rem",
      }}
    >
      <Typography
        variant="body1"
        sx={{ margin: 0, color: "inherit", fontWeight: "inherit" }}
      >
        {machineName}
      </Typography>
    </Box>
  );
}

function StatusBadge({ status }) {
  // Định nghĩa màu và text dựa trên trạng thái
  const getStatus = () => {
    switch (status) {
      case "Completed":
        return { color: "green", text: "Đã xong" };
      case "Implementing":
        return { color: "orange", text: "Đang in" };
      case "Pending":
        return { color: "gray", text: "Chờ xử lý" };
      default:
        return { color: "blue", text: "Không rõ" };
    }
  };

  const { color, text } = getStatus();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* Chấm tròn biểu thị trạng thái */}
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: color,
          marginRight: 1,
        }}
      />
      {/* Text trạng thái */}
      <Typography variant="body2" sx={{ color }}>
        {text}
      </Typography>
    </Box>
  );
}

const AdHistory = () => {
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(10); //number item per page
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState();
  const [totalpage, setTotalPage] = useState();
  const [loading, setLoading] = useState(true);

  //
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterData, setFilterData] = useState(false);
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSort = (order) => {
    setLoading(true);
    if (order === "desc") {
      const sortedDataDesc = data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        // Đảo ngược kết quả để sắp xếp giảm dần
        return dateB - dateA;
      });

      setData(sortedDataDesc);
    } else {
      const sortedDataAsc = data.sort((a, b) => {
        // Chuyển đổi ngày tháng từ chuỗi thành đối tượng Date
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        // So sánh ngày tháng
        return dateA - dateB;
      });

      setData(sortedDataAsc);
    }
    setLoading(false);

    setAnchorEl(null); // Đóng menu
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Hàm thay đổi trang
  const handleChangePage = async (event, page) => {
    setCurrentPage(page);
    setLoading(true);
    await getAllHistory();
  };

  const changeSizeUpdatePage = async (e) => {
    setLoading(true);
    setSize(Number(e.target.value));
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số hàng
    // await getAllHistoryMat();
  };
  // Hàm tìm kiếm

  //api get history
  const getAllHistory = async () => {
    try {
      const response = await api.get("/history/adminSearch", {
        params: {
          fileId: "",
          printerId: "",
          startDate: startDate,
          endDate: endDate,
          page: currentPage - 1,
          size: size,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      //console.log("response getAllhistory:",response);
      setData(response.data.result?.data);
      setTotalPage(response.data.result.totalPage);
      //console.log(response.data.result?.totalPages)
    } catch (error) {
      //console.log("Can't get api", error.code)
    } finally {
      setLoading(false); // Ẩn trạng thái loading
    }
  };

  // Open Filter Popover
  const handleFilterOpen = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorElFilter(null);
  };
  // Filter handler
  const handleFilterApply = async () => {
    if (startDate && endDate) {
      setLoading(true);

      await getAllHistory();
    } else {
      // Nếu không có startDate và endDate, không làm gì
      setAnchorElFilter(null); // Đóng filter popover
    }
  };

  const resetFilter = async () => {
    setStartDate("");
    setEndDate("");
    //use get all api
    setLoading(true);

    await getAllHistory();
  };

  // Hàm xuất dữ liệu
  const handleExport = () => {
    if (loading) {
      return;
    }
    const csvContent =
      "Date;File;Process;MSSV;Machine\n" +
      data
        .map(
          (row) =>
            `${row?.date};${row?.file.name};${row?.process};${row?.user.mssv};${row?.printMachine?.name}`
        )
        .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "store_data.csv");
  };

  //   every click/load page get api
  useEffect(() => {
    getAllHistory();
  }, [currentPage, size]); // Gọi lại API mỗi khi currentPage hoặc size thay đổi

  return (
    <Box className="wrap-report">
      <Typography variant="h9" gutterBottom>
        <NavLink to="/">&larr; Trở về trang chủ</NavLink>
        <h1>Lịch sử in</h1>
      </Typography>
      {/* Thanh tìm kiếm, xuất dữ liệu và số hàng mỗi trang */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        {/* Filter Form */}
        {/* Filter Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 10,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<FilterAltIcon />}
            onClick={handleFilterOpen}
          >
            Filter
          </Button>

          {/* Filter Popover */}
          <Popover
            open={Boolean(anchorElFilter)}
            anchorEl={anchorElFilter}
            onClose={handleFilterClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 2,
              }}
            >
              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <TextField
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" onClick={handleFilterApply}>
                  Apply
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={resetFilter}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Popover>
        </div>

        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={handleMenuOpen}
          style={{ marginRight: 10 }}
        >
          Sort
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleSort("asc")}>Ascending</MenuItem>
          <MenuItem onClick={() => handleSort("desc")}>Descending</MenuItem>
        </Menu>

        <Button
          variant="contained"
          color="primary"
          startIcon={<FileDownloadIcon />}
          onClick={handleExport}
          style={{ background: "linear-gradient(135deg, #2c49c8, #3f98d3)" }}
        >
          Export
        </Button>
      </Box>

      {/* Bảng hiển thị */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px", // Chiều cao tối thiểu để căn giữa trong vùng hiển thị
          }}
        >
          <CircularWithValueLabel />
        </Box>
      ) : (
        <Box
          sx={{
            border: "1px solid #f3eeee", // Viền màu xanh
            borderRadius: "8px", // Bo góc
            padding: "16px", // Khoảng cách bên trong
            overflow: "hidden", // Ẩn phần tràn
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Process</TableCell>
                <TableCell>MSSV</TableCell>
                <TableCell>Machine</TableCell>

                {/* <TableCell></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) ? (
                data.map((row) => (
                  <TableRow key={row?.id}>
                    <TableCell>{row?.date}</TableCell>
                    <TableCell>{row?.file.name}</TableCell>
                    <TableCell>
                      <StatusBadge status={row?.process} />
                    </TableCell>
                    <TableCell>{row?.user.mssv}</TableCell>
                    <TableCell>
                      <HighlightedMachine
                        machineName={row?.printMachine.name}
                      />
                    </TableCell>
                    {/* <TableCell></TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow key={data?.id}>
                  <TableCell>{data?.date}</TableCell>
                  <TableCell>{data?.file?.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={data?.process} />
                  </TableCell>
                  <TableCell>{data?.user?.mssv}</TableCell>
                  <TableCell>
                    <HighlightedMachine
                      machineName={data?.printMachine?.name}
                    />
                  </TableCell>
                  {/* <TableCell>{row.dateUse}</TableCell> */}
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/*Pagination*/}
          <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
            <div style={{ alignContent: "center" }}>Rows per page</div>

            <TextField
              select
              value={size}
              onChange={changeSizeUpdatePage}
              size="small"
              sx={{ width: 150, marginRight: 2, marginLeft: 2 }}
            >
              {Array.isArray(data) ? (
                [4, 6, 8, 10].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              ) : (
                <MenuItem key={1} value={1}>
                  {1}
                </MenuItem>
              )}
            </TextField>
            {
              <Pagination
                count={totalpage}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
              />
            }
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdHistory;
