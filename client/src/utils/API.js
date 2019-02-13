import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: (id) => {
    console.log(id)
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (zipcode, fullname, username, email, password) => {
    // console.log(fullname)
    return axios.post('api/signup', {zipcode: zipcode, fullname: fullname, username: username, email: email, password: password});
  },
  
  // add profile image 
  userimage:  body => {
    const id = body.userId
    console.log(body)
    return axios.put(`/api/userimage/${id} `,{imageurl: body.imgurl})

  }
};
