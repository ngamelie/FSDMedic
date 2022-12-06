import { Link } from "react-router-dom";
import "../styles/style.css";
const SideBar = () => {
  return (

    <aside id="sidebar" className="sidebar">

      <ul className="sidebar-nav" id="sidebar-nav">

        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin" className="nav-link collapsed">
            <i className="bi bi-calendar2-check"></i>
            <span>Appointments</span>
          </Link>
        </li>


        <li className="nav-item">
          <Link to="/admin" className="nav-link collapsed">
            <i className="bi bi-person-lines-fill"></i>
            <span>Doctors</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin" className="nav-link collapsed">
            <i className="bi bi-people-fill"></i>
            <span>Patients</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/departments" className="nav-link collapsed">
            <i className="bi bi-collection"></i>
            <span>Departments</span>
          </Link>
        </li>


      </ul>

    </aside>

  );

}

export default SideBar;