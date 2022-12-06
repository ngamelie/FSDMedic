import { Button, Col, Form, Row, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./appointmentstyle.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Axios from "axios";
import config from "../../config/Config";
import { getRole, getEmail } from "../../helpers/handleJWT";

function Appoinment() {
  const PATH = config().path;
  const [list, setList] = useState([]);
  useEffect(() => {
      var useremail = getEmail()       
      if(useremail != ""){
          Axios.get(PATH + "/appointment?email=" + useremail).then((response) => {
              setList(response.data);
          });
      }
  }, []);

  const btn_del = (item) => {
      if(item.status == 0){
          if (window.confirm("Do you want to delete it?")) {
              Axios.get(PATH + "/appointment/delete?id=" + item.id).then((rs) => {   });
              window.location.reload();
          }
      }else{
          alert("The appointment has already confirmed. Please contact your doctor.");
      }

  };

  return (
    <div className="appoinment">
      <div className="innercontainer">
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="brcrumb">
                  <Link to="/" className="nav-link brcrumb-item active">
                    Home
                  </Link>
                  <span className="brcrumb-item">
                    &nbsp;&nbsp;/&nbsp;&nbsp;Appointments
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="brcrumbright">
                  <Link
                    to="/appointment/create/"
                    className="nav-link brcrumb-item"
                  >
                    Make new pointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="title-text">
          <div className="container d-flex align-items-center">
            <h1>appointment</h1>
          </div>
        </div>

        <div className="container appointlist">
          <div className="row">
            <div className="col-sm-12">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Department ID</th>
                    <th>Department Name</th>
                    <th>Doctor ID</th>
                    <th>Doctor Name</th>
                    <th>Date</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {list.map((item, key) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.department_id}</td>
                        <td>{item.departName}</td>
                        <td>{item.doctor_id}</td>
                        <td>{item.doctorName}</td>
                        <td>{(item.date_on.toString()).substring(0, 10)}</td>
                        <td width="10%">
                        {(item.status == 0) ? <Link to={`/appointment/detail/${item.id}`}> Edit </Link> : null }
                        &nbsp;&nbsp;
                        {(item.status == 0) ? <Link type="button" onClick={()=>btn_del(item)}> Delete </Link> : null }
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Appoinment;
