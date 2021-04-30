import React, { useState } from "react";
import "./Dashboard.css"

import Main from "../../Components/main/Main";
import Sidebar from "../../Components/sidebar/Sidebar"




const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="container">
      <Main />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
    </div>
  );
};

export default Dashboard;