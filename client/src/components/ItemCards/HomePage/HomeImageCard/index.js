import React from 'react';
import API from '../../../../utils/API';


class HomeImageCard extends React.Component {
       
    
    
    constructor(props) {
        super(props);
        
        this.state = {
         
            itemName: '',
            itemDescription: '',
            itemPicture: '',
            zipCode: '',
           
        };

         
       
    }
     
    handleItemInfo = (id, e ) => {
            API.getAnItem(id).then(res => {
                this.setState({
                    itemName: res.data[0].itemName,
                    itemDescription: res.data[0].itemDescription,
                    itemPicture: res.data[0].itemPicture,
                    zipCode: res.data[0].zipCode 
                })
                console.log(this.state.itemDescription)
            })
     }
    
    render() {
   
    var Card = this.props.items.map(item => {
        
        return (
            <div className="conatiner">
                <div className="card">
                    <img className="card-img-top" src={item.itemPicture || "https://via.placeholder.com/350x350"} alt={this.props.itemName} />
                    <div className="card-body">
                        <h5 className="card-title">{item.itemName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Location: {item.zipCode}</h6>
                        <p className="card-text">Posted By: {this.props.user}</p>
                        <button className="btn btn-primary" data-toggle="modal"
                                data-target="#profileCard" 
                                onClick={this.handleItemInfo.bind(this, item._id)}
                                             >Check item </button>

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
                                        <img className="card-img-top" src={this.state.itemPicture || "https://via.placeholder.com/350x350"} alt={this.state.itemName} />
                                        <div className="card-body">
                                            <h5 className="card-title">{this.state.itemName}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Location: {this.state.zipCode}</h6>
                                            <p className="card-text">{this.state.itemDescription}</p>
                                            {/* <p className="card-text">Posted By: {this.props.user}</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Message Owner</button>
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
}
export default HomeImageCard;
