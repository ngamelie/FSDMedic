import React, { useState } from "react";
//import 'bootstrap-icons/font/bootstrap-icons.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";

import Topbar from "./component/common/Topbar";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";

import Login from "./page/Account/Login";
import Register from "./page/Account/Register";
import Logout from "./page/Account/Logout";
import Home from "./page/Home";

import Appointment1 from "./page/appointment/Appoinment1";
import Appointment from "./page/appointment/Appoinment";

import Create from "./page/appointment/Create";
import Create1 from "./page/appointment/Create1";
import Detail from "./page/appointment/Detail";
import Admin from "./page/Admin";
import HeaderAdmin from "./admin/component/HeaderAdmin";
import SideBar from "./admin/component/SideBar";
import FooterAdmin from "./admin/component/FooterAdmin";
import "./admin/styles/adminStyle.css";

import Departments from "./admin/component/Departments";
import DepartmentsN from "./admin/component/DepartmentsN";
import Department from "./page/department/Department";
import DepartmentsCreate from "./page/department/Create";
import DepartmentsDetail from "./page/department/Detail";

import Doctors from "./page/doctor/Doctor";
import DoctorsCreate from "./page/doctor/Create";
import DoctorsDetail from "./page/doctor/Detail";

const AdminLayout = () => {
  return (
    <div>
      <HeaderAdmin />
      <SideBar />
      <main id="mainAdmin" class="mainAdmin">
        <Outlet />
      </main>
      <FooterAdmin />
    </div>
  );
};
const HomeLayout = () => {
  return (
    <div>
      <Topbar />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const [authRole, setAuthRole] = useState(0);
  const [authEmail, setAuthEmail] = useState("");
  return (
    <div>
      <AuthContext.Provider
        value={{ authRole, setAuthRole, authEmail, setAuthEmail }}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" index element={<Home />} />

              {/* Add them later
              <Route path="/about" exact element={<About />} />
              <Route path="/contact" exact element={<Contact />} />
              */}

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" exact element={<Logout />} />

              <Route path="/appointment" element={<Appointment1 />} />
              <Route path="/appointment/create" element={<Create1 />} />

              <Route path="/appointment" element={<Appointment />} />
              <Route path="/appointment/create" element={<Create />} />
              <Route path="/appointment/detail/:id" element={<Detail />} />
            </Route>

            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/departments" element={<DepartmentsN />} />
              <Route
                path="/department/create"
                element={<DepartmentsCreate />}
              />
              <Route
                path="/department/detail/:id"
                element={<DepartmentsDetail />}
              />
              <Route path="/doctor" element={<Doctors />} />
              <Route path="/doctor/create" element={<DoctorsCreate />} />
              <Route path="/doctor/detail/:id" element={<DoctorsDetail />} />
            </Route>
            
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
