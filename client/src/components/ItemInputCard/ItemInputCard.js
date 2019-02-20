import React from "react";
import API from "../../utils/API";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop);

class ItemInputCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: "",
      itemDescription: "",
      itemPicture: "",
      zipCode: "",
      transactionType: "trade",
      files: ""
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    //the way the console log is located it looks like it is 1 letter behing but really it is not
    this.setState({
      [name]: value
    });
  };

  handlePostItem = () => {
    // const itemPicture = this.state.itemPicture;
    const {
      itemName,
      itemDescription,
      zipCode,
      itemPicture,
      transactionType
    } = this.state;
    let userId = this.props.userId.id;

    const newItem = {
      itemName,
      itemDescription,
      itemPicture,
      zipCode,
      userId,
      transactionType
    };

    API.postItem(newItem).then(
      this.setState({
        itemName: "",
        itemDescription: "",
        itemPicture: "",
        zipCode: "",
        transactionType
      })
    );
  };

  handleUploadImage = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.files[0]);
    data.append("category", "image");

    fetch(
      "https://www.fileconvrtr.com/api/convert/file?apiKey=a8f545dbb31244a5b081a8cc6bdf37f7",
      {
        method: "POST",
        body: data
      }
    ).then(response => {
      console.log(response);
      response.json().then(body => {
        console.log(body);
        this.setState({
          itemPicture: body.s3Url
        });
        this.handlePostItem();
      });
    });
  };

  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="itemInputModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="itemInputModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="itemInputModal">
                  Item input
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handlePostItem}>
                  <div className="form-group">
                    <label for="exampleFormControlSelect1">Categories</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option>Appliancies</option>
                      <option>Clothes</option>
                      <option>Cars/Trucks</option>
                      <option>Furnture</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    {"Item Name "}

                    <input
                      className="form-control"
                      name="itemName"
                      placeholder="Item name"
                      value={this.state.itemName}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    {" Zip Code"}

                    <input
                      className="form-control"
                      name="zipCode"
                      placeholder=" zipCode"
                      onChange={this.handleInputChange}
                      value={this.state.zipCode}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleFormControlSelect1">
                      {" Trade or Giveaway "}
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name="transactionType"
                      onChange={this.handleInputChange}
                      value={this.state.transactionType}
                    >
                      <option value="trade">Trade</option>
                      <option value="giveaway">Giveaway</option>
                    </select>
                  </div>

                  {"Item Description "}
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="itemDescription"
                      placeholder="Describe your item"
                      rows=" 3"
                      value={this.state.itemDescription}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <br />

                  <FilePond
                    labelIdle={`Drag & Drop your picture or <span>Browse</span>`}
                    file={this.state.file}
                    // allowMultiple={true}
                    // allowImageResize ={true}
                    onupdatefiles={fileItems => {
                      this.setState({
                        files: fileItems.map(fileItem => fileItem.file)
                      });
                    }}
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleUploadImage}
                  data-dismiss="modal"
                >
                  {"Post Item"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemInputCard;
