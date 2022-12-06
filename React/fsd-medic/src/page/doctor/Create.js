import { Button, Col, Form, Row, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from "react-router-dom";
import {React, useState, useEffect, Component } from "react";
import Axios from "axios";
import config from "../../config/Config";

function Create() {
  const PATH = config().path
  const LOCAl = config().local
  const [doctor, setDoctor] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [blood, setBlood] = useState("")
  const [card_num, setCardnum] = useState("")
  const [contactor, setContactor] = useState("")
  const [contact_num, setContactNum] = useState("")
  const [photo, setPhoto] = useState("")
  const [errMsg, setErrMsg] = useState("", [])

  const btn_create = () => {

    if(isVerified()){
      Axios.post(PATH + "/doctor/Create", {
        email: email,
        address: address,
        name: name,
        phone: phone,
        dob: dob,
        gender: gender,
        blood: blood,
        card_num: card_num,
        contactor: contactor,
        contact_num: contact_num,
        photo: photo
      }).then((rs) => {
        const obj = rs.data
        const str = JSON.stringify(obj)
        const o = JSON.parse(str)
        
      });
      alert("Doctor created.")
      window.location.replace(LOCAl + "/doctors")
    }
  };
  
  function isVerified() {
      var rs = true
      setErrMsg([])
      if(name==""){
        setErrMsg(errMsg => [...errMsg, "Please enter the doctor's name."])
        rs = false
      }
        
      if(email==""){
        setErrMsg(errMsg => [...errMsg, "Please enter the doctor's email."])
        rs = false
      }

      if(address==""){
        setErrMsg(errMsg => [...errMsg, "Please enter the doctor's address."])
        rs = false
      }

    if(phone==""){
        setErrMsg(errMsg => [...errMsg, "Please enter a phone number with extension."])
        rs = false
      }

      if(dob==""){
        setErrMsg(errMsg => [...errMsg, "Please enter the doctor's dob."])
        rs = false
      }

      if(gender==""){
        setErrMsg(errMsg => [...errMsg, "Please enter the doctor's gender."])
        rs = false
      }

      if(blood==""){
        setErrMsg(errMsg => [...errMsg, "Please enter the doctor's blood."])
        rs = false
      }

      if(card_num==""){
        setErrMsg(errMsg => [...errMsg, "Please enter the doctor's card number."])
        rs = false
      }

      if(contactor==""){
        setErrMsg(errMsg => [...errMsg, "Please enter the doctor's emergency contactor."])
        rs = false
      }

      if(contact_num==""){
        setErrMsg(errMsg => [...errMsg, "Please enter the doctor's emergency contactor number."])
        rs = false
      }

      if(photo==""){
        setErrMsg(errMsg => [...errMsg, "Please upload the doctor's photo."])
        rs = false
      }
        
      return rs
  }
      
  return (
    <div className ="container">
      <div className ="row">
        <div>
          <br /><br /><br /><br /><br /><br /><br /><br />
          <p className="display-6">Doctor</p>
            <Link to="/">Home</Link> / &nbsp;
            <Link to="/doctor">Doctor</Link> / &nbsp;
            Create New<br /><br />
        </div>
        <div className ="col-sm-12">

          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control onChange={(e)=>{
                                    setName(e.target.value)
                                  }}>
            </Form.Control>
          </Form.Group>

  <Form.Group className="mb-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setAddress(e.target.value)
              }}/>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setEmail(e.target.value)
              }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setPhone(e.target.value)
              }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dob:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setDob(e.target.value)
              }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setGender(e.target.value)
              }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Blood:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setBlood(e.target.value)
              }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Card Number:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setCardnum(e.target.value)
              }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contactor:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setContactor(e.target.value)
              }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contactor Number:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setContactNum(e.target.value)
              }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Photo:</Form.Label>
            <Form.Control
              onChange={(e)=>{
                setPhoto(e.target.value)
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