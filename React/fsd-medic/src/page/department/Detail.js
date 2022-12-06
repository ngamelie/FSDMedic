
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import config from "../../config/Config";

function Detail() {
    const { id } = useParams();
    const PATH = config().path;
    const LOCAl = config().local
    const [department, setDepartment] = useState([]);
    
    
    useEffect(() => {
        Axios.get(PATH + "/department/Details?id="+id).then((response) => {
            setDepartment(response.data.obj);
        });
    }, []);

    const btn_edit = () => {
        Axios.post(PATH + "/deprtment/Edit", {
          id: department.id,
          Name: department.name,
          Room_id: department.room_num,
          Phone: department.phone,
          
          Status: 0
        }).then((rs) => {
          const obj = rs.data
          const str = JSON.stringify(obj)
          const o = JSON.parse(str)
          
        });
        alert("Information updated.")
        window.location.replace(LOCAl + "/departments")
    };

    return (       
        <div className ="container">
        <div className ="row">
          <div>
            <br /><br /><br /><br /><br /><br /><br /><br />
              <p className="display-6">Department</p>
              <Link to="/">Home</Link> / &nbsp;
              <Link to="/departments">Departments</Link> / &nbsp;
              Details
              <br /><br />
          </div>
          <div className ="col-sm-6">

            <Table striped bordered hover>
              <tbody>
              <tr>
              <td>ID:</td>
              <td>{department.id}</td>
              </tr>

              <tr>
              <td>Department Name:</td>
              <td>{department.name}</td>
              </tr>

              <tr>
              <td>Room Number:</td>
              <td>{department.room_num}</td>
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