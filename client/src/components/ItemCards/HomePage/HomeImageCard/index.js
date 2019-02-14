import React from 'react';


const HomeImageCard = (props) => {

    var Card = props.items.map(item => {
        return (
            <div className="conatiner">
                <div type="button" data-toggle="modal" data-target="#profileCard" className="card">
                    <img className="card-img-top" src={item.itemPicture || "https://via.placeholder.com/350x350"} alt={props.itemName} />
                    <div className="card-body">
                        <h5 className="card-title">{item.itemName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Location: {item.zipCode}</h6>
                        {/* <p className="card-text">{item.itemDescription}</p> */}
                        <p className="card-text">Posted By: {props.user}</p>
                        {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#profileCard">Info</button> */}

                        {/* <button href="#" className="btn btn-primary" onClick={() => {
                    props.getId(item._id);
                    window.location.replace(`/chat/${item._id}`)
                    }}>Go somewhere</button> */}
                        {/* <Link to={`/chat/${item._id}`}>Go Somewhere</Link> */}

                    </div>
                    <div class="modal fade" id="profileCard" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalTitle">Item Information</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="card">
                                    <img className="card-img-top" src={item.itemPicture || "https://via.placeholder.com/350x350"} alt={props.itemName} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.itemName}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Location: {item.zipCode}</h6>
                                        <p className="card-text">{item.itemDescription}</p>
                                        <p className="card-text">Posted By: {props.user}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    })

    return (
        <div>{Card}</div>
    )
}

export default HomeImageCard;
