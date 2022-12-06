import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Table, Alert } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import config from "../../config/Config";
import "./appointmentstyle.css";

function Detail() {
  const { id } = useParams();
  const PATH = config().path;
  const LOCAl = config().local;
  const [appointment, setAppointment] = useState("");
  const [date_on, setDate] = useState("");
  const [errMsg, setErrMsg] = useState("", []);

  useEffect(() => {
    Axios.get(PATH + "/appointment/Details?id=" + id).then((response) => {
      setAppointment(response.data.obj);
      setDate(appointment.date_on);
    });
  }, []);

  const btn_edit = () => {
    if (isVerified()) {
      Axios.post(PATH + "/appointment/Edit", {
        id: appointment.id,
        Department_id: appointment.department_id,
        Doctor_id: appointment.doctor_id,
        Patient_id: appointment.patient_id,
        date_on: date_on,
        Status: 0,
      }).then((rs) => {
        const obj = rs.data;
        const str = JSON.stringify(obj);
        const o = JSON.parse(str);
      });
      alert("Information updated.");
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
                  <Link to="/" className="nav-link brcrumb-item active">
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
                    &nbsp;&nbsp;/&nbsp;&nbsp;Edit Appointment
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
            <div className="col-sm-7">
              <div>
                <br />
                <br />
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td>ID:</td>
                      <td>{appointment.patient_id}</td>
                    </tr>

                    <tr>
                      <td>Department:</td>
                      <td>{appointment.department_id}</td>
                    </tr>

                    <tr>
                      <td>Doctor:</td>
                      <td>{appointment.doctor_id}</td>
                    </tr>

                    <tr>
                      <td>Date:</td>
                      <td>
                        <Form.Control
                          type="date"
                          defaultValue={appointment.date_on
                            ?.toString()
                            ?.substring(0, 10)}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <div>
                  {errMsg
                    ? errMsg.map((i) => (
                        <Alert>
                          {" "}
                          <li>{i}</li>{" "}
                        </Alert>
                      ))
                    : null}
                </div>
                <div className="col-sm-3">
                  <Button variant="primary" type="button" onClick={btn_edit}>
                    Submit
                  </Button>
                </div>
                <br />
                <br />
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
export default Detail;
