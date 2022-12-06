import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import config from "../../config/Config";

function Detail() {
    const { id } = useParams();
    const PATH = config().path;
    const LOCAl = config().local
    const [doctor, setDoctor] = useState([]);
    
    
    useEffect(() => {
        Axios.get(PATH + "/doctor/Details?id="+id).then((response) => {
            setDoctor(response.data.obj);
        });
    }, []);

    const btn_edit = () => {
        Axios.post(PATH + "/doctor/Edit", {
          id: doctor.id,
          Email: doctor.email,
          Address: doctor.address,
          Name: doctor.name,
          Phone: doctor.phone,
          Dob: doctor.dob,
          Gender: doctor.gender,
          Blood: doctor.blood,
          Card_num: doctor.card_num,
          Contactor: doctor.contactor,
          Contact_num: doctor.contact_num,
          Photo: doctor.photo,
          Status: 0
        }).then((rs) => {
          const obj = rs.data
          const str = JSON.stringify(obj)
          const o = JSON.parse(str)
          
        });
        alert("Information updated.")
        window.location.replace(LOCAl + "/doctor")
    };

    return (       
        <div className ="container">
        <div className ="row">
          <div>
            <br /><br /><br /><br /><br /><br /><br /><br />
              <p className="display-6">Doctor</p>
              <Link to="/">Home</Link> / &nbsp;
              <Link to="/departments">Doctor</Link> / &nbsp;
              Details
              <br /><br />
          </div>
          <div className ="col-sm-6">

            <Table striped bordered hover>
              <tbody>
              <tr>
              <td>ID:</td>
              <td>{doctor.id}</td>
              </tr>

              <tr>
              <td>Doctor Name:</td>
              <td>{doctor.name}</td>
              </tr>

              <tr>
              <td>Room Number:</td>
              <td>{doctor.room_num}</td>
              </tr>
              </tbody>
            </Table>

            <div className ="col-sm-3">
              <Button variant="primary" type="button" onClick={btn_edit}>
                Submit
              </Button>
            </div>
            <br /><br />
            </div>
          </div>
      </div>

      
    );
}
export default Detail;