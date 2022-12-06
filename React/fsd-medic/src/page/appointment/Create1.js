import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { React, useState, useEffect, Component } from "react";
import Axios from "axios";
import config from "../../config/Config";
import "./appointmentstyle.css";

function Create1() {
  const PATH = config().path;
  const LOCAl = config().local;
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date_on, setDate] = useState("");
  const [errMsg, setErrMsg] = useState("", []);
  const [patientId, setPatientId] = useState(0);

  useEffect(() => {
    Axios.get(
      PATH +
        "/appointment/GetPatientIdByEmail?email=" +
        sessionStorage.getItem("useremail")
    ).then((response) => {
      setPatientId(response.data);
    });
  }, []);

  const btn_create = () => {
    if (patientId == 0) {
      alert("Please Login.");
      window.location.replace(LOCAl);
      return;
    }

    if (isVerified()) {
      Axios.post(PATH + "/appointment/Create", {
        Department_id: department,
        Doctor_id: doctor,
        Patient_id: patientId,
        Date_on: date_on,
        Status: 0,
        doctor_time_id: 0,
      }).then((rs) => {
        const obj = rs.data;
        const str = JSON.stringify(obj);
        const o = JSON.parse(str);
      });
      alert("Appointment created.");
      window.location.replace(LOCAl + "/appointment");
    }
  };

  function isVerified() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    var rs = true;
    setErrMsg([]);
    if (department == "") {
      setErrMsg((errMsg) => [...errMsg, "Please choose a department."]);
      rs = false;
    }

    if (doctor == "") {
      setErrMsg((errMsg) => [...errMsg, "Please choose a doctor."]);
      rs = false;
    }

    if (date_on == "") {
      setErrMsg((errMsg) => [...errMsg, "Please choose a date."]);
      rs = false;
    } else if (date_on <= today) {
      setErrMsg((errMsg) => [...errMsg, "Please choose a date in the future."]);
      rs = false;
    }

    return rs;
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
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="patientname"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="patientphone"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="patientaddress"
                      placeholder="Address"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="patientphone"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <select className="form-control" id="department">
                      <option>Department</option>
                      <option>Neuro</option>
                      <option>Ortho</option>
                      <option>General</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      placeholder="Doctor Name"
                      className="form-control"
                      id="doctor"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="date"
                      placeholder="Appointment Date"
                      className="form-control"
                      id="appointment-date"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <select className="form-control" id="time-slot">
                      <option>Time Slot</option>
                      <option>10AM-11AM</option>
                      <option>11AM-12pm</option>
                      <option>12PM-01PM</option>
                      <option>2PM-3PM</option>
                      <option>3PM-4PM</option>
                      <option>4PM-5PM</option>
                    </select>
                  </div>
                  <div className="form-group col-md-12">
                    <textarea
                      className="form-control"
                      id="problem"
                      rows="3"
                      placeholder="Message"
                    ></textarea>
                  </div>
                  <div className="form-group col-md-12 mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btnapp"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
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

export default Create1;
