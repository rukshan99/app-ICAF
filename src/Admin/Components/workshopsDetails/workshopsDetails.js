import React, { Component } from 'react';
import axios from 'axios';

import './workshopsDetails.css'


class WorkshopsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: [],
    }

  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/v1/admin/workshops/${this.props.match.params.id}`)
    .then(response => {
      this.setState({ workshops: response.data.data })
      console.log(response.data.data)
    })
    .catch(error => {
      alert(error.message)
    })

  }

  

  render() {
    return (
        <div className="container">
        <h1>Work shops</h1>
        {this.state.workshops.length > 0 && this.state.workshops.map((workshop) => (
          <div className="card-2">
            <div>
              <h4>Wokshops Topic: {workshop.topic}</h4>
              <h5>Description: {workshop.description}</h5>
              <h5>Start Time: {workshop.starttime}</h5>
              <h5>End Time: {workshop.endtime}</h5>
              <h5>Presentor: {workshop.presenter}</h5>
            </div>
          </div>
        ))}
          </div>
              
    )
  }
}

export default WorkshopsDetails;