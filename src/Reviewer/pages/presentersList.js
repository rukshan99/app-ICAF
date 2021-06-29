import React, { Component } from 'react';
import axios from 'axios';
import Card from '../../Shared/UIElements/Card';

export default class userList extends Component {

    constructor(props) {
        super(props);   
        this.state = { usersCollection: [] }                                                                                                                                    
    }

    componentDidMount() {

        axios.get('http://localhost:4000/reviewer/getAllWorkshopPresenters/')
        .then(response => {
             console.log('usersCollection',response.data);
        this.setState({ usersCollection: response.data.data });
        })
    }

    render() {
        return (
            <div className="wrapper-users">
                <div className="container">
                    <Card className="downloadcard">
                        <div className="container">
                            <h1>Users</h1>
                            {this.state.usersCollection.length > 0 && this.state.usersCollection.map((user, index) => (
                            <div key={index} className="card mb-3">
                                <div className="p-3" > 
                                <h4> Name: {user.name}</h4>
                                <h5>Email: {user.email}</h5>
                                <h5>Role: {user.role}</h5>
                                {/* <h6>Document: {user.document}</h6> */}
                                </div>
                            </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}