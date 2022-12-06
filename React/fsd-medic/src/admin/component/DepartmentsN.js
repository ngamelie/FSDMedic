import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import config from "../../config/Config";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../styles/adminStyleN.css";

const Departments = () => {

  const [departments, setDepartments] = useState([]);   
 
  const PATH = config().path;

  useEffect(() => {
    Axios.get(PATH + "/department").then((response) => {
      setDepartments(response.data);
    });
  }, []);

  const btn_del = (id) => {
    if (window.confirm("Do you want to delete it?")) {
      Axios.get(PATH + "/department/delete?id=" + id).then((rs) => {});
      window.location.reload();
    }
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Departments List";
    const headers = [["NAME", "ROOM NNUMBER", "PHONE"]];

    const data = departments.map(elt=> [elt.name, elt.room_num, elt.phone]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  const handleChange = (e) => {
    const results = departments.filter(dept => {
      if (e.target.value === "") return departments
      return dept.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setDepartments(results);
  }

  return (
    <div>
      <div className="row">
        <div className="breadcrumb-bar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 align-middle">
                <div className="align-middle">
                  <h4 className="mb-0">Departments</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Link
            to="/department/create/"
            className="btn btn-outline-primary btn-sm btncustom"
          >
            <i className="bi bi-plus-lg"></i> New 
          </Link>
          <Link type="button" className="btn btn-outline-primary btn-sm btncustom" onClick={() => exportPDF()}>
          <i class="bi bi-printer"></i> PDF
          </Link>
          
        </div>
        <div className="col-md-6 ">
          <form>
            <div className="form-group search">
              <span className="ow"></span>Search: 
              <input
                type="text"
                className="form-control"
                id="search-term"
                placeholder="Type text here"
                defaultValue="" onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 p-3">
          <div className="card">
            <div className="card-body">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Room Number</th>
                    <th scope="col">Phone</th>
                    <th scope="col" colspan="2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {departments && departments.map((item, key) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.room_num}</td>
                      <td>{item.phone}</td>
                      <td>
                        <Link to={`/department/detail/${item.id}`}> Edit </Link>
                        &nbsp;&nbsp;
                        <Link type="button" onClick={() => btn_del(item.id)}>
                          
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
