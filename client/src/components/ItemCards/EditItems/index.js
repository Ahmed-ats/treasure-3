import React from 'react';

import API from '../../../utils/API';

class EditItem extends React.Component {

    state = {
        id: this.props.id,
        itemName: '',
        itemDescription: '',
        updateCounter: this.props.updateCounter
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
        
    }

    handlePostItem = () => {
        
        const editedItem = {
            itemName: this.state.itemName,
            id: this.state.id,
            itemDescription: this.state.itemDescription,
            
        }
        API.editItem(editedItem)
        .then(res => {
            this.setState({
                id: editedItem.id,
                itemName: '',
                itemDescription: '',
            })
        })
        .then(
            this.props.updateMethod(this.state.id)
        )
        
    }

    render() {

        return (
            <div>

                <div className="modal fade" id="editItemModal" tabindex="-1" role="dialog" aria-labelledby="editItemModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editItemModal">Item input</h5>
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
                                <button type="button" className="btn btn-secondary"
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
        )


    }

}

export default EditItem;

