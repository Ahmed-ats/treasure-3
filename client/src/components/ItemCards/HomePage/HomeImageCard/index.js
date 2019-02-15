import React from 'react';

// May have to convert to class so that component will rerender when state changes
var HomeImageCard = (props) => {

    var Card;

    if (props.searchQuery) {
        return (
        <div className="card">
                
                <div className="card-body">
                    <h5 className="card-title">TEST</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Location: </h6>
                    <p className="card-text">Description test</p>
                    <p className="card-text">Posted By:</p>
                   
                </div>
            </div>
        )
    }
    else {
        console.log(props)
        Card = props.items.map(item => {
            return (
                <div className="card">
                    <img className="card-img-top" src={item.itemPicture || "https://via.placeholder.com/350x350"} alt={props.itemName} />
                    <div className="card-body">
                        <h5 className="card-title">{item.itemName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Location: {item.zipCode}</h6>
                        <p className="card-text">{item.itemDescription}</p>
                        <p className="card-text">Posted By: {props.user}</p>

                        {/* <button href="#" className="btn btn-primary" onClick={() => {
                        props.getId(item._id);
                        window.location.replace(`/chat/${item._id}`)
                        }}>Go somewhere</button> */}
                        {/* <Link to={`/chat/${item._id}`}>Go Somewhere</Link> */}
                    
                    </div>
                </div>
            );
        })
    }


    return (
        <div>{Card}</div>
    )
}

export default HomeImageCard;
