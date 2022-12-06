import React from 'react'
import  './stylecommon.css';
import PropTypes from 'prop-types'

function Topbar(props) {
  return (
   <div id="topbar" class="d-flex align-items-center fixed-top">
      <div className="container d-flex justify-content-between">
         <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope"></i> <a href="mailto:contact@fsdmedic.com">contact@fsdmedic.com</a>
            <i className="bi bi-phone"></i> (514) 111-2222
         </div>
         <div className="d-none d-lg-flex social-links align-items-center">
            <a href="#"><i className="bi bi-twitter"></i></a>
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-google"></i></a>
            <a href="#"><i className="bi bi-linkedin"></i></a>
         </div>         
      </div>
    </div>
  )
}

Topbar.propTypes = {}

export default Topbar
