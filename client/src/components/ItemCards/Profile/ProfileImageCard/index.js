import React from 'react';
import API from '../../../../utils/API'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Change to a class

class ImageCard extends React.Component {

    state = {}

    componentDidMount = () => {
        this.setState({
            id: this.props._id,
            itemName: this.props.itemName
        })
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }
    handlePostItem = () => {
        var editedItem = {
            id: this.state.id,
            itemName: this.state.itemName,
            itemDescription: this.state.itemDescription,
            
        }
        API.editItem(editedItem)
        .then(res => {
            this.setState({
                itemName: '',
                itemDescription: '',
            })
        })
        .then(
            this.props.updateMethod()
        )
    }



    render() {
        return (

        <div>

            <div className="card" key={this.props.itemName}>
                <img className="card-img-top" src={this.props.picture || "https://via.placeholder.com/350x350"} alt={this.props.itemName} />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.itemName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Location: {this.props.zipCode}</h6>
                        <p className="card-text">{this.props.itemDescription}</p>

                        <FontAwesomeIcon
                            icon="trash"
                            onClick={() => { 
                                if (window.confirm("Are you sure you want to delete this item?")) this.props.deleteMethod(this.props._id);
                            }}
                            size="lg"
                        />
                        <FontAwesomeIcon
                            icon="edit"
                            size="lg"
                            data-toggle="modal"
                            data-target={'#editItemModal' + this.state.id}
                            onClick={()=>{
                                console.log(this.state.id)
                            }}
                        />

                    </div>
                </div>
            <div>
                <div className="modal fade" id={'editItemModal' + this.state.id} tabindex="-1" role="dialog" aria-labelledby={'editItemModal' + this.state.id}aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={'editItemModal' + this.state.id}>Update your item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handlePostItem}>
                                    <div className="userInputTitleEdit">Item Name:</div>
                                    <input className="informationInuptEdit"
                                        name="itemName"
                                        placeholder="Item name"
                                        onChange={this.handleInputChange}
                                    />

                                    <div className="userInputTitleEdit"> Item Description:</div>
                                    <input className="informationInuptEdit"
                                        name="itemDescription"
                                        placeholder="Describe your item"
                                        onChange={this.handleInputChange}
                                    />
                                </form>
                            </div>

                            <div class="modal-footer">
                                <button type="button" className="btn btn-primary"
                                    onClick={this.handlePostItem}
                                    data-dismiss="modal"
                                >
                                    Save Changes
                                </button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        )

    }
}

export default ImageCard;
