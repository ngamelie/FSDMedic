import React, { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import './accountstyle.css'
import axios from "axios";
import config from "../../config/Config";

function Register(props) {

	const [data, setdata] = useState({ AppEmail: '', AppPassword: '', ConfirmPassword: '', AppRole: ''}) 
	const PATH = config().path; 
  	const apiUrl = PATH + "/User/Register"; 
	const navigate = useNavigate(); 
  	
	const Registration = (e) => {  
		e.preventDefault();  
		const data1 = { AppEmail: data.AppEmail, AppPassword: data.AppPassword, ConfirmPassword: data.ConfirmPassword, AppRole: data.AppRole};  
		
		axios.post(apiUrl, data1)  
			.then((response) => {  
			//console.log(response);  
			if (response.data.Status == 'Invalid')  
				alert('Invalid User');  
			else  
				alert('Register Successfully');				
				navigate('/'); 
			})  
  	}  
	const onChange = (e) => {  
		e.persist();  
		setdata({ ...data, [e.target.name]: e.target.value });  
	}  


  return (
  		<div id="content">
			<div className ="container">
				<div className ="row">
					<div className ="col-sm-5 auth-box">
						<div className ="account-box-shadow">
							<h3 className ="account-title">Sign Up</h3>
							<form onSubmit={Registration}>
								<div className ="form-group row">
									<div className ="col-sm-12">
										<input type="email" name="AppEmail" placeholder="Email"  onChange={onChange} value={data.AppEmail} className ="form-control" required="" />
									</div>
								</div>
								
								<div className ="form-group row">
									<div className ="col-sm-12">
										<input type="password" name="AppPassword" placeholder="Password" onChange={onChange} value={data.AppPassword} className ="form-control" />
									</div>
								</div>
								
								<div className ="form-group row">
									<div className ="col-sm-12">
										<input type="password" name="ConfirmPassword" placeholder="Confirm Password" onChange={onChange} value={data.ConfirmPassword} className ="form-control" />
									</div>
								</div>

                        <div className ="form-group row">
									<div className ="col-sm-12">
                              <select name="AppRole" id="role" onChange={onChange} value={data.AppRole} className ="form-control">
                                 <option value="" disabled selected>Select Role ...</option>
                                 <option value="patient">Patient</option>
                                 <option value="doctor">Doctor</option> 
											<option value="admin">Admin</option>                                                         
                              </select>
									</div>
								</div>
																
								<div className ="button-btn-block">
									<button type="submit" className ="btn btn-primary btn-lg btn-block">Sign Up</button>
								</div>							
								
								<div className ="auth-footer-text">
									<small>Already Sign Up,&nbsp;
                           <Link to="/login" className="nav-link">
                      Login</Link> Here</small>
								</div>
								
							</form>
							
						</div>
					</div>
				</div>
			</div>
		</div>	
	
  )
}

export default Register