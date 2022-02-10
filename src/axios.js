import axios from 'axios';

const token = localStorage.getItem('token');

export default axios.create({
    baseURL: 'https://agritech-web.herokuapp.com/api/v1',
    headers: {
        Authorization: 'Bearer ' + token,
    },
});
