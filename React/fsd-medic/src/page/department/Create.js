import { Button, Col, Form, Row, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from "react-router-dom";
import {React, useState, useEffect, Component } from "react";
import Axios from "axios";
import config from "../../config/Config";

function Create() {
  const PATH = config().path
  const LOCAl = config().local
  const [department, setDepartment] = useState("")
  const [room, setRoom] = useState("")
  const [phone, setPhone] = useState("")
  const [errMsg, setErrMsg] = useState("", [])

  const btn_create = () => {

    if(isVerified()){
      Axios.post(PATH + "/department/Create", {
        name: department,
        room_num: room,
        phone: phone
     
      }).then((rs) => {
        const obj = rs.data
        const str = JSON.stringify(obj)
        const o = JSON.parse(str)
        
      });
      alert("Department created.")
      window.location.replace(LOCAl + "/departments")
    }
  };
  
  function isVerified() {
      var rs = true
      setErrMsg([])
      if(department==""){
        setErrMsg(errMsg => [...errMsg, "Please enter a department."])
        rs = false
      }
        
      if(room==""){
        setErrMsg(errMsg => [...errMsg, "Please enter a room."])
        rs = false
      }

      if(phone==""){
        setErrMsg(errMsg => [...errMsg, "Please enter a phone number with extension."])
        rs = false
      }
        
      return rs
  }
      
  return (
    <div className ="container">
      <div className ="row">
        <div>
          <br /><br /><br /><br /><br /><br /><br /><br />
          <p className="display-6">Department</p>
            <Link to="/">Home</Link> / &nbsp;
            <Link to="/departments">Department</Link> / &nbsp;
            Create New<br /><br />
        </div>
        <div className ="col-sm-12">

          <Form.Group className="mb-3">
            <Form.Label>Department:</Form.Label>
            <Form.Control onChange={(e)=>{
                                    setDepartment(e.target.value)
                                  }}>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Room:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setRoom(e.target.value)
              }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setPhone(e.target.value)
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
    </div>

    
  );
}
export default Create;