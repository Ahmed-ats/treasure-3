import React from 'react';
import API from '../../utils/API';









class ItemInputCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
         
            itemName: '',
            itemDescription: '',
            itemPicture: '',
            zipCode: '',
        };

         
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        //the way the console log is located it looks like it is 1 letter behing but really it is not
        this.setState({
            [name]: value,
        });
        
    }

    handlePostItem = () => {
        const itemPicture = this.state.itemPicture;
        const { itemName, itemDescription, zipCode, } = this.state;
        let userId = this.props.userId.id
        console.log(userId)
        const newItem = {
            itemName, 
            itemDescription,
            itemPicture,
            zipCode,
            userId
        }
        
        API.postItem(newItem)
        .then(
            this.setState({
                itemName: "",
                itemDescription: "",
                itemPicture: "",
                zipCode: ''
            })
        )
    }
    // handleGetItem = (e) => {
    //     const { itemName, itemDescription, itemPicture, zipCode } = this.state;
    //     const newItem = {
    //         itemName, 
    //         itemDescription,
    //         itemPicture,
    //         zipCode
    //     }
        
    //     API.getItem(newItem)
    //     this.setState({
    //         itemName: "",
    //         itemDescription: "",
    //         itemPicture: "",
    //         username:"",
    //         zipCode:"",
           
    //     })

    // }

    handleUploadImage(e) {

        e.preventDefault();
        const data = new FormData();
        data.append('file', this.uploadInput.files[0] );
        data.append('category', 'image');
               
        fetch('https://www.fileconvrtr.com/api/convert/file?apiKey=a8f545dbb31244a5b081a8cc6bdf37f7',{
          method: 'POST',
          body: data
        }).then((response) => {
            
        response.json()
        .then((body) => {
            this.setState({
                itemPicture: body.s3Url  
            })
            this.handlePostItem();
            
            });
            
        });
        
    }
        
    


   

    
    render() {
        return (
            <div>
               
                <div className="modal fade" id="itemInputModal" tabindex="-1" role="dialog" aria-labelledby="itemInputModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="itemInputModal">Item input</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                
                                <form onSubmit={this.handlePostItem}>

                                    <div class="form-group">
                                        <label for="exampleFormControlSelect1">Categories</label>
                                        <select class="form-control" id="exampleFormControlSelect1">
                                            <option>Appliancies</option>
                                            <option>Clothes</option>
                                            <option>Cars/Trucks</option>
                                            <option>Furnture</option>
                                            <option>Other</option>
                                        </select>
                                    </div>


                                    <div className="form-group" > Item Name
                                        <input className="form-control"
                                            name="itemName"
                                            placeholder="Item name"
                                            value={this.state.itemName}
                                            onChange={this.handleInputChange} />
                                    </div>


                                   

                                    <div className="form-group" > Zip Code
                                        <input className="form-control"
                                            name="zipCode"
                                            placeholder=" zipCode"
                                            onChange={this.handleInputChange}
                                            value={this.state.zipCode}
                                        />
                                    </div>

                                  
                                          <div class="form-group"> Item Description
                                           
                                            <textarea class="form-control"  rows="3"
                                                name="itemDescription"
                                                placeholder="Describe your item"
                                                rows = " 3"
                                                value={this.state.itemDescription}
                                                onChange={this.handleInputChange}>
                                            </textarea>
                                        </div>
                                 

                                    <br></br>
                                        
                                    <div className="form-group" > Upload Picture:</div>
                                    <input type="file" multiple
                                        ref={(ref) => { this.uploadInput = ref; }}
                                    />

                                    </form>
                                    

                               
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={this.handleUploadImage}> Post Item</button>
                            </div>
                        </div>
                    </div>
                </div>





            </div>
        );
    }
}

export default ItemInputCard;