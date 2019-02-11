import React from 'react';
import { PromiseProvider } from 'mongoose';
import "./ProfileImage.css"



const ProfileImage = (props) => {

 
    return(

        <div 
       className="card-columns">
            <img src = {props.userpicture}   className = "profilePicture" />

        </div>
    )
};

export default ProfileImage;