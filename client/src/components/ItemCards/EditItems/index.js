import React from 'react';

import API from '../../../utils/API';

class EditItem extends React.Component {

    state = {
        id: this.props.id,
        Value: "Hello"
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        //the way the console log is located it looks like it is 1 letter behing but really it is not
        this.setState({
            [name]: value,
        });
        
    }

    handlePostItem = () => {
        console.log(this.state)
        const editedItem = {
            itemName: this.state.itemName,
            id: this.state.id
        }
        API.editItem(editedItem)
        .then(res => {
            console.log(res)
        });
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

                                    <div className="userInputTitleEdit">zipCode:</div>


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
                                        
                                    />

                                    <input className="informationInuptEdit"
                                        name="zipCode"
                                        placeholder=" zipCode"
                                    />
                                </form>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary"
                                onClick={this.handlePostItem}
                                >
                                TEST
                                </button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                Close
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

