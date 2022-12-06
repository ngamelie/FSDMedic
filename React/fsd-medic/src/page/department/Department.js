import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Axios from "axios";
import config from "../../config/Config";

function Department() {

    const PATH = config().path;
    const [list, setList] = useState([]);
    
    useEffect(() => {
        Axios.get(PATH + "/department").then((response) => {
            setList(response.data);
        });
    }, []);



const btn_del = (id) => {
    if (window.confirm("Do you want to delete it?")) {
        Axios.get(PATH + "/department/delete?id=" + id).then((rs) => {   });
        window.location.reload();
    }
};

    return (
        <>
            <h1>Department</h1>

            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>room num</th>
                    <th>phone</th>
                        <th> <Link to={`/department/Create`}> Create </Link></th>
                </tr>
                </thead>
                <tbody>
                {list.map((item, key) => (
                    <tr key={item.Id}>
                        <td>{item.name}</td>
                        <td>{item.room_num}</td>
                        <td>{item.phone}</td>
                        <td>
                            <Link to={`/department/detail/${item.Id}`}> Edit </Link>
                            <Link type="button" onClick={()=>btn_del(item.id)}> Delete </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


        </>
    );
}
export default Department;