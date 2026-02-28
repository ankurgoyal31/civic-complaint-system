"use client"
import React, { useState,useEffect,useLayoutEffect } from "react";
 import Link from "next/link";
 import { Card, Button, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import Srtr from "../sidev/srtr";
 const ComplaintTracker = () => {
    const router = useRouter();
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
       const [t, st] = useState(false);
  const [status, setStatus] = useState("In Progress");
  const [first, setFirst] = useState("");
  const [visible, setVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
   const [fi, set] = useState([]);
   const [f, mn] = useState(null);
   const[l,sl] = useState("");
   const[image,set_image]  = useState([])
  const fetchUsers = async () => {
    sl("loading your Content...")
    if (session?.user?.email) {
      try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users?email=${session?.user?.email}`);
      const data = await res.json();
      setUsers(data);
      set(data);
      if(data.length==0){
      sl("No complaints found matching your criteria.");
      }
      if (data.length !== 0) {
        setStatus(data[0].status);
        sl("");
      }
    }
    catch(err){
    sl("please check your network connnection....")
    }
    }
  };

   const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ff6b35";
      case "In Progress":
        return "#00e5ff";
      case "Resolved":
        return "#00ff8c";
      default:
        return "#757575";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return "Pending";
      case "In Progress":
        return "In Progress";
      case "Resolved":
        return "Resolved";
      default:
        return "Unknown";
    }
  };

     const filteredComplaints = users.filter((complaint) => {
    const matchesFilter = filter === "all" || complaint.status === filter;
    const matchesSearch =
      complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.branch.toLowerCase().includes(searchTerm.toLowerCase())||complaint.complaint.toLowerCase().includes(searchTerm.toLowerCase())||
      complaint.userName.toLowerCase().includes(searchTerm.toLowerCase())||complaint.des.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch;
  });
 let id = filteredComplaints.map((item)=>item._id)
let filter_image = image.filter((item)=>id.includes(item._id))

    
    useEffect(() => {
    fetchUsers();
  }, [session]);

  const se = (e, i) => {
    setStatus(users[i].status);
    if (users[i].status === "Resolved") {
      setFirst(new Date(users[i].uploadedAt).toLocaleString());
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const ch = () => {
    setVisible(!visible);
  };
  const sen =(e,i)=>{
    console.log(i)
     router.push(`/compl?data=${encodeURIComponent(i)}`);  
  }
  const copy=(p)=>{
    navigator.clipboard.writeText(p)
 alert("copied")
  }
  const sh = (e,i)=>{
    mn(i);
    st(true);
  }
  useEffect(() => {
    if(!filteredComplaints.length || !image.length) return
let id = filteredComplaints.map((item)=>item._id);
      let filter_image = image.filter((item)=>id.includes(item._id))
      console.log("filter iamge ->",filter_image)
      set_image(filter_image);
 },[])
  
   useEffect(() => {
         async function get() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/get_data?email=${session?.user?.email}`);
      let data = await res.json();
      console.log("layout",data,filteredComplaints)
       
      set_image(data)
          }
          get()
        },[session?.user?.email])
        // console.log("all",image)
  return (
    <> 
    <div className="display"> 
    <div >
     </div>
    <div className="pad"> 
      <Srtr/>

      <div className="tracker-container">

        <header className="tracker-header">
          <div className="header-glow"></div>
          <h1 className="glowing-text">Civic Problem Tracker</h1>
          <p className="shiny-text">
            Track the status of your complaints in real-time
          </p>
        </header>

         <div className="tracker-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glowing-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Complaints
            </button>
            <button
              className={`filter-btn ${
                filter === "pending" ? "active" : ""
              }`}
              onClick={() => setFilter("Pending")}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${
                filter === "in-progress" ? "active" : ""
              }`}
              onClick={() => setFilter("In Progress")}
            >
              In Progress
            </button>
            <button
              className={`filter-btn ${
                filter === "resolved" ? "active" : ""
              }`}
              onClick={() => setFilter("Resolved")}
            >
              Resolved
            </button>
          </div>
        </div>

         <div className="stats-overview">
          <div className="stat-card neon-card">
            <div className="stat-icon">📊</div>
            <h3>Total Complaints</h3>
            <span className="stat-number">{users.length}</span>
          </div>
          <div className="stat-card neon-card">
            <div className="stat-icon">⏳</div>
            <h3>Pending</h3>
            <span className="stat-number" style={{ color: "#ff6b35" }}>
              {users?.filter((c) => c.status === "Pending").length}
            </span>
          </div>
          <div className="stat-card neon-card">
            <div className="stat-icon">🔄</div>
            <h3>In Progress</h3>
            <span className="stat-number" style={{ color: "#00e5ff" }}>
              {users?.filter((c) => c.status === "In Progress").length}
            </span>
          </div>
          <div className="stat-card neon-card">
            <div className="stat-icon">✅</div>
            <h3>Resolved</h3>
            <span className="stat-number" style={{ color: "#00ff8c" }}>
              {users?.filter((c) => c.status === "Resolved").length}
            </span>
          </div>
        </div>
         
      <div  className="complaints-list">
           { l!== "" ? (
               <div className="no-complaints neon-card">
              <div className="no-data-icon">🔍</div>
              <p>{l}</p>
            </div>
          ) : (
            filteredComplaints.map((complaint, i) => (
              <div style={{backgroundColor:'black', boxShadow:'2px 2px 15px'}}  key={i} className="complaint-card neon-card">
                <div className="card-glow"></div>

                <div className="complaint-header">
                  <div className="category-badge">
                    <span   className="category-icon">
                      {complaint.complaint}
                    </span>
                                 </div>
                  <div className="header-right">
                    <div
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(complaint.status),
                      }}
                    >
                      {getStatusText(complaint.status)}
               </div>
            {complaint.status==="Pending" && <div onClick={(e)=>sen(e,complaint._id)} className="bt"  style={{padding:'5px',width:"70px"}}>Edit</div>}
                    </div> 
                </div>
 
                <h3 className="complaint-title">{complaint.des}</h3>
                <p className="complaint-description">{complaint.des}</p>

                <div className="complaint-meta">
                  <div className="meta-item">
                  </div>
                   <div className="meta-item">
                    <span>ID</span>
                     <span className="meta-value">{complaint._id}</span>
                    <span className="copy" onClick={()=>copy(complaint._id)}>COPY ID</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Date:</span>
                    <span  className="meta-value">{new Date(complaint.uploadedAt).toLocaleString()}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Location:</span>
                    <span className="meta-value">
                      <span className="location-icon">📍</span>
                      {complaint.location}
                    </span>
                  </div>
                </div>
                <div className="updates-section">
                  <h4 className="shiny-text">Updates & Progress</h4>
                  <div className="updates-timeline">
                    {complaint.updates?.map((update, index) => (
                      <div key={index} className="update-item">
                        <div className="update-date">{update.date}</div>
                        <div className="update-message">{update.message}</div>
                      </div>
                    ))}
                  </div>
                </div>
            <div  onClick={(e)=>sh(e,i)} className="bt5">show image</div>

              </div>
            ))
          )}
  {t&& <div className='im'><div className='v' onClick={()=>st(!t)}>X</div> <div><img className='ih' src={`data:image/jpeg;base64,${filter_image[f]?.image}`}   alt="" /></div></div>}
        </div>
        <footer className="tracker-footer">
          <p>© 2023 Civic Solutions - Making Cities Better</p>
        </footer>
      </div>
      </div>
      </div>
      </>
   );
};

export default ComplaintTracker;
