import { Button, Col, Form, Row, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from "react-router-dom";
import {React, useState, useEffect, Component } from "react";
import Axios from "axios";
import config from "../../config/Config";
import { getRole, getEmail } from "../../helpers/handleJWT";
import "./appointmentstyle.css";

function Create() {
  const PATH = config().path
  const LOCAl = config().local
  const [department, setDepartment] = useState("")
  const [doctor, setDoctor] = useState("")
  const [date_on, setDate] = useState("")
  const [errMsg, setErrMsg] = useState("", [])
  const [patientId, setPatientId] = useState(0)

  useEffect(() => {
    Axios.get(PATH + "/appointment/GetPatientIdByEmail?email=" + getEmail()).then((response) => {
      setPatientId(response.data);
    });
  }, []);

  const btn_create = () => {
    if(patientId == 0){
      alert("Please Login.")
      window.location.replace(LOCAl)
      return
    }

    if(isVerified()){
      Axios.post(PATH + "/appointment/Create", {
        Department_id: department,
        Doctor_id: doctor,
        Patient_id: patientId,
        Date_on: date_on,
        Status: 0,
        doctor_time_id: 0
      }).then((rs) => {
        const obj = rs.data
        const str = JSON.stringify(obj)
        const o = JSON.parse(str)
        
      });
      alert("Appointment created.")
      window.location.replace(LOCAl + "/appointment")
    }
  };
  
  function isVerified() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    var rs = true
    setErrMsg([])
    if(department==""){
      setErrMsg(errMsg => [...errMsg, "Please choose a department."])
      rs = false
    }
      
    if(doctor==""){
      setErrMsg(errMsg => [...errMsg, "Please choose a doctor."])
      rs = false
    }
      
    if(date_on==""){
      setErrMsg(errMsg => [...errMsg, "Please choose a date."])
      rs = false
    }else if(date_on <= today){
      setErrMsg(errMsg => [...errMsg, "Please choose a date in the future."])
      rs = false
    }
      
    return rs
  }
      
  return (
    <div className="appoinment">
      <div className="innercontainer">
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="brcrumb">
                  <Link
                    to="/"
                    className="nav-link brcrumb-item active"
                  >
                    Home
                  </Link>
                  <span className="brcrumb-item">
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                  </span>
                  <Link
                    to="/appointment"
                    className="nav-link brcrumb-item active"
                  >
                    Appointments
                  </Link>
                  <span className="brcrumb-item">
                    &nbsp;&nbsp;/&nbsp;&nbsp;Add Appointment
                  </span>
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


        <div className="container">
          <div className="row">
            <div className="leftappoint col-7">
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control placeholder={getEmail()} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Department:</Form.Label>
                  <Form.Select onChange={(e)=>{
                                          setDepartment(e.target.value)
                                        }}>
                    <option value="">Select...</option>
                    <option value="2">2 Medical Department</option>
                    <option value="3">3 Nursing Department</option>
                    <option value="4">4 Paramedical Departments</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Doctor:</Form.Label>
                  <Form.Select 
                    onChange={(e)=>{
                      setDoctor(e.target.value)
                    }}>
                    <option value="">Select...</option>
                    <option value="2">2 Doctor Alex</option>
                    <option value="3">3 Doctor Bob</option>
                    <option value="4">4 Doctor Celina</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date:</Form.Label>
                  <Form.Control type="date"
                    onChange={(e)=>{
                      setDate(e.target.value)
                    }}/>
                </Form.Group>

                { (errMsg) ? errMsg.map( i => (    
                  <Alert> <li>{ i }</li> </Alert> 
                )) : null }
              </div>
              <div className ="col-sm-2">
                <Form.Group className="mb-3">
                  <Button variant="primary" type="button" onClick={btn_create}>
                    Create
                  </Button>
                </Form.Group>
                <br /><br />
              </div>
            </div>
        
            <div className="rightappoint col-4">
              <img
                src={`${process.env.PUBLIC_URL}/images/appointment2.png`}
                alt="appointment"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Create;





