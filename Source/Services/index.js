import axios from 'axios';

const BASE_URL = 'http://192.168.29.179/Q/public/'


const setupsignupdata = async (name,email,phone_number,profile_Image,ip_address) => {
    let response = await axios.post(`${BASE_URL}/userDataSave`);
    return response;
}

export default {setupsignupdata};