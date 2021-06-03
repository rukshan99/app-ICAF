import React, { Component } from 'react';
import FileBase from 'react-file-base64';

import DefaultImg from './defaultImage.png';
import './uploadDocs.css';

let document = undefined;
class DocumentUpload extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      baseDoc: DefaultImg,
      docObj: {
        docName: null,
        docData:null,
        docStatus:null    
    }
  }
  }
  setDefaultImage(uploadType) {
      this.setState({
        baseDoc: DefaultImg
      });
  }

  uploadDocument(e, method) {
    let docObj = {};
  }

  getBaseFile(files) {
    
    this.setState({
        baseDoc: files.base64
    });

    this.setState({docObj:{
        docName: "base-document-" + Date.now(),
        docData: files.base64.toString(),
        docStatus: "Pending"
    }
      });
    document = this.state.docObj;  
    
  }

  render() {
    return (
        <div className="image-container">
          <div className="process">
            <h4 className="process__heading">Document Upload</h4>
            <div className="process__upload-btn">
              <FileBase type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
            </div>
            <img src={this.state.baseDoc} alt="upload-document" className="process__image" />
          </div>
        </div>

    );
  }
}

export {document};

export default DocumentUpload;