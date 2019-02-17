import React from "react";
import AuthService from "../../AuthService";
import API from "../../../utils/API";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

registerPlugin(
  FilePondPluginImageResize,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop
);

class AddPic extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();

    this.state = {
      picture: ""
    };
  }

  handleProfileImage = e => {
    e.preventDefault();

    const userId = this.props.userId;

    const data = new FormData();
    data.append("file", this.state.picture[0]);
    data.append("category", "image");

    fetch(
      "https://www.fileconvrtr.com/api/convert/file?apiKey=a8f545dbb31244a5b081a8cc6bdf37f7",
      {
        method: "POST",
        body: data
      }
    ).then(response => {
      response.json().then(body => {
        const imgurl = body.s3Url;
        const userPicId = {
          userId,
          imgurl
        };
        API.userimage(userPicId).then(res => {
          if (this.props.onSuccess) {
            this.props.onSuccess();
          }
        });
      });
    });
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-secondary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add/Change Picture
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Picture
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
                <div className="userInputTitle">Add a Picture:</div>

                <FilePond
                  labelIdle={`Drag & Drop your picture or <span>Browse</span>`}
                  imagePreviewHeight={200}
                  // imageCropAspectRatio={ '1:1'}
                  // imageResizeTargetWidth={ 200}
                  // imageResizeTargetHeight={ 200}
                  // stylePanelLayout={ ' circle'}
                  // styleButtonRemoveItemPosition={ 'ctop'}
                  // allowImageCrop = {true}

                  file={this.state.file}
                  onupdatefiles={fileItems => {
                    this.setState({
                      picture: fileItems.map(fileItem => fileItem.file)
                    });
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleProfileImage}
                  data-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPic;
