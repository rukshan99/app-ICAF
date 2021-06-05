import React, { useState } from 'react';
import Sidebar from '../../Components/sidebar/Sidebar';
import Main from '../../Components/main/Main';
import './Dashboard.css';

const Dasboard = () => {


const [sidebarOpen, setSidebarOpen] = useState(false);


const openSidebar = () => {
    setSidebarOpen(true);
  };
  
const closeSidebar = () => {
    setSidebarOpen(false);
  };



  return(
      <div className='container'>
          <Main />
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    
  )

}

export default Dasboard;
