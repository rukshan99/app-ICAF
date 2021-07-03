import React, { Component } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

import './presentationDetails.css'

class PresentationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentations: [],
    }

  }

  componentDidMount() {
    console.log('id : ' , this.props.match.params.id );
    axios.get(`http://localhost:4000/api/v1/admin/presentations/${this.props.match.params.id}`)
    .then(response => {
      this.setState({ presentations: response.data.data })
      console.log(response.data)
    })
    .catch(error => {
      alert(error.message)
    })

  }

  

  render() {
    return (
      <div className="container">
          <Card className="conf">
        <h1>Presestations</h1>
        {this.state.presentations.length > 0 && this.state.presentations.map((presenatation) => (
          <div className="card-2">
            <div>
              <h4>Presentaion Topic: {presenatation.topic}</h4>
              <h5>Description: {presenatation.description}</h5>
              <h5>Start Time: {presenatation.starttime}</h5>
              <h5>End Time: {presenatation.endtime}</h5>
              <h5>Presentor: {presenatation.presenter}</h5>
            </div>
          </div>
        ))}
        </Card>
      </div>
    )
  }
}

export default PresentationDetails;