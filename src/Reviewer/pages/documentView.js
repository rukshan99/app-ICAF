import React, { Component } from 'react';
import axios from 'axios';

import Card from '../../Shared/UIElements/Card';


class document extends Component{
     constructor(props){
        super(props);
        this.state = {
            documents: []
          }
        
    };

    componentDidMount(){
        console.log('id : ' , this.props.match.params.id );
        axios.get(`http://localhost:4000/reviewer/${this.props.match.params.id}`)
        .then(response => { 
            this.setState({ documents : response.data.data })
            console.log('document' ,this.state.documents);
        })
        .catch(error =>{
            alert(error.message);
        })
        
    }

    // OnAccept(e) {
    
    //     const Status="Accept"
    //     axios.post(`http://localhost:4000/reviewer/update/${this.props.match.params.id}`, Status)
    //         .then(res => console.log(res.data));
    // }


    // OnDecline(e) {
    
    //     const Status="Decline"
    //     axios.post(`http://localhost:4000/reviewer/update/${this.props.match.params.id}`, Status)
    //         .then(res => console.log(res.data));
    // }
    

    render(){
        return(
    //         <div className="container">
    //             <h1>Document Details</h1>
    //             {this.state.documents.length > 0 && this.state.documents.map((item, index) => (
    //             <div key={index} className="card mb-3">
    //                 <div className="p-3">
    //                 <h4>Doc Name: {item.docName}</h4>
    //                 {/* <h5>Document: {item.document.docData}</h5>
    //                 <h5>Status: {item.document.docStatus}</h5> */}
    //                 </div>
    //             </div>
    //             ))}
    //   </div>
    <div className="wrapper-users">
                <div className="container">
                <Card className="downloadcard">
                    <div className="container">
                    <h1>Document</h1>       
                    <div className="card mb-3">    
                            <h4>Doc Name: {this.state.documents.docName}</h4>
                            <h4>Document</h4>
                            <iframe src={this.state.documents.docData} alt="document" className="process__image" width="100%" height="350" frameBorder="0" allowFullScreen/>
                            <h4>Doc Status: {this.state.documents.docStatus}</h4>
                            <div className="form-group">
                                <button onClick={e => this.OnAccept(e)} value="Accept">Accept</button>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <button onClick={e => this.OnDecline(e)} value="Decline" className="btn btn-primary">Decline</button>
                            </div>                                   
                    </div>    
                    </div>
                </Card>
                </div>
            </div>
        )
    }
}

export default document;