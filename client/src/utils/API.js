import axios from "axios";

const API = {

    doIt: names => {
      return axios.post('/sendmsg', names);
    }
}
  
  export default API;