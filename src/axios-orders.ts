import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-dd991.firebaseio.com/',
});

export default instance;