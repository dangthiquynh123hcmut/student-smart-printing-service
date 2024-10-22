import "./InfoDetail.css";
import { NavLink } from "react-router-dom";

function InfoDetail() {
  return (
    <div className="infodetail">
      <ul>
        <p>UserInfo</p>
        <li>Full Name</li>
        <li>ID number</li>
        <li>Faculty</li>
        <li>Class</li>
        <li>Remain Page</li>
        <li>Remainder</li>
        <button>Buy more</button>
        <br />
        <button><NavLink to='/login'>Exit</NavLink></button>
      </ul>
    </div>
  );
}

export default InfoDetail;
