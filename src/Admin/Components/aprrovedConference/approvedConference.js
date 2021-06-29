import React, { Component } from "react";
import Service from "../../service/service";

export default class Conference extends Component {
  constructor(props) {
    super(props);
    this.getConference = this.getConference.bind(this);
    this.updateStatus = this.updateStatus.bind(this);

    this.state = {

     
      
      currentConference: {
        id: null,
        status: false
      }
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem('conferencetId'));
     this.getConference(localStorage.getItem('conferencetId'));
  }


  getConference(id) {
    Service.get(id)
      .then(response => {
        this.setState({
          currentConference: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentConference._id,
      status: status
    };

    Service.update(this.state.currentConference._id, data)
      .then(response => {
        this.setState(prevState => ({
          currentConference: {
            ...prevState.currentConference,
            status: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentConference } = this.state;

    return (
      <div>
        {currentConference ? (
          <div className="edit-form">
            <h4>Conference</h4>
            <div>
                <label>
                  <strong>Conference:</strong>
                </label>{" "}
                {currentConference.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentConference.description}
              </div>
            

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentConference.status ? "Approved" : "Pending"}
              </div>
            

            {/* {currentConference.status ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )} */}

          </div>
        ) : (
          <div>
            <br />
            {/* <p>Please click on a Tutorial...</p> */}
          </div>
        )}
      </div>
    );
  }

}