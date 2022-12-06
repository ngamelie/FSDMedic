import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

function Logout() {

  const { authRole, setAuthRole, authEmail, setAuthEmail } = useContext(AuthContext);

  let navigate = useNavigate();
  
  useEffect(() => {
   setAuthRole(0);
   setAuthEmail("");
   localStorage.clear();

   navigate("/");
}, []);

  return;
}

export default Logout;
