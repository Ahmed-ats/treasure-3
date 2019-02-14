import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: (id) => {
    
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (zipcode, fullname, username, email, password) => {
    // console.log(fullname)
    return axios.post('api/signup', {zipcode: zipcode, fullname: fullname, username: username, email: email, password: password});
  },

  // Method for rendering items on home page
  getAllUsers: () => {
    return axios.get('/api/allusers');
  },
  // add profile image 
  userimage:  body => {
    const id = body.userId
    
    return axios.put(`/api/userimage/${id} `,{imageurl: body.imgurl})

  },

  // Adds new item and pushes item.id to array in Users  
  postItem: (body) => {
    
    return axios.post("/api/additem", { itemName: body.itemName, itemDescription: body.itemDescription, userId:body.userId, zipCode: body.zipCode, itemPicture: body.itemPicture })
  },
};
