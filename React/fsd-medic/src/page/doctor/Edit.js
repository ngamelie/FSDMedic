import Axios from "axios";
import config from "../../config/Config";

function Edit() {
    const PATH = config().path;

    const btn_Edit = () => {
        if(verify()){
          Axios.post(PATH + "/doctor/Edit", {
            Id: 2,
            email: "123@123.com",
            address: "123 street",
            name: "2",
            phone: "2",
            dob: 2000-01-01,
            gender: "F",
            blood: "B",
            card_num: "BBB",
            contactor: "Bob",
            contact_num: "22222222",
            photo: "2",
            Status: 0
          }).then((rs) => {
            const obj = rs.data
            const str = JSON.stringify(obj)
            const o = JSON.parse(str)
          });
        }
    };
    
    function verify() {
        var rs = true
        return rs
    }
      
    return (
        <>
          <button type="button" onClick={btn_Edit}> Edit </button>
        </>
    );
}
export default Edit;