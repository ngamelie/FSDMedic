import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Axios from "axios";
import config from "../../config/Config";

function Doctor() {

    const PATH = config().path;
    const [list, setList] = useState([]);
    
    useEffect(() => {
        Axios.get(PATH + "/doctor").then((response) => {
            setList(response.data);
        });
    }, []);



const btn_del = (id) => {
    if (window.confirm("Do you want to delete it?")) {
        Axios.get(PATH + "/doctor/delete?id=" + id).then((rs) => {   });
        window.location.reload();
    }
};

    return (
        <>
            <h1>Doctor</h1>

            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Name</th>
                    <th>phone</th>
                    <th>Dob</th>
                    <th>Gender</th>
                    <th>blood</th>
                    <th>Card Number</th>
                    <th>Emergency Contactor</th>
                    <th>Contact number</th>
                    <th>Photo</th>
                        <th> <Link to={`/doctor/Create`}> Create </Link></th>
                </tr>
                </thead>
                <tbody>
                {list.map((item, key) => (
                    <tr key={item.Id}>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.dob}</td>
                        <td>{item.gender}</td>
                        <td>{item.blood}</td>
                        <td>{item.card_num}</td>
                        <td>{item.contactor}</td>
                        <td>{item.contact_num}</td>
                        <td>{item.photo}</td>
                        <td>
                            <Link to={`/doctor/detail/${item.Id}`}> Edit </Link>
                            <Link type="button" onClick={()=>btn_del(item.id)}> Delete </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


        </>
    );
}
export default Doctor;