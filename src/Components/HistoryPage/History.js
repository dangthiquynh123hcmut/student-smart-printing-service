import { NavLink } from "react-router-dom";
import { useEffect,useState,React} from "react";
import "./History.css";
import { ExclamationCircleOutlined } from '@ant-design/icons';
// import Icon from "@ant-design/icons/lib/components/AntdIcon";
// import {  ExclamationCircleOutlined} from "@ant-design/icons";
// import { Color } from "antd/es/color-picker";

function History() {
  const [printJobs, setPrintJobs] = useState([]);
  const [fetchStatus, setFetch] = useState(true);
  
  const getStatusBadge = (status) => {
    const badgeClass = status === 'Đang chờ' ? 'status-pending' : 'status-done';
    return <span className={badgeClass}>{status}</span>;
  };

  // Helper function to render report icon
  const getReportIcon = (report) => {
    return report ? (
      <span className="report-icon"><ExclamationCircleOutlined style={{fontSize: '22px', color: 'red'}}/></span> // Warning icon
    ) : null;
  }

  
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') // Your API endpoint
      .then(response => {
        setFetch(true);
        return response.json()
      })
      .then(data => setPrintJobs(data))
      .catch(error => {
        setFetch(false);
        console.error('Error fetching print jobs:', error)
      });
  }, []);

  return <div className="wrapper-history">
      <div >
        <NavLink to='/'>&larr; Tro ve trang chu</NavLink>
        <h1 >History</h1>
      </div>

      <table className="table-list-info">
        <thead>
          <tr>
            <td>
              ID may in
            </td>
            <td>
              Co so
            </td>
            <td>
              Toa nha
            </td>
            <td>
              Tang
            </td>
            <td>
              Trang thai
            </td>
            <td>
              Ngay in
            </td>
            <td>
              Ten file in
            </td>
            <td>
              Bao cao
            </td>
          </tr>
        </thead>
        
        
        <tbody>
          {fetchStatus ? 
            (printJobs.map((job, index) => (
              <tr key={index}>
                <td>{job.id}</td> {/*id*/}
                <td>{job.name}</td> 
                <td>{job.username}</td>
                <td>{job.phone}</td>
                <td>{getStatusBadge('Đang chời')}</td>
                <td>{job.email}</td>
                <td>{job.company.name}</td>
                <td>{getReportIcon(job.company.bs)}</td>
              </tr>
            ))
          ):(
            <tr>
                <td>Loading</td> {/*id*/}
                <td>Loading</td> 
                <td>Loading</td>
                <td>Loading</td>
                <td>{getStatusBadge('Loading')}</td>
                <td>Loading</td>
                <td>Loadin</td>
                <td>{getReportIcon('s')}</td>
            </tr>
          )
          }
        </tbody>
      </table>
      
    </div>;
}

export default History;
