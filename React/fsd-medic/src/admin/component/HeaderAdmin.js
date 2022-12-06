import { Link } from "react-router-dom";
import "../styles/style.css";
const HeaderAdmin = () => {
  return (
    // Header 
    <div id="headerAdmin" class="fixed-top">
      <div className="container-fluid d-flex align-items-center justify-content-around">
        <Link to="/" className="logo">
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="logo"
            class="img-fluid mx-5"
          />
        </Link>
        <nav id="navbar" className="navbar order-last order-lg-0 mx-auto">
          <h2>Welcome Admin Dashboard</h2>
        </nav>
        <nav className="navbar">
          <ul>

            <li>
              <Link to="/admin" className="nav-link mx-3">
                Log Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

}

export default HeaderAdmin;