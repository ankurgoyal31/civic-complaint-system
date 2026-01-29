// App.js
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// import './App.css';
// import { Style } from '@mui/icons-material';
// import { FormData } from 'node-fetch';
 const App = () => {
    const { data: session } = useSession();
  const [form, setFormData] = useState({
    id: '',
    name: '',
    complaint:'',
 branch:''
  });
      const [scrolled, setScrolled] = useState(false);
  
const menu = [
  { icon: '🏠', label: 'Dashboard', href: '/' },
  { icon: '📊', label: 'Message', href: '/ana' },
  { icon: '📋', label: 'Complaint', href: '/compl' },
  { icon: '🔔', label: 'Report', href: '/rc' },
  { icon: '📈', label: 'Status', href: '/status' },
//   { icon: '💬', label: 'Messages', href: '/messages' },
//   { icon: '👷', label: 'Workers', href: '/workers' },
  { icon: '👤', label: 'Profile', href: '/profile' },
];
  const handleChange = (e) => {
     const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
const save = async()=>{
    console.log("fuck->",form)
   const formData = new FormData();
  formData.append("name",form.name);
    formData.append("id",form.id);
  formData.append("issue",form.complaint);
  formData.append("email",session?.user?.email);
    formData.append("userName",session?.user?.name);
    formData.append("branch",form.branch);
  formData.append("img",session?.user?.image);
  let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/create`,{
    method:"POST",
    body:formData
  })
}
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', form);
    alert(`Complaint submitted successfully!\n\nID: ${form.id}\nName: ${form.name}\nComplaint: ${form.complaint}`);
    
    // Reset form
    setFormData({
      id:'',
      name:'',
      complaint:'',
      branch:''
    });
  };

  return (
    <div className="app">



 <Navbar className={`premium-navbar ${scrolled ? "scrolled" : ""}`} fixed="top" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#" className="premium-brand">
                        <div className="brand-glow"></div>
                        {/* 🚀 Civic Solutions */}
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" className="premium-toggle" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 premium-nav-links" navbarScroll>
                            {/* <Nav.Link href="#home" className="nav-link-glow">Dashboard</Nav.Link>
                            <Nav.Link href="#features" className="nav-link-glow">Analytics</Nav.Link>
                            <NavDropdown title="Reports" id="navbarScrollingDropdown" className="premium-dropdown">
                                <NavDropdown.Item href="#action3">Status Reports</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Progress Reports</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Export Data</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>

                        {/* <Form className="d-flex premium-search"> */}
                            <div className="search-container">
                                {/* <Form.Control
                                    type="search"
                                    placeholder="Search complaints..."
                                    className="premium-search-input"
                                    aria-label="Search"
                                /> */}
                                 {session?.user?.email}
                                <span><img src={session?.user?.image} alt="" className='table-avatar' /></span>

                             </div>
                           
                            {/* {!session && <Link href="/login/" className='w5'><div className='w5 premium-signout-btn'  style={{color:'black'}}>SignIn</div></Link>} */}
                        {/* {session && <Button onClick={()=>signOut()} className="premium-signout-btn">Sign Out</Button>} */}

                        {/* </Form> */}
 
                    </Navbar.Collapse>
                </Container>
            </Navbar>




<div style={{marginTop:'100'}}  className="premium-main-content">
                {/* Premium Sidebar */}
                <div  className="premium-sidebar">
                    <div  className="sidebar-header">
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
                        <Button  onClick={() => signOut({ callbackUrl: "/" })}className="premium-signout-sidebar">🚪 Sign Out</Button>
                        </div>}
 {!session && <div className="sidebar-footer">
                      <Link href="/login/" >  <Button className="premium-signout-sidebar">🚪 SignIn</Button></Link> 
                        </div>}
 
 </div>
                </div>



      <div className="container">
        <div className="left-panel">
          <div className="logo">
            <i className="fas fa-shield-alt"></i>
            <h1>ComplaintPro</h1>
          </div>
          <div className="welcome-text">
            <h2>Submit Your Complaint</h2>
            <p>Our secure platform ensures your concerns are addressed promptly and professionally. Submit your complaint and track its progress in real-time.</p>
          </div>
          <div className="features">
            <div className="feature">
              <i className="fas fa-check"></i>
              <span>Secure & Confidential</span>
            </div>
            <div className="feature">
              <i className="fas fa-check"></i>
              <span>24/7 Support</span>
            </div>
            <div className="feature">
              <i className="fas fa-check"></i>
              <span>Real-time Tracking</span>
            </div>
            <div className="feature">
              <i className="fas fa-check"></i>
              <span>Professional Resolution</span>
            </div>
          </div>
        </div>
        
        <div className="right-panel">
          <div className="login-form">
            <div className="form-header">
              <h2>Submit a Complaint</h2>
              <p>Please provide your details and describe your concern</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="id"
                  placeholder="Complaint ID"
                  value={form.id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <i className="fas fa-id-card"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
                <div className="form-group">
                <i className="fas fa-id-card"></i>
                <input
                  type="text"
                  name="branch"
                  placeholder="Branch"
                  value={form.branch}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <i className="fas fa-comment-alt"></i>
                <textarea
                  name="complaint"
                  placeholder="Issue"
                  value={form.complaint}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button onClick={save} type="submit" className="submit-btn">
                Submit Complaint
              </button>
            </form>
            <div className="footer-links">
              <a href="#"><i className="fas fa-question-circle"></i> Need Help?</a>
              <a href="#"><i className="fas fa-lock"></i> Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>
  {`      /* App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app {
  background: linear-gradient(135deg, #2e559aff 0%, #68687bff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  
}
 
.container {
  display: flex;
  max-width: 1000px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.left-panel {
  flex: 1;
  background: linear-gradient(135deg, #2575fc 0%, #3d41c2ff 100%);
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-panel {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.logo i {
  font-size: 28px;
  margin-right: 10px;
}

.logo h1 {
  font-size: 24px;
  font-weight: 600;
}

.welcome-text h2 {
  font-size: 32px;
  margin-bottom: 15px;
}

.welcome-text p {
  line-height: 1.6;
  opacity: 0.9;
}
  
.features {
  margin-top: 30px;
}

.feature {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.feature i {
  margin-right: 10px;
  color: #6a11cb;
  background: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.login-form {
  width: 100%;
}

.form-header {
  margin-bottom: 30px;
}

.form-header h2 {
  color: #2575fc;
  font-size: 28px;
  margin-bottom: 10px;
}

.form-header p {
  color: #666;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-group i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #6a11cb;
}

input, textarea {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

input:focus, textarea:focus {
  border-color: #6a11cb;
  outline: none;
  box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.1);
}
.table-avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    border: 2px solid #00e5ff;
                }
.submit-btn {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  margin-top: 10px;
}
                .search-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    background: rgba(214, 102, 229, 0.1);
                                        padding: 10px 20px !important;
                        border-radius: 205px;
                 }
                        .search-container:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
                }
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(106, 17, 203, 0.4);
}

.footer-links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 14px;
}

.footer-links a {
  color: #6a11cb;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #2575fc;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .left-panel {
    padding: 30px;
  }
  
  .right-panel {
    padding: 30px;
  }
}
  `}
      </style>
    </div>
    
  );
};

export default App;