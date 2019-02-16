import React from 'react';
import EditItem from '../../EditItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const ImageCard = (props) => {
    
    return (
        
        <div>
            <EditItem id={props._id} updateMethod={props.updateMethod}/>
            <div className="card" key={props.itemName}>
                <img className="card-img-top" src={props.picture || "https://via.placeholder.com/350x350"}  alt={props.itemName}/>
                <div className="card-body">
                    <h5 className="card-title">{props.itemName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Location: {props.zipCode}</h6>
                    <p className="card-text">{props.itemDescription}</p>
                    
                    <FontAwesomeIcon 
                    icon="trash"
                    onClick={ () => { if(window.confirm("Are you sure you want to delete this item?")) props.deleteMethod(props._id)} } 
                    size="lg"
                    />
                    <FontAwesomeIcon 
                    icon="edit"
                    size="lg"
                    data-toggle="modal" 
                    data-target="#editItemModal"
                    ></FontAwesomeIcon>
                </div>
            </div>
        </div>


    )
        
}
        
export default ImageCard;
