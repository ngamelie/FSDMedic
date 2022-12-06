import React from "react";
import "./stylecommon.css";

function Footer() {
  return (
    <div id="footer">
      <div className="container d-md-flex py-4 justify-content-center">
        <div className="text-center">
          <div>
            &copy; Copyright{" "}
            <strong>
              <span>FSD Medic</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">Designed by FSD 04 - Team 5</div>
        </div>
        
      </div>
    </div>
  );
}

export default Footer;
