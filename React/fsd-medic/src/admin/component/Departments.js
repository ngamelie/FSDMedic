import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import config from "../../config/Config";

const Departments = () => {

  const [departments, setDepartments] = useState([]);

  const [error, setError] = useState(null);
  const PATH = config().path;

  useEffect(() => {
    Axios.get(PATH + "/department").then((response) => {
      setDepartments(response.data);
    });
}, []);

const btn_del = (id) => {
  if (window.confirm("Do you want to delete it?")) {
      Axios.get(PATH + "/department/delete?id=" + id).then((rs) => {   });
      window.location.reload();
  }
};

  return (
    <div >
      <div className="row">
        <div class="col-lg-9 mx-auto">
          <h3 class="card-title mt-5 pb-0">All Departments</h3>
        </div>
      </div>
      <div className="row">
        <div class="col-lg-9  mx-auto">
          <h5 class="text-end"><Link to="/department/create/">Add Department</Link></h5>
        </div>
      </div>
      <div className="row" >


        <div class="col-lg-9 mx-auto">

          <div class="card">
            <div class="card-body">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Room Number</th>
                    <th scope="col">Phone</th>
                    <th scope="col" colspan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                    
                {
                departments.map((item, key) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.room_num}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <Link to={`/department/detail/${item.id}`}> Edit </Link> &nbsp;&nbsp; 
                                    <Link type="button" onClick={()=>btn_del(item.id)}> Delete </Link>
                                </td>
                            </tr>
                        ))
                        }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Departments;