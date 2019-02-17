import React from "react";

class HomeImageCard extends React.Component {
  render() {
    const { item } = this.props;
    const modalId = "m-" + item._id;
    console.log(item);
    var Card = (
      <div className="conatiner">
        <div className="card">
          <img
            className="card-img-top"
            src={item.itemPicture || "https://via.placeholder.com/350x350"}
            alt={this.props.itemName}
          />
          <div className="card-body">
            <h5 className="card-title">{item.itemName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Location: {item.zipCode}
            </h6>
            <p className="card-text"></p>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target={`#${modalId}`}
              // onClick={this.handleItemInfo.bind(this, item._id)}
            >
              Check item{" "}
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <React.Fragment>
        <div
          class="modal fade"
          id={modalId}
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">
                  Item Information
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="card">
                  <img
                    className="card-img-top"
                    src={
                      item.itemPicture || "https://via.placeholder.com/350x350"
                    }
                    alt={item.itemName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.itemName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Location: {item.zipCode}
                    </h6>
                    <p className="card-text">{item.itemDescription}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Message Owner
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>{Card}</div>
      </React.Fragment>
    );
  }
}
export default HomeImageCard;
