import React, { Component } from 'react';
import "./Main.css";
import hello from "../../assets/hello.png";
// import Chart from "../charts/chart";
import axios from 'axios';
import Service from "../../service/service"

// var Link = require('react-router-dom').Link

class Main extends Component {
  constructor(props) {
    super(props);
    this.retrieveConfernces = this.retrieveConfernces.bind(this);
    this.retrievepresentations = this.retrievepresentations.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveConference = this.setActiveConference.bind(this);
    this.setActivePresentations = this.setActivePresentations.bind(this);
    

    

    this.state = {
      User: [],
      totalroleAttendee: '',
      totalroleResearcher: '',
      totalroleWorkshopPresenter: '',
      conferences: [],
      currentConference: null,
      currentIndex: -1,
      presentations: [],
      currentPresentation: null,
      approvedOne: []

    }
  }


  componentDidMount(){
    axios.get(`http://localhost:4000/admin/count/`)
    .then(response => {
      this.setState({ totalroleAttendee: response.data.totalroleAttendee })
      this.setState({ totalroleResearcher: response.data.totalroleResearcher})
      this.setState({ totalroleWorkshopPresenter: response.data.totalroleWorkshopPresenter})
      console.log(response);
    })
    .catch(error => {
      alert(error.message)
    })

    this.retrieveConfernces();
    this.retrievepresentations();
    this.retrieveApprovedConference()
  }


  retrieveConfernces(){
    Service.getConAll()
    .then(response => {
      this.setState({
        conferences: response.data.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  retrievepresentations(){
    Service.getPresAll()
    .then(response => {
      this.setState({
        presentations: response.data.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  retrieveApprovedConference(){
    Service.getAprroved()
    .then(response => {
      this.setState({
        approvedOne: response.data.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  refreshList() {
    this.retrieveConfernces();
    this.setState({
      currentConference: null,
      currentIndex: -1
    });
  }

  setActiveConference(conference, index) {
    this.setState({
      currentConference: conference,
      currentIndex: index
    });
  }

  setActivePresentations(presentation, index) {
    this.setState({
      currentPresentation: presentation,
      currentIndex: index
    });
  }

  saveId(id) {
    localStorage.setItem('conferencetId', id);
  }
  


render() {
  const{ conferences, currentConference, currentIndex,presentations,currentPresentation,approvedOne } = this.state;

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello ICAF.</h1>
            <p>Welcome to your admin dashboard</p>
          </div>
        </div>


        <div className="main__cards">
          <div className="card">
            <i className="fa fa-thumbs-up fa-2x text-greenfa"></i>
            <div className="card_inner">
            <p className="text-primary-p">Approved Conference</p>
            { approvedOne &&
                  approvedOne.map((approved) => (
                  <li>
                  {approved.name}
                  <a href={`/contact/${approved._id}`}><button onClick={() => {this.saveId(approved._id)}}>More Details</button> </a>
                </li>
              ))}
            </div>
          </div>


          <div className="card">
            <i className="fa fa-calendar fa-2x text-red"></i>
            <div className="card_inner">
              <p className="text-primary-p">Researchers</p>
              <span className="font-bold text-title">{this.state.totalroleResearcher}</span>
            </div>
          </div>


          <div className="card">
            <i className="fa fa-video-camera fa-2x text-yellow"></i>
            <div className="card_inner">
              <p className="text-primary-p">Work Shop Presenters</p>
              <span className="font-bold text-title">{this.state.totalroleWorkshopPresenter}</span>
            </div>
          </div>


          <div className="card">
            <i className="fa fa-thumbs-up fa-2x text-greenfa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">
              <p className="text-primary-p">Attendees:</p>
              <span className="font-bold text-title">{this.state.totalroleAttendee}</span>
            </div>
          </div>
        </div>



        <div className="charts">
         


          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Summary of Research Papers</h1>
                <p>ICAF Sri Lanka</p>
              </div>
              <i className="fa fa-usd"></i>
            </div>



            <div className="charts__right__cards">
              <div className="card1">
                <h1>Pendings</h1>
                <p>$75,300</p>
              </div>

              <div className="card2">
                <h1>Approvels</h1>
                <p>$124,200</p>
              </div>

              {/* <div className="card3">
                <h1></h1>
                <p>3900</p>
              </div> */}

              <div className="card4">
                <h1>Rejects</h1>
                <p>1881</p>
              </div>
              

            </div>

          </div>


          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Summary of Work Shops</h1>
                <p>ICAF Sri Lanka</p>
              </div>
              <i className="fa fa-usd"></i>
            </div>



            <div className="charts__right__cards">
              <div className="card1">
                <h1>Pendings</h1>
                <p>$75,300</p>
              </div>

              <div className="card2">
                <h1>Approvels</h1>
                <p>$124,200</p>
              </div>

              <div className="card4">
                <h1>Rejects</h1>
                <p>1881</p>
              </div>
              

            </div>

          </div>
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                {/* <h1>All Conferencees</h1>
              </div>
              <i className="fa fa-usd"></i>
            </div>
            <div> */}
                <h1>All Conferencees</h1>
              </div>
              <i className="fa fa-usd"></i>
            </div>
            <div className="list row">
              <div className="col-md-6">
                <h4>Confernces List</h4>

               <ul className="list-group">
                  { conferences &&
                  conferences.map((conference, index) => (
                  <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveConference(conference, index)}
                  key={index}
                >
                  {conference.name}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentConference ? (
            <div>
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
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentConference.status ? "Approved" : "Pending"}
              </div>

              <a href={`/conferenceDetails/${currentConference._id}`}><button onClick={() => {this.saveId(currentConference._id)}}>update</button> </a>
          
            </div>
          ) : (
            <div>
              <br />
              {/* <p>Please click on a Tutorial...</p> */}
            </div>
          )}

        </div>
          </div>
          </div>

          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>All Presestation</h1>
              </div>
              <i className="fa fa-usd"></i>
            </div>
            <div className="list row">
              <div className="col-md-6">
                <h4>Presestations List</h4>

               <ul className="list-group">
                  { presentations &&
                  presentations.map((presestation, index) => (
                  <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePresentations(presestation, index)}
                  key={index}
                >
                  {presestation.topic}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentPresentation ? (
            <div>
              <h4>Conference</h4>
              <div>
                <label>
                  <strong>Conference:</strong>
                </label>{" "}
                {currentPresentation.topic}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentPresentation.description}
              </div>
              {/* <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentConference.status ? "Approved" : "Pending"}
              </div>

              <a href={`/conferenceDetails/${currentConference._id}`}><button onClick={() => {this.saveId(currentConference._id)}}>update</button> </a> */}
          
            </div>
          ) : (
            <div>
              <br />
              {/* <p>Please click on a Tutorial...</p> */}
            </div>
          )}

        </div>
      </div>
          </div>

          </div>

          </div>

      </main>

    )

  }

}

export default Main;
