"use client"
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
export default function CivicMessageSystem() {
    const{data:session} = useSession();
//   const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [conversations, setConversations] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
const [first, setfirst] = useState([])
const [fir, set] = useState([])
const [openSidebar, setOpenSidebar] = useState(false);

  // Fetch data
  const fetchUsers = async () => {
    try {
      const [admRes, useRes,am] = await Promise.all([
        fetch(`${process.env.BACKEND}/adm`),
        fetch(`${process.env.BACKEND}/use`),
        fetch(`${process.env.BACKEND}/am`),
      ]);
      
      const admData = await admRes.json();
      const useData = await useRes.json();
        const userd = await am.json();
setfirst(userd);
      setUsers(admData);
      setNotifications(useData);
      
      // Convert notifications to message format
      const formattedMessages = useData.map((item, index) => ({
        id: item.id || index,
        sender: item.name,
        content: `New complaint submitted - ${item.issue?.join(', ') || 'No details'}`,
        timestamp: new Date(item.uploadedAt || Date.now()).toLocaleTimeString(),
        unread: true,
        avatar: item.img || '👤',
        category: 'complaint',
        threadId: `complaint-${item.id || index}`,
        originalData: item, // Store original data for details
        uploadedAt:item.uploadedAt,
      }));
      
      setMessages(formattedMessages);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
  }
const menu = [
  { icon: '🏠', label: 'Dashboard', href: '/admin' },
  { icon: '📊', label: 'Analytics', href: '/' },
  { icon: '📋', label: 'All Complaints', href: '/adcom' },
  { icon: '🔔', label: 'Report', href: '/report' },
  // { icon: '📈', label: 'Status', href: '/status' },
  { icon: '💬', label: 'Notification', href: '/notia' },
//   { icon: '👷', label: 'Workers', href: '/workers' },
  { icon: '👤', label: 'Profile', href: '/adp' },
];
  const markAsRead = (threadId) => {
    setMessages(messages.map(msg => 
      msg.threadId === threadId ? { ...msg, unread: false } : msg
    ));
    const unread = messages.filter(msg => msg.unread && msg.threadId !== threadId).length;
    setUnreadCount(unread);
  };

  const handleMessageClick = (message,i) => {
    if(first){
 console.log(i,first)
    set(first[i])
    }
     setSelectedMessage(message);
    markAsRead(message.threadId);
    setReplyText('');
  };
    console.log('first ',first)

  const handleBackToList = () => {
    setSelectedMessage(null);
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedMessage) return;
  
    const newReply = {
      id: Date.now(),
      sender: 'You',
      content: replyText,
      timestamp: 'Just now',
      unread: false,
      avatar: '👤',
      category: 'reply',
      threadId: selectedMessage.threadId,
      isReply: true
    };

    setConversations(prev => ({
      ...prev,
      [selectedMessage.threadId]: [
        ...(prev[selectedMessage.threadId] || [selectedMessage]), 
        newReply
      ]
    }));

const formData = new FormData();
console.log(selectedMessage.id)
   formData.append("userEmail", session.user.email);
  formData.append("userName", session.user.name);
   formData.append("_id",selectedMessage.id);
  formData.append("noti",replyText);

   const res = await fetch(`${process.env.BACKEND}/load`, {
    method: "POST",
    body: formData
  });

  const form = new FormData();
console.log(selectedMessage.id)
   form.append("userEmail", session.user.email);
  form.append("userName", session.user.name);
   form.append("id",selectedMessage.id);
  form.append("resp",replyText);
  form.append("branch","sarmathura");
  const re = await fetch(`${process.env.BACKEND}/admin`, {
    method: "POST",
    body: form
  });
    setReplyText('');
  };

  const getCategoryColor = (category) => {
    const colors = {
      road: '#FF6B6B',
      water: '#4ECDC4',
      garbage: '#FFD166',
      electricity: '#118AB2',
      sewage: '#06D6A0',
      lights: '#6A0572',
      park: '#2EC4B6',
      traffic: '#FF9F1C',
      complaint: '#667eea',
      reply: '#25D366'
    };
    return colors[category] || '#6C757D';
  };

  const getCurrentThreadMessages = () => {
    if (!selectedMessage) return [];
    const threadMessages = conversations[selectedMessage.threadId] || [selectedMessage];
    return threadMessages;
  };
console.log(messages)
  return (
    <div className="container-fluid p-0 m-0" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Navbar */}
      <Navbar className={scrolled ? "scrolled" : "navbar"} fixed="top" expand="lg">
         
        <Container fluid>
          <Navbar.Brand href="#" className="brand-animate">
            🚀 Civic Dashboard
            <Button
  className="ms-2"
  variant="outline-light"
  onClick={() => setOpenSidebar(!openSidebar)} style={{backgroundColor:"blue"}}
>
  ☰ 
</Button>

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 nav-links" navbarScroll>
              {/* <Nav.Link href="#home" className="nav-animate">Home</Nav.Link>
              <Nav.Link href="#features" className="nav-animate">Features</Nav.Link>
              <NavDropdown title="More" id="navbarScrollingDropdown" className="nav-animate">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Form className="d-flex search-animate">
              <Form.Control
                type="search"
                placeholder="Search...,Name,Branch,location,complaint,status"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={handleSearch}
              />
              <Button className='bt2 me-2' variant="outline-light">🔍</Button>
              <Button className='bt1'>Sign Out</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>


{openSidebar && <div style={{marginTop:100}} className="premium-sidebar">
                    <div className="sidebar-header">
                        <h3>Navigation Menu</h3>
                        <div className="sidebar-glow"></div>
                    </div>
                    
                       <nav className="sidebar-nav">
                     

  { menu.map((item, index) => (
    <Link key={index} href={item.href} className="sidebar-link">
      <span className="link-icon">{item.icon}</span>
      <span className="link-text">{item.label}</span>
      <div className="link-glow"></div>
    </Link>
  ))}
</nav>

                    
                    <div className="sidebar-footer">
                        <Button className="premium-signout-sidebar">🚪 Sign Out</Button>
                    </div>
                </div>}



      {/* Main Content - WhatsApp Style Layout */}
      <div className="d-flex" style={{ height: '100vh', paddingTop: '76px' }}>
        
        {/* Left Sidebar - Contacts List */}
        <div className="col-md-4 col-lg-3 border-end bg-light d-flex flex-column" style={{ height: '100%' }}>
          <div className="p-3 border-bottom bg-white">
            <h4 style={{color:'black'}} className="mb-0">Complaints</h4>
            <small   className="text-muted">{messages.length} conversations</small>
              

          </div>
               
          <div className="flex-grow-1 overflow-auto">
            {messages.map((message,i) => (
              <div 
                key={message.id}
                className={`p-3 border-bottom d-flex align-items-center cursor-pointer ${
                  selectedMessage?.id === message.id ? 'bg-primary text-white' : 'bg-white'
                }`}
                onClick={() => handleMessageClick(message,i)}
                style={{ cursor: 'pointer', transition: 'all 0.3s' }}
              >
                <div style={{padding:'10px'}}>
             <img style={{width:'50px',height:'50px',borderRadius:'50%'}} src={message.avatar} alt="" />
                 </div>
                
                <div className="flex-grow-1">
 
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className={`mb-0 ${selectedMessage?.id === message.id ? 'text-white' : 'text-dark'}`}>
                      {message.sender}
                    </h5>
                    <small className={selectedMessage?.id === message.id ? 'text-white-50' : 'text-muted'}>
                      {message.timestamp}
                    </small>
                  </div>
                  <p className={`mb-0 small ${selectedMessage?.id === message.id ? 'text-white-50' : 'text-muted'}`}>
                    {message.content.length > 40 ? message.content.substring(0, 40) + '...' : message.content}
                  </p>
                </div>
                
                {message.unread && (
                  <div className="ms-2">
                    <span className="badge bg-danger rounded-circle">•</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="col-md-8 col-lg-9 d-flex flex-column" style={{ height: '100%' }}>
           
          {selectedMessage ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-bottom bg-white d-flex align-items-center">
                {isMobile && (
                  <button 
                    className="btn btn-light me-3"
                    onClick={handleBackToList}
                  >
                    ←
                  </button>
                )}
                 
                <div>
                     <div style={{display:'flex',gap:'20px'}}> 
                <img style={{width:'50px',height:'50px',marginTop:'-6px',borderRadius:'50%'}} src={selectedMessage.avatar} alt="" />
                   <span> <h6 style={{color:'black',fontSize:'25px'}} className="mb-0">{selectedMessage.sender}</h6></span> 
                   </div>
                  <small style={{color:'black',fontSize:'20px'}} className="text-muted">Complaint ID: {selectedMessage.id}</small>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                className="flex-grow-1 p-3 overflow-auto"
                style={{ 
                  backgroundColor: '#f5f4f2ff',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}
              >
                {selectedMessage.originalData?.issue && (
                  <div  className="d-flex justify-content-start mb-3">
                    <div   className="d-flex align-items-end">
                      
                      <div className="rounded p-3" style={{color:'black',padding:'10px',fontSize:'25px'   }}>
                         {selectedMessage.originalData.issue.map((issue, index) => (
                            <> 
                            <div style={{borderRadius:'10px',marginTop:'30px',backgroundColor:'white',padding:'5px',width:'450px'}}> 
                          <p   key={index} className="mb-1 small"> {issue}</p>

 <span style={{fontSize:'15px'}}> 
  {new Date(selectedMessage?.uploadedAt).toLocaleString("en-IN")}
</span>
 
                          </div>

</>
  ))}
                       </div>
                    </div>
                  </div>
                )}
                <div>
                     {fir?.resp?.map((item, i) => (
  <p style={{display:'flex',justifySelf:'end',marginRight:'30px',padding:'8px',maxWidth:'700px', fontSize: '25px',borderRadius:'5px', backgroundColor:'rgb(122, 122, 185)'}} key={i}>{item}</p>
))}

</div>
                {/* Reply Messages */}
                {getCurrentThreadMessages()
                  .filter(msg => msg.isReply)
                  .map(message => (
                    <div 
                      key={message.id} 
                      className={`d-flex mb-3 ${message.sender === 'You' ? 'justify-content-end' : 'justify-content-start'}`}
                    >

                      <div className={`d-flex align-items-end ${message.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                        <div 
                          className={`rounded-circle d-flex align-items-center justify-content-center ${message.sender === 'You' ? 'ms-2' : 'me-2'}`}
                          style={{
                            width: '5', 
                            height: '25px', 
                            fontSize: '25px',
                            flexShrink: 0,
                           }}
                        >
                        </div>
                        <div 
                        //   className={`rounded p-3 ${message.sender === 'You' ? 'bg-primary text-white' : 'bg-white'}`}
                          style={{padding:'8px',maxWidth:'700px', fontSize: '25px',borderRadius:'5px', backgroundColor:'rgb(122, 122, 185)'}}
                        >
                         
                            <div> 
                            <div> 
                              <p className="mb-1">{message.content}</p>
                          <small className={message.sender === 'You' ? 'text-white-50' : 'text-muted'}>
                            {message.timestamp}
                          </small>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Reply Input */}
              <div className="p-3 border-top bg-white">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                  />
                  <button 
                    className="btn btn-primary"
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Selection State */
            <div className="d-flex align-items-center justify-content-center flex-grow-1 bg-light">
              <div className="text-center">
                <div className="display-1 text-muted mb-3">💬</div>
                <h3 className="text-muted">Select a conversation</h3>
                <p className="text-muted">Choose a complaint from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .container-fluid {
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
        
        .bg-light {
          background-color: #f9fafaff !important;
        }
        
        .bg-white{
          background-color: #f6f1f1ff !important;
        }
        .border-end {
          border-right: 1px solid #dee2e6 !important;
        }
        .ms-2{
                 background-color: #be7777ff !important;
 
        }
        .overflow-auto {
          overflow: auto;
        }
        
        .flex-grow-1 {
          flex-grow: 1;
        }
        .premium-sidebar{
padding:70px
font-size:60px;
margin-top:100px;
width:300px;
right:10px
}
`}</style>
    </div>
  );
}