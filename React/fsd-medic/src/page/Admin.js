import { Link } from "react-router-dom";
function Admin() {
  return (
    <div className="row align-items-center">
      <div className="col-lg-8 mx-auto mt-5">
        <div className="row">
          <div className="col-xxl-4 col-md-6 mx-5">
            <div className="card info-card app-card">

              <div className="card-body">
                <h5 className="card-title ">Appointments</h5>

                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center ms-5">
                    <i className="bi bi-calendar2-check"></i>
                  </div>
                  <div className="ps-4">
                    <span className="text-success small pt-1 fw-bold">100</span> <span className="text-muted small pt-2 ps-1">
                      <Link to="/adminAppointment" >View</Link>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="col-xxl-4 col-md-6 mx-5">
            <div className="card info-card doc-card">

              <div className="card-body">
                <h5 className="card-title ">Doctors</h5>

                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center ms-5">
                    <i className="bi bi-person-lines-fill"></i>
                  </div>
                  <div className="ps-4">
                    <span className="text-success small pt-1 fw-bold">100</span> <span className="text-muted small pt-2 ps-1">
                      <Link to="/adminAppointment" >View</Link>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>


        <div className="row">
          <div className="col-xxl-4 col-md-6 mx-5">
            <div className="card info-card pat-card">

              <div className="card-body">
                <h5 className="card-title ">Patients</h5>

                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center ms-5">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="ps-4">
                    <span className="text-success small pt-1 fw-bold">100</span> <span className="text-muted small pt-2 ps-1">
                      <Link to="/adminAppointment" >View</Link>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="col-xxl-4 col-md-6 mx-5">
            <div className="card info-card dep-card">

              <div className="card-body">
                <h5 className="card-title ">Departments</h5>

                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center ms-5">
                    <i className="bi bi-collection"></i>
                  </div>
                  <div className="ps-4">
                    <span className="text-success small pt-1 fw-bold">100</span> <span className="text-muted small pt-2 ps-1">
                      <Link to="/adminAppointment" >View</Link>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Admin