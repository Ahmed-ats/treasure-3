import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (zipcode, fullname, username, email, password) => {
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

  deleteItem: (id) => {
    return axios.post(`/api/deleteitem/${id}`)
  },

  editItem: (body) => {
    console.log(body)
    // IS ABLE TO GRAB BODY INFORMATION FROM FRONT-END...BREAKS IN SERVER.JS, REQ.BODY RETURNS NULL
    return axios.post(`/api/edititem/${body.id}`, {itemName: body.itemName, itemDescription: body.itemDescription})
  },

  // Adds new item and pushes item.id to array in Users  
  postItem: (body) => {
    return axios.post("/api/additem", { itemName: body.itemName, itemDescription: body.itemDescription, userId:body.userId, zipCode: body.zipCode, itemPicture: body.itemPicture })
  },

  getAnItem : (id) => {
     return axios.get(`/api/Item/${id}`)
  }
};
