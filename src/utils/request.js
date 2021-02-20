import axios from 'axios';

export const POST = async (path, data) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}${path}`, data)
    .then(({ data }) => data);
