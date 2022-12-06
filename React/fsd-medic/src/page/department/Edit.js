import Axios from "axios";
import config from "../../config/Config";

function Edit() {
    const PATH = config().path;

    const btn_Edit = () => {
        if(verify()){
          Axios.post(PATH + "/department/Edit", {
            Id: 2,
            name: "2",
            room_num: 2,
            phone: "2",
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