import "./InfoDetail.css";
import { NavLink } from "react-router-dom";

function InfoDetail({userData}) {
  return (
    <div className="infodetail">
      <ul>
        <p>UserInfo</p>
        <li>{userData.name}</li>
        <li>ID number</li>
        <li>Faculty</li>
        <li>Class</li>
        <li>Remain Page</li>
        <li>Remainder</li>
        <button><NavLink to='/payment'>Buy more</NavLink></button>
        <br />
        <button><NavLink to='/login'>Exit</NavLink></button>
      </ul>
    </div>
  );
}

export default InfoDetail;
