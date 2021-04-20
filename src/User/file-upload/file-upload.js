import React, { useState } from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload = () => {
    
    const [selectedFile, setSelectedFile] = useState([]);
    const [loaded, setLoaded] = useState();

    const checkMimeType=(event)=>{
      //getting file object
      let files = event.target.files 
      //define message container
      let err = []
      // list allow mime type
     const types = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/pdf'];
      // loop access array
      for(var x = 0; x<files.length; x++) {
       // compare file type find doesn't matach
           if (types.every(type => files[x].type !== type)) {
           // create error message and assign to container   
           err[x] = files[x].type+' is not a supported format (should be .doc/.docx/.pdf)\n';
         }
       };
       for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
           // discard selected file
          toast.error(err[z])
          event.target.value = null
      }
     return true;
    }
    const maxSelectFile=(event)=>{
      let files = event.target.files
          if (files.length > 1) { 
             const msg = 'Only 1 document can be uploaded by either an attendee or a workshop presenter'
             event.target.value = null
             toast.warn(msg)
             return false;
        }
      return true;
   }
   const checkFileSize=(event)=>{
    let files = event.target.files
    let size = 2000000 
    let err = []; 
    for(var x = 0; x<files.length; x++) {
    if (files[x].size > size) {
     err[x] = files[x].type+'is too large, please pick a smaller file\n';
   }
  };
  for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
    // discard selected file
   toast.error(err[z])
   event.target.value = null
  }
  return true;
  }
  const onChangeHandler=event=>{
    var files = event.target.files
    if(maxSelectFile(event) && checkMimeType(event) && checkFileSize(event)){ 
        setSelectedFile(files);
        setLoaded(0);
  }
  }
    const onClickHandler = () => {
      const data = new FormData() 
      for(var x = 0; x<selectedFile.length; x++) {
        data.append('file', selectedFile[x])
      }
      axios.post("http://localhost:5000/upload", data, { //connected with backend later
        onUploadProgress: ProgressEvent => {
            setLoaded(ProgressEvent.loaded / ProgressEvent.total*100);
        },
      })
        .then(res => { // then print response status
          toast.success('upload success')
        })
        .catch(err => { // then print response status
          toast.error('upload fail')
        })
      }
  
      return (
        <div class="container">
            <div class="row">
              <div class="offset-md-3 col-md-6">
                 <div class="form-group files">
                  <label>Upload Your File </label>
                  <input type="file" class="form-control" multiple onChange={onChangeHandler}/>
                </div>  
                <div class="form-group">
                <ToastContainer />
                <Progress max="100" color="success" value={setLoaded} >{Math.round(loaded,2) }%</Progress>
          
                </div> 
                
                <button type="button" class="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>
  
            </div>
        </div>
        </div>
      );
    
  }
  
  export default FileUpload;