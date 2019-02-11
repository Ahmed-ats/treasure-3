import React from 'react';
import './imagecard.css'
import API from '../../utils/API';

 
const handleDeleteItem = (id) => {
        API.deleteItem(id);
      // refresh data  
      window.location.reload()
}

const ImageCard = (props) => {

    return (
        <div>
            <div className="card" key={props.itemName}>
                <img className="card-img-top" src={props.picture || "https://via.placeholder.com/350x350"}  alt={props.itemName}/>
                <div className="card-body">
                    <h5 className="card-title">{props.itemName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Location: {props.zipCode}</h6>
                    <p className="card-text">{props.itemDescription}</p>
                    <p className="card-text">Posted By: {props.username}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                    <button onClick={ () => handleDeleteItem(props._id)}> Delete</button>
                </div>
            </div>
        </div>
    )
        
}
        
export default ImageCard;
