import React, { useContext, useEffect, useState } from 'react';
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
} from "@mui/material";
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveAs } from "file-saver";
import { api } from "../../../../api/baseURL";
import { AuthContext } from '../../../Authentication/Authenticate';
import './MaterialHistory.css'
import { NavLink } from 'react-router-dom';
import { alignProperty } from '@mui/material/styles/cssUtils';



function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
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
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}

const MaterialHistory = () => {
  const {token} = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize]=useState(10); //number item per page
  const [searchQuery, setSearchQuery] = useState("");
  const [data,setData ] =useState();
  const [totalpage, setTotalPage] = useState();
  const [loading, setLoading] =useState(true)

  // Hàm thay đổi trang
  const handleChangePage = async (event, page) => {
    setCurrentPage(page);
    setLoading(true)
    await getAllHistoryMat()
  };

  const changeSizeUpdatePage= async (e)=>{
    setLoading(true)
    setSize(Number(e.target.value));
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số hàng
    // await getAllHistoryMat();
  }
  // Hàm tìm kiếm


  const getHistoryById= async (e)=>{
      if(e.key==="Enter"){
        try {
          setLoading(true)
        if(e.target.value===""){
            // setSize(10);
            // setCurrentPage(1)
            await getAllHistoryMat()
            console.log("input is null")
        }
        else{
          const response = await api.get(
            `/HistoryMaterial/${e.target.value}`,
            {
              headers:{
                'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
    
            }
          )
    
          console.log("get history by id",response);
          setData(response.data.result);
        }

        
      } catch (error) {
        console.log("Can't get api history", error.code)
      }
      finally{
        setLoading(false)
      }
    }
  }

  //api get history
  const getAllHistoryMat = async()=>{
    try {
      const response= await api.get(
        "/HistoryMaterial",
        {
          headers:{
            'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
          params:{
            page:currentPage-1,
            size:size
          }
        }
      )
      console.log("response getAllhistorymat:",response);
      setData(response.data.result?.content);
      setTotalPage(response.data.result.totalPages);
      console.log(response.data.result?.totalPages)
    } catch (error) {
      console.log("Can't get api", error.code)
    }finally {
      setLoading(false); // Ẩn trạng thái loading
    }
  }



  // Hàm xuất dữ liệu
  const handleExport = () => {
    const csvContent =
      "ID,ID Machine,Name,Value,Description,Date use\n" +
      data
        .map(
          (row) =>
            `${row.id},${row.id_machine},${row.name},${row.value},${row.description},${row.dateUse}`
        )
        .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "store_data.csv");
  };

  //every click/load page get api
  useEffect(() => {
    getAllHistoryMat();
  }, [currentPage, size]); // Gọi lại API mỗi khi currentPage hoặc size thay đổi
  

  return (
    <Box className="wrap-report" >
      <Typography variant="h9" gutterBottom>
        <NavLink to='/'>&larr; Trở về trang chủ</NavLink>
        <h1>Material History</h1>
      </Typography>

      {/* Thanh tìm kiếm, xuất dữ liệu và số hàng mỗi trang */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2, }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by id..."
          className='MuiInputBase-root'

          onKeyDown={getHistoryById}
          InputProps={{
            startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
          }}
          sx={{ 
            flex: 1, marginRight: 2,

          }}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<FileDownloadIcon />}
          onClick={handleExport}
          style={{background:"linear-gradient(135deg, #2c49c8, #3f98d3)"}}
        >
          Export
        </Button>
      </Box>

      {/* Bảng hiển thị */}
      {
        loading ? (
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

          ):(
            <Box
            sx={{
              border: "1px solid #f3eeee", // Viền màu xanh
              borderRadius: "8px",         // Bo góc
              padding: "16px",             // Khoảng cách bên trong
              overflow: "hidden",          // Ẩn phần tràn
            }}
            >
            <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ID Machine</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date use</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) ? (data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.id_machine}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.dateUse}</TableCell>
                </TableRow>
              ))):(
                <TableRow key={data.id}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.id_machine}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.value}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>{data.dateUse}</TableCell>
                </TableRow>
              )
            }
            </TableBody>
          </Table>
        {/*Pagination*/ }
      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
      <div style={{alignContent:'center'}}>Rows per page</div>

        <TextField
            select

            value={size}
            onChange={changeSizeUpdatePage}
            size="small"
            sx={{ width: 150, marginRight: 2, marginLeft:2}}
          >
            { Array.isArray(data) ? ([4, 6, 8, 10].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))):(
              <MenuItem key={1} value={1}>
                {1}
              </MenuItem>
            )
          }
          </TextField>
          {   
            (<Pagination
            count={totalpage}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />)
        }
      </Box>
      </Box>
      )
      }
    </Box>
  );
};

export default MaterialHistory;
