"use client"
import React, { useState, useEffect } from "react";
 import Link from "next/link";
import Na from "../cf/na";
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

const ComplaintTracker = () => {
    const router = useRouter();
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([
      { sender: "bot", text: "Hello! मैं आपकी मदद के लिए हूँ।" },
    ]);
    const [input, setInput] = useState("");
      const [t, st] = useState(false);
  const [status, setStatus] = useState("In Progress");
  const [first, setFirst] = useState("");
  const [visible, setVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
   const [fi, set] = useState([]);
   const [f, mn] = useState(null);
const menu = [
  { icon: '🏠', label: 'Dashboard', href: '/' },
  { icon: '📊', label: 'Message', href: '/ana' },
  { icon: '📋', label: 'Complaint', href: '/compl' },
  { icon: '🔔', label: 'Report', href: '/rc' },
  { icon: '📈', label: 'Status', href: '/status' },
  // { icon: '💬', label: 'Messages', href: '/messages' },
  // { icon: '👷', label: 'Workers', href: '/workers' },
  { icon: '👤', label: 'Profile', href: '/profile' },
];
  const fetchUsers = async () => {
    if (session?.user?.email) {
      const res = await fetch(`http://localhost:5000/users?email=${session?.user?.email}`);
      const data = await res.json();
      setUsers(data);
      set(data);
      if (data.length !== 0) {
        setStatus(data[0].status);
      }
    }
  };

   const toggleChat = () => setChatOpen(!chatOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `आपने कहा: ${input}` },
      ]);
    }, 500);

    setInput("");
  };

  // const getCategoryIcon = (category) => {
  //   switch (category) {
  //     case "Sanitation":
  //       return "🧹";
  //     case "Electricity":
  //       return "💡";
  //     case "Water Supply":
  //       return "💧";
  //     case "Road Maintenance":
  //       return "🛣️";
  //     case "Traffic":
  //       return "🚦";
  //     default:
  //       return "📋";
  //   }
  // };

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
   const index = fi.findIndex(item => item._id == filteredComplaints[i]?._id && item.name==filteredComplaints[i]?.name && item.branch==filteredComplaints[i]?.branch && item.userEmail == filteredComplaints[i]?.userEmail && item.complaint==filteredComplaints[i]?.complaint &&  item.location == filteredComplaints[i]?.location);
    router.push(`/compl?data=${encodeURIComponent(index)}`);  
  }
  const copy=(p)=>{
    navigator.clipboard.writeText(p)
 alert("copied")
  }
  const sh = (e,i)=>{
    mn(i);
    st(true);
  }
  return (
    <div className="pad"> 
 <div className="premium-main-content">
                {/* Premium Sidebar */}
                <div className="premium-sidebar">
                    <div className="sidebar-header">
                        <h3>Navigation Menu</h3>
                        <div className="sidebar-glow"></div>
                    </div>
                    
                      <nav className="sidebar-nav">
                     

  {menu.map((item, index) => (
    <Link key={index} href={item.href} className="sidebar-link">
      <span className="link-icon">{item.icon}</span>
      <span className="link-text">{item.label}</span>
      <div className="link-glow"></div>
    </Link>
  ))}
</nav>

                    
                  {session && <div className="sidebar-footer">
                                        <Button  onClick={() => signOut({ callbackUrl: "/" })} className="premium-signout-sidebar">🚪 Sign Out</Button>
                                        </div>}
                 {!session && <div className="sidebar-footer">
                                      <Link href="/login/" >  <Button className="premium-signout-sidebar">🚪 SignIn</Button></Link> 
                                        </div>}
                 
                </div>
</div>


      <div className="tracker-container">

        <header className="tracker-header">
          <div className="header-glow"></div>
          <h1 className="glowing-text">Civic Problem Tracker</h1>
          <p className="shiny-text">
            Track the status of your complaints in real-time
          </p>
        </header>

        {/* Search + Filter */}
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

        {/* Stats */}
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
        {/* Complaints List */}
        
      <div  className="complaints-list">
           {filteredComplaints.length === 0 ? (
            <div className="no-complaints neon-card">
              <div className="no-data-icon">🔍</div>
              <p>No complaints found matching your criteria.</p>
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
                    {/* <span>{complaint.status}</span> */}
                    {/* {complaint.complaint} */}
                   </div>
                  <div className="header-right">
                    <div
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(complaint.status),
                      }}
                    >
                      {getStatusText(complaint.status)}
  {/* <img style={{width:'250px',height:'200px'}} src={`data:image/jpeg;base64,${complaint?.image}`}    alt="" />      */}
              </div>
            {complaint.status==="Pending" && <div onClick={(e)=>sen(e,i)} className="bt"  style={{padding:'5px',width:"70px"}}>Edit</div>}
                    </div> 
                </div>
 
                <h3 className="complaint-title">{complaint.des}</h3>
                <p className="complaint-description">{complaint.des}</p>

                <div className="complaint-meta">
                  <div className="meta-item">
                    {/* <span className="meta-label">Complaint ID:</span>
                    <span className="meta-value shiny-text">
                      {complaint.id}
                    </span> */}
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
  {t&& <div className='im'><div className='v' onClick={()=>st(!t)}>X</div> <div><img className='ih' src={`data:image/jpeg;base64,${filteredComplaints[f]?.image}`}   alt="" /></div></div>}




 <button className="chat-button" onClick={toggleChat}>
        💬 Chat
      </button>

      {/* Chatbot Container */}
      <div className={`chat-container ${chatOpen ? "open" : ""}`}>
        <div className="chat-header">
          ChatBot
          <span className="close-btn" onClick={toggleChat}>
            ✖
          </span>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>



        </div>
 


        <footer className="tracker-footer">
          <p>© 2023 Civic Solutions - Making Cities Better</p>
        </footer>
      </div>
      </div>
   );
};

export default ComplaintTracker;
