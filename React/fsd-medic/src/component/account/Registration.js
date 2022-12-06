import React, {useState, useEffect, Component} from "react";

import Axios from "axios"


function test()  {
    const PATH = "https://localhost:7146";
    const btn_get = () => {
        Axios.get(PATH).then(rs => {
            //alert(rs.data)
            rs.data.forEach(element => {
                alert("Welcome " + element.userName + " and your email is " + element.email)
            });
        })

    }

    const PATH1 = "https://localhost:7146/Details?id=0";
    const btn_Details= () => {
        Axios.get(PATH1).then(rs => {
            alert("Welcome " + rs.data.userName + " and your email is " + rs.data.email)
        })
    }

    const PATH2 = "https://localhost:7146/Details/1";
    const btn_Details2 = () => {
        Axios.get(PATH2).then(rs => {
            alert("Welcome " + rs.data.userName + " and your email is " + rs.data.email) 
        })
    }

    const PATH3 = "https://localhost:7146/Create";
    const btn_Create = () => {
        Axios.post(PATH3, {
          email: "new@gmail.com", 
          userName: "new"
        }).then(rs => {
            alert("Welcome " + rs.data.userName + " and your email is " + rs.data.email)
        })
    }

    const PATH4 = "https://localhost:7146/Edit?id=0";
    const btn_Edit = () => {
        Axios.post(PATH4, {
          email: "zeen1@gmail.com", 
          userName: "zeen1"
        }).then(rs => {
            alert("Welcome " + rs.data.userName + " and your email is " + rs.data.email) 
        })
    }

    const PATH5 = "https://localhost:7146/Delete?id=0";
    const btn_Delete = () => {
        Axios.get(PATH5).then(rs => {
            alert("Welcome " + rs.data.userName + " and your email is " + rs.data.email) 
        })
    }

    return (
        <>
            <div className="box">
                <button className="btn btn-primary" onClick={btn_get}>Get Data</button>
                <button className="btn btn-primary" onClick={btn_Details}>Details</button>
                <button className="btn btn-primary" onClick={btn_Create}>Create</button>
                <button className="btn btn-primary" onClick={btn_Edit}>Edit</button>
                <button className="btn btn-primary" onClick={btn_Delete}>Delete</button>
            </div>

        </>
    );
}


export default test;
