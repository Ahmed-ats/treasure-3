import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: (id) => {
    console.log(id)
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (fullname, username, email, password) => {
    // console.log(fullname)
    return axios.post('api/signup', {fullname: fullname, username: username, email: email, password: password});
  }
};
