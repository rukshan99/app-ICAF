import React, { Component} from 'react';
import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  contactno: '',
  subject: '',
  timeslot: '',
  status:'Active',
  errors: {
    email: '',
    phone: '',
  }
}

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validPhoneRegex = RegExp(
  /^[0-9\b]+$/
);

class editor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = initialState;
  }

  handleChange(event) {    this.setState({status: event.target.value});  }
  onChange(e) {
    let errors = this.state.errors;
    this.setState({ [e.target.name]: e.target.value })
    if(e.target.name === "email"){
      const { value } = e.target;
      errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not in valid type!';
    }
    if(e.target.name === "contactno"){
      const { value } = e.target;
      errors.phone = 
      validPhoneRegex.test(value) && value.length === 10
      ? ''
      : 'Phone is not in valid type!';
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let conference = {
      name: this.state.name,
      email: this.state.email,
      contactno: this.state.contactno,
      subject: this.state.subject,
      timeslot: this.state.timeslot,
      status: this.state.status,
    }
    console.log('DATA TO SEND', conference);
    axios.post('http://localhost:4000/editor', conference)
    .then(response => {
      alert('Data successfully inserted')
    })
    .catch(error => {
      console.log(error.message);
      alert('Data cannot be empty..! '+ error.message)
    })
  }

  render() {
    const {errors} = this.state;
    return (
        <React.Fragment>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" integrity="undefined" crossorigin="anonymous"></link>
      <div className="container  col-lg-4">
        <h1>Create Conference</h1><br></br>
        <div class="w-75 p-3 shadow-lg p-3 mb-5 bg-white rounded p-3 mb-2 bg-light text-dark " >
        <form onSubmit={this.onSubmit} >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              name="name" 
              value={this.state.name} 
              onChange={this.onChange}
            />
          </div>
          <div class="mb-3">
            <label htmlFor="email" class="form-label">Email Address</label>
            <input 
              type="text" 
              className="form-control" 
              id="email" 
              name="email" 
              value={this.state.email} 
              onChange={this.onChange}
            />
            {errors.email && 
                  <p class="text-danger">{errors.email}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="contactno" className="form-label">Contact Number</label>
            <input 
              type="text" 
              className="form-control" 
              id="contactno" 
              name="contactno" 
              value={this.state.contactno}
              onChange={this.onChange}
            />
            {errors.phone && 
                  <p class="text-danger">{errors.phone}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input 
              type="text" 
              className="form-control" 
              id="subject" 
              name="subject" 
              value={this.state.subject}
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="timeslot" className="form-label">Time Slot</label>
            <input 
              type="datetime-local" 
              className="form-control" 
              id="timeslot" 
              name="timeslot" 
              value={this.state.timeslot}
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select id="status" name="status"  className="form-control"  value={this.state.status} onChange={this.handleChange}>            
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          </div>

    <div class="col text-center">
          <button type="submit" class="form-control btn btn-outline-primary btn-lg btn-block">Submit</button>
          </div>
        </form>
        </div>
      </div>
    </React.Fragment>
    )
  }
}

export default editor;