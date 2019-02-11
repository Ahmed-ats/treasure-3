import React from 'react';
import './imagelist.css';
import ImageCard from "../ImageCard";

const ImageList = (props) => {

    var Image = props.itemObj.map(object => {
        return <ImageCard 
        itemName={object.itemName} 
        zipCode={object.zipCode}
        itemDescription={object.itemDescription}
        key={object.name}
        picture={object.itemPicture}
        username={object.username}
        _id = {object._id}
        />
    })
    
   
    return(

        <div className="card-columns">
          {Image}
        </div>
    )
};

export default ImageList;