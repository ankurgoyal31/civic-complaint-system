// 'use client'
// import { Items } from 'openai/resources/conversations/items';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { AreaChart, LineChart, Line, Area, Cell, Legend } from "recharts";
// import Table from 'react-bootstrap/Table';
// import _ from 'lodash';
// import React from 'react'
// import Image from "next/image";
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Container from 'react-bootstrap/Container';
// import { useEffect, useState } from 'react';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import { Button, Row, Col } from 'react-bootstrap';
// import { useRouter } from 'next/navigation';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import Link from 'next/link';
// const Page = () => {
//         const { data: session } = useSession();
//      const router = useRouter();
//     const [scrolled, setScrolled] = useState(false);
//     const [show, setShow] = useState(false);
//     const [uss, sets] = useState([]);
//     const [n, k] = useState([]);
//     const [u, set] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [v, st] = useState([]);
//     const [maxUser, setMaxUser] = useState();
//     const [l, s] = useState([]);
//     const [open, setOpen] = useState(false);
//  const menu = [
//   { icon: '🏠', label: 'Dashboard', href: '/admin' },
//   { icon: '📊', label: 'Analytics', href: '/' },
//   { icon: '📋', label: 'All Complaints', href: '/adcom' },
//   { icon: '🔔', label: 'Report', href: '/report' },
//   // { icon: '📈', label: 'Status', href: '/status' },
//   { icon: '💬', label: 'Notification', href: '/notia' },
// //   { icon: '👷', label: 'Workers', href: '/workers' },
//   { icon: '👤', label: 'Profile', href: '/adp' },
// ];
//     const fetchUsers = async () => {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/adm`);
//         const data = await res.json();
//         setUsers(data)
//         const re = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/use`);
//         const dat = await re.json();
//         k(dat)
//         console.log(dat);
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 0);
//         };
//         window.addEventListener("scroll", handleScroll);
//     }, []);

//     const notifications = [
//         {
//             id: 1,
//             image: "https://randomuser.me/api/portraits/men/32.jpg",
//             title: "Complaint Update",
//             message: "Your complaint regarding road issue has been resolved.",
//             time: "2 hours ago",
//         },
//         {
//             id: 2,
//             image: "https://randomuser.me/api/portraits/women/65.jpg",
//             title: "New Message",
//             message: "Admin sent you a new message regarding your complaint.",
//             time: "5 hours ago",
//         },
//     ];

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     useEffect(() => {
//         console.log(users)
//         let ft = {};
//         let y = users.reduce((acc, items) => {
//             ft[items.status] = (ft[items.status] || 0) + 1;
//             return acc;
//         }, {})
//         const formattedData = Object.keys(ft).map(key => ({
//             name: key,
//             status: ft[key]
//         }));
//         sets(formattedData)
//         console.log(ft)

//         let f = {};
//         let d = users.reduce((acc, items) => {
//             f[items.branch] = (f[items.branch] || 0) + 1;
//             return acc;
//         }, {})
//         const formattedDa = Object.keys(f).map(key => ({
//             name: key,
//             complaint: f[key]
//         }));
//         set(formattedDa)
//         console.log('fuck ', formattedDa)
//         const solved = users.filter(user =>
//             user.status == 'Resolved'
//         );
//         st(solved);
//         let v = {};
//         let m = users.reduce((acc, items) => {
//             v[items.name] = (v[items.name] || 0) + 1;
//             return acc;
//         }, {})
//         const formattedD = Object.keys(v).map(key => ({
//             Name: key,
//             value: v[key]
//         }));
//         console.log("v->", formattedD)
//         s(formattedD)

//         // Step 1: group by email
//         const grouped = _.groupBy(users, "userEmail");

//         // Step 2: map karo ek hi person + count
//         const result = Object.keys(grouped).map((email) => ({
//             email: email,
//             count: grouped[email].length,
//             person: grouped[email][0]  // sirf ek object le liya
//         }));
//         console.log("ma", result);
//         //  console.log("max-> ",maxPerson)
//         const topUser = _.maxBy(result, "count");

//         setMaxUser(topUser);
//     }, [users])
//     const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
//     console.log("v", v)
//     console.log("max", maxUser)

//     const send =(e,i)=>{
//         router.push(`/response?data=${encodeURIComponent(i)}`);  
//     }
//     return (
//         <>
//             <style jsx global>{`
//                 :root {
//                     --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//                     --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
//                     --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
//                     --success-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
//                     --glass-bg: rgba(255, 255, 255, 0.1);
//                     --glass-border: rgba(255, 255, 255, 0.2);
//                     --shadow-glow: 0 0 20px rgba(102, 126, 234, 0.3);
//                 }

//                 * {
//                     margin: 0;
//                     padding: 0;
//                     box-sizing: border-box;
//                     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//                 }

//                 body {
//                     background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
//                     color: white;
//                     min-height: 100vh;
//                     overflow-x: hidden;
//                 }

//                 /* Animated Background */
//                 .animated-bg {
//                     position: fixed;
//                     top: 0;
//                     left: 0;
//                     width: 100%;
//                     height: 100%;
//                     z-index: -1;
//                     overflow: hidden;
//                 }

//                 .floating-shapes {
//                     position: absolute;
//                     width: 200px;
//                     height: 200px;
//                     border-radius: 50%;
//                     background: var(--primary-gradient);
//                     filter: blur(60px);
//                     opacity: 0.1;
//                     animation: float 6s ease-in-out infinite;
//                 }

//                 .shape-1 {
//                     top: 10%;
//                     left: 10%;
//                     animation-delay: 0s;
//                 }

//                 .shape-2 {
//                     top: 60%;
//                     right: 10%;
//                     animation-delay: 2s;
//                     background: var(--secondary-gradient);
//                 }

//                 .shape-3 {
//                     bottom: 20%;
//                     left: 20%;
//                     animation-delay: 4s;
//                     background: var(--accent-gradient);
//                 }

//                 @keyframes float {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50% { transform: translateY(-20px) rotate(180deg); }
//                 }

//                 /* Navbar Styles */
//                 .navbar {
//                     background: rgba(15, 23, 42, 0.8) !important;
//                     backdrop-filter: blur(20px);
//                     border-bottom: 1px solid var(--glass-border);
//                     padding: 1rem 0;
//                     transition: all 0.3s ease;
//                 }

//                 .navbar.scrolled {
//                     background: rgba(15, 23, 42, 0.95) !important;
//                     box-shadow: var(--shadow-glow);
//                 }

//                 .brand-animate {
//                     font-weight: 700;
//                     font-size: 1.5rem;
//                     background: var(--primary-gradient);
//                     -webkit-background-clip: text;
//                     -webkit-text-fill-color: transparent;
//                     animation: glow 2s ease-in-out infinite alternate;
//                 }

//                 .nav-links .nav-link {
//                     color: #cbd5e1 !important;
//                     font-weight: 500;
//                     margin: 0 0.5rem;
//                     padding: 0.5rem 1rem !important;
//                     border-radius: 10px;
//                     transition: all 0.3s ease;
//                     position: relative;
//                     overflow: hidden;
//                 }

//                 .nav-links .nav-link::before {
//                     content: '';
//                     position: absolute;
//                     top: 0;
//                     left: -100%;
//                     width: 100%;
//                     height: 100%;
//                     background: var(--primary-gradient);
//                     transition: left 0.3s ease;
//                     z-index: -1;
//                     border-radius: 10px;
//                 }

//                 .nav-links .nav-link:hover {
//                     color: white !important;
//                     transform: translateY(-2px);
//                 }

//                 .nav-links .nav-link:hover::before {
//                     left: 0;
//                 }

//                 .search-animate .form-control {
//                     background: rgba(255, 255, 255, 0.1);
//                     border: 1px solid var(--glass-border);
//                     color: white;
//                     border-radius: 25px;
//                     padding: 0.5rem 1rem;
//                     backdrop-filter: blur(10px);
//                 }

//                 .search-animate .form-control::placeholder {
//                     color: #94a3b8;
//                 }

//                 .bt1, .bt2 {
//                     border-radius: 25px !important;
//                     padding: 0.5rem 1.5rem !important;
//                     font-weight: 600 !important;
//                     transition: all 0.3s ease !important;
//                                         margin-left: 0.5rem !important;

//                  }

//                 .bt1 {
//                     background: var(--primary-gradient) !important;
//                     border: none !important;
//                 }

//                 .bt2 {
//                     border: 1px solid var(--glass-border) !important;
//                     background: transparent !important;
//                 }

//                 .bt1:hover, .bt2:hover {
//                     transform: translateY(-2px);
//                     box-shadow: var(--shadow-glow);
//                 }

//                 /* Cards Container */
//                 .cards-container {
//                     display: grid;
//                     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//                     gap: 2.5rem;
//                     padding: 2rem;
                     
//                 }

//                 .card {
//                     background: var(--glass-bg);
//                     backdrop-filter: blur(20px);
//                     border: 1px solid var(--glass-border);
//                     border-radius: 20px;
//                     padding: 2rem;
//                     text-align: center;
//                     transition: all 0.3s ease;
//                     position: relative;
//                     overflow: hidden;
//                  }

//                 .card::before {
//                     content: '';
//                     position: absolute;
//                     top: 0;
//                                         left: -100%;

//                      width: 100%;
//                     height: 100%;
//                     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
//                     transition: left 0.5s ease;
//                 }

//                 .card:hover::before {
//                     left: 100%;
//                 }

//                 .card:hover {
//                     transform: translateY(-10px);
//                     box-shadow: var(--shadow-glow);
//                 }

//                 .card h2 {
//                     font-size: 2.5rem;
//                     font-weight: 700;
//                     margin-bottom: 0.5rem;
//                     background: var(--primary-gradient);
//                     -webkit-background-clip: text;
//                     -webkit-text-fill-color: transparent;
//                 }

//                 .card p {
//                     color: #94a3b8;
//                     font-size: 1rem;
//                     font-weight: 500;
//                 }

//                 /* Dashboard Layout */
//                 .dashboard-content {
//                     display: grid;
//                     grid-template-columns: 1fr 400px;
//                     gap: 2rem;
//                     padding: 2rem;
//                     margin-top: 2rem;
//                 }

//                 .main-content {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 2rem;
//                  }

//                 .charts-grid {
//                     display: grid;
//                     grid-template-columns: 1fr 1fr;
//                     gap: 2rem;
//                     margin-bottom: 2rem;
//                 }

//                 .chart-container {
//                     background: var(--glass-bg);
//                     backdrop-filter: blur(20px);
//                     border: 1px solid var(--glass-border);
//                     border-radius: 20px;
//                     padding: 1.5rem;
//                     transition: all 0.3s ease;
//                 }

//                 .chart-container:hover {
//                     transform: translateY(-5px);
//                     box-shadow: var(--shadow-glow);
//                 }

//                 .chart-container h3 {
//                     color: white;
//                     margin-bottom: 1rem;
//                     font-size: 1.2rem;
//                     font-weight: 600;
//                     text-align: center;
//                 }

//                 /* Top User Card */
//                 .top-user-card {
//                     background: var(--glass-bg);
//                     backdrop-filter: blur(20px);
//                     border: 1px solid var(--glass-border);
//                     border-radius: 20px;
//                     padding: 2rem;
//                     text-align: center;
//                     transition: all 0.3s ease;
//                     margin-top: 2rem;
//                  }

//                 .top-user-card:hover {
//                     transform: translateY(-5px);
//                     box-shadow: var(--shadow-glow);
//                 }

//                 .trophy-circle {
//                     width: 100px;
//                     height: 100px;
//                     border-radius: 50%;
//                     background: var(--success-gradient);
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     margin: 0 auto 1rem;
//                     border: 4px solid rgba(255,255,255,0.2);
//                 }

//                 .trophy-img {
//                     width: 60px;
//                     height: 60px;
//                     border-radius: 50%;
//                     border: 3px solid white;
//                 }

//                 .user-name {
//                     font-size: 1.5rem;
//                     font-weight: 700;
//                     margin-bottom: 0.5rem;
//                     background: var(--success-gradient);
//                     -webkit-background-clip: text;
//                     -webkit-text-fill-color: transparent;
//                 }

//                 .activity {
//                     color: #94a3b8;
//                     font-size: 1rem;
//                 }

//                 /* Notification Container */
//                 .notification-container {
//                     background: var(--glass-bg);
//                     backdrop-filter: blur(20px);
//                     border: 1px solid var(--glass-border);
//                     border-radius: 20px;
//                     padding: 1.5rem;
//                     max-height: 700px;
//                     overflow-y: auto;
//                 }

//                 .notification-container::-webkit-scrollbar {
//                     width: 6px;
//                 }

//                 .notification-container::-webkit-scrollbar-track {
//                     background: rgba(255, 255, 255, 0.1);
//                     border-radius: 10px;
//                 }

//                 .notification-container::-webkit-scrollbar-thumb {
//                     background: rgba(255, 255, 255, 0.3);
//                     border-radius: 10px;
//                 }

//                 /* Table Styles */
//                 .ty5 {
//                     background: var(--glass-bg);
//                     backdrop-filter: blur(20px);
//                     border: 1px solid var(--glass-border);
//                     border-radius: 20px;
//                     padding: 2rem;
//                     margin: 2rem;
//                     overflow-x: auto;
//                 }

//                 .table {
//                     color: white !important;
//                     background: transparent !important;
//                  }

//                 .table th {
//                     background: var(--primary-gradient) !important;
//                     border: none !important;
//                     color: black !important;
//                     padding: 1rem !important;
//                     font-weight: 700;
//                                         font-size:23px

//                 }

//                 .table td {
//                     border-color: var(--glass-border) !important;
//                     padding: 1rem !important;
//                     color: #19191dff !important;
//                     font-size:23px
//                 }

//                 .table tbody tr:hover {
//                     background: rgba(255, 255, 255, 0.05) !important;
//                 }

//                 /* Alert Styles */
//                 .pro-alert {
//                     background: var(--secondary-gradient);
//                     backdrop-filter: blur(20px);
//                     border: 1px solid var(--glass-border);
//                     border-radius: 15px;
//                     padding: 1.5rem;
//                     margin: 2rem;
//                     display: flex;
//                     align-items: center;
//                     gap: 1rem;
//                     animation: pulse 2s infinite;
//                             background-color: #00e5ff;
// color:black;
// text-align:center;
// font-size:30px;
// font-weight:700px;
//                 }

//                 .pro-alert-icon {
//                     font-size: 2rem;
//                 }

//                 .pro-alert-text {
//                     flex: 1;
//                     color: white;
//                     font-weight: 500;
//                 }

//                 .pro-alert-text span {
//                     background: rgba(249, 9, 9, 0.2);
//                     padding: 0.25rem 0.5rem;
//                     border-radius: 8px;
//                     font-weight: 600;
//                 }

//                 @keyframes pulse {
//                     0%, 100% { transform: scale(1); }
//                     50% { transform: scale(1.02); }
//                 }

//                 @keyframes glow {
//                     from { text-shadow: 0 0 10px #667eea; }
//                     to { text-shadow: 0 0 20px #6f3da1ff; }
//                 }

//                 /* Responsive Design */
//                 @media (max-width: 1200px) {
//                     .dashboard-content {
//                         grid-template-columns: 1fr;
//                     }
                    
//                     .charts-grid {
//                         grid-template-columns: 1fr;
//                     }
//                 }

//                 @media (max-width: 768px) {
//                     .cards-container {
//                         grid-template-columns: 1fr;
//                         padding: 1rem;
//                     }
                    
//                     .dashboard-content {
//                         padding: 1rem;
//                     }
                    
//                     .ty5 {
//                         margin: 1rem;
//                         padding: 1rem;
//                     }
//                 }
//             `}</style>

//             {/* Animated Background */}
//             <div className="animated-bg">
//                 <div className="floating-shapes shape-1"></div>
//                 <div className="floating-shapes shape-2"></div>
//                 <div className="floating-shapes shape-3"></div>
//             </div>

//             <Navbar className={scrolled ? "scrolled" : "navbar"} fixed="top" expand="lg">
//                 <Container fluid>
//                     <Navbar.Brand href="#" className="brand-animate">
//                         🚀 Civic Dashboard
//                     </Navbar.Brand>

//                     <Navbar.Toggle aria-controls="navbarScroll" />
//                     <Navbar.Collapse id="navbarScroll">
//                         <Nav className="me-auto my-2 my-lg-0 nav-links" navbarScroll>
//                             <Nav.Link href="#home" className="nav-animate">Home</Nav.Link>
//                             <Nav.Link href="#features" className="nav-animate">Features</Nav.Link>
//                             <NavDropdown title="More" id="navbarScrollingDropdown" className="nav-animate">
//                                 <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                                 <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
//                                 <NavDropdown.Divider />
//                                 <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
//                             </NavDropdown>
//                         </Nav>

//                         <Form className="d-flex search-animate">
//                             <Form.Control
//                                 type="search"
//                                 placeholder="Search..."
//                                 className="me-2"
//                                 aria-label="Search"
//                             />
//                             <Button className='bt2' variant="outline-light">🔍</Button>
//                             <Button className='bt1'>Sign Out</Button>
//                         </Form>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>



    


// <div style={{marginTop:'90px'}} className="premium-sidebar">
//                     <div className="sidebar-header">
//                         <h3>Navigation Menu</h3>
//                         <div className="sidebar-glow"></div>
//                     </div>
                    
//                       <nav className="sidebar-nav">
                     

//   {menu.map((item, index) => (
//     <Link key={index} href={item.href} className="sidebar-link">
//       <span className="link-icon">{item.icon}</span>
//       <span className="link-text">{item.label}</span>
//       <div className="link-glow"></div>
//     </Link>
//   ))}
// </nav>

                    
//   {session && <div className="sidebar-footer">
//                         <Button  onClick={()=>signOut()} className="premium-signout-sidebar">🚪 Sign Out</Button>
//                         </div>}
//  {!session && <div className="sidebar-footer">
//                       <Link href="/login/" >  <Button className="premium-signout-sidebar">🚪 SignIn</Button></Link> 
//                         </div>}
 
//                 </div>



            

//             <Offcanvas show={show} onHide={handleClose} style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)' }}>
//                 <Offcanvas.Header closeButton style={{ borderBottom: '1px solid var(--glass-border)' }}>
//                     <Offcanvas.Title style={{ 
//                         background: 'var(--primary-gradient)', 
//                         WebkitBackgroundClip: 'text', 
//                         WebkitTextFillColor: 'transparent',
//                         fontWeight: '700'
//                     }}>
//                         Navigation Menu
//                     </Offcanvas.Title>
//                 </Offcanvas.Header>
//                 <Offcanvas.Body>
//                     <div className='can1' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                         <p onClick={() => {
//                             const section = document.getElementById("up");
//                             section.scrollIntoView({ behavior: "smooth" });
//                         }} style={{
//                             padding: '1rem',
//                             background: 'var(--glass-bg)',
//                             borderRadius: '10px',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease',
//                             border: '1px solid var(--glass-border)'
//                         }}>📊 ANALYSIS</p>
//                         <p style={{
//                             padding: '1rem',
//                             background: 'var(--glass-bg)',
//                             borderRadius: '10px',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease',
//                             border: '1px solid var(--glass-border)'
//                         }}>🚪 Sign Out</p>
//                         <p style={{
//                             padding: '1rem',
//                             background: 'var(--glass-bg)',
//                             borderRadius: '10px',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease',
//                             border: '1px solid var(--glass-border)'
//                         }}>📈 Report</p>
//                         <p style={{
//                             padding: '1rem',
//                             background: 'var(--glass-bg)',
//                             borderRadius: '10px',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease',
//                             border: '1px solid var(--glass-border)'
//                         }}>⚡ Action</p>
//                     </div>
//                 </Offcanvas.Body>
//             </Offcanvas>

//             <div className="cards-container">

// <div style={{marginTop:'70px'}} className="pro-alert">
//                 <div className="pro-alert-icon">⚠️</div>
//                 <div className="pro-alert-text">
//                     <strong>Attention:</strong> You need to solve <span>Jaipur problem</span> first
//                 </div>
//             </div>

//             </div>

//             <div className="dashboard-content">
//                 <div className="main-content">
//                     <div className="charts-grid">
//                         <div className="chart-container">
//                             <h3>📈 Weekly Complaints Trend</h3>
//                             <ResponsiveContainer width="100%" height={250}>
//                                 <AreaChart data={uss}>
//                                     <XAxis dataKey="name" stroke="#cbd5e1" />
//                                     <YAxis stroke="#cbd5e1" />
//                                     <Tooltip
//                                         formatter={(value) => ["Count", `${value}`]}
//                                         labelFormatter={(label) => `City: ${label}`}
//                                         contentStyle={{ backgroundColor: '#1e293b', color: '#fff', border: '1px solid var(--glass-border)' }}
//                                     />
//                                     <Area
//                                         type="monotone"
//                                         dataKey="status"
//                                         stroke="#667eea"
//                                         fill="rgba(102, 126, 234, 0.3)"
//                                     />
//                                 </AreaChart>
//                             </ResponsiveContainer>
//                         </div>

//                         <div className="chart-container">
//                             <h3>📊 Total Problems by Branch</h3>
//                             <ResponsiveContainer width="100%" height={250}>
//                                 <BarChart data={u}>
//                                     <XAxis dataKey="name" stroke="#cbd5e1" />
//                                     <YAxis stroke="#cbd5e1" />
//                                     <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', border: '1px solid var(--glass-border)' }} />
//                                     <Bar dataKey="complaint" fill="#667eea" radius={[10, 10, 0, 0]} />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </div>

//                     <div className="charts-grid">
//                         <div className="chart-container">
//                             <h3>👥 User Activities</h3>
//                             <ResponsiveContainer width="100%" height={250}>
//                                 <LineChart data={l}>
//                                     <XAxis dataKey="Name" stroke="#cbd5e1" />
//                                     <YAxis stroke="#cbd5e1" />
//                                     <Tooltip
//                                         formatter={(value, name, props) => [`${value}`, `Activity`]}
//                                         labelFormatter={(label) => `User: ${label}`}
//                                         contentStyle={{ backgroundColor: '#1e293b', color: '#fff', border: '1px solid var(--glass-border)' }}
//                                     />
//                                     <Legend />
//                                     <Line type="monotone" dataKey="value" stroke="#4caf50" strokeWidth={2} />
//                                 </LineChart>
//                             </ResponsiveContainer>
//                         </div>

//                         <div className="top-user-card">
//                             <div className="trophy-circle">
//                                 <img style={{ width: "70px", height: '70px', borderRadius: '40px' }} src={maxUser?.person?.img} alt="Trophy" className="trophy-img" />
//                             </div>
//                             <h2 className="user-name">🏆 {maxUser?.person?.name}</h2>
//                             <p className="activity">Total Activity: {maxUser?.count}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="notification-container">
//                     {n.map((item,i) => (
//                         <div key={item.id} className="notification-card" style={{  background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', borderRadius: '15px', padding: '1rem', marginBottom: '1rem',  transition: 'all 0.3s ease' }}>
//                             <div className="notification-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
//                                 <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                                     <div className="avatar-container" style={{ position: 'relative', flexShrink: 0 }}>
//                                         <img src={item.img} alt={item.name} className="user-avatar" style={{  width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #667eea'}} />
//                                         <div className="online-indicator" style={{
//                                             position: 'absolute',
//                                             bottom: '4px',
//                                             right: '4px',
//                                             width: '12px',
//                                             height: '12px', background: '#4CAF50', border: '2px solid white',  borderRadius: '50%'}}></div>
//                                     </div>
//                                     <div className="user-details">
//                                         <h3 className="user-name" style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'white' }}>{item.name}</h3>
//                                         <span className="user-id" style={{ fontSize: '12px', color: '#94a3b8' }}>ID: {item.id}</span>
//                                     </div>
//                                 </div>
//                                 <div className="notification-badge" style={{ background: 'var(--secondary-gradient)',color: 'white', padding: '4px 12px', borderRadius: '12px',  fontSize: '11px',  fontWeight: '600'}}>New</div>
//                             </div>

//                             <div className="notification-content" style={{ paddingTop: '12px', borderTop: '1px solid var(--glass-border)' }}>
//                                 <p className="notification-text" style={{ margin: '0 0 16px 0', color: '#cbd5e1', lineHeight: '1.5' }}>
//                                     <strong style={{ color: 'white' }}>{item.name}</strong> has submitted a new complaint that requires your attention.
//                                 </p>
//                                 <div className="notification-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                     <div className="time-info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                                         <span className="time-icon">⏰</span>
//                                         <span className="notification-time" style={{ fontSize: '12px', color: '#94a3b8' }}>
//                                             {new Date(item.uploadedAt).toLocaleString()}
//                                         </span>
//                                     </div>
//                                     <button onClick={(e)=>send(e,i)} className="action-btn" style={{ background: 'var(--primary-gradient)',  color: 'white',  border: 'none',  padding: '8px 16px', borderRadius: '12px',fontSize: '12px',fontWeight: '600',cursor: 'pointer'}}>View Details</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <h2 className='c5' style={{color: 'white',textAlign: 'center',  margin: '-2rem -100px -80rem -80', fontSize: '2rem', fontWeight: '700', justifySelf:'center', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',}}>TOTAL RESOLVED RECORDS</h2>

//             <div   className='ty5'>
//                 {v.map((items, i) => (
//                     <div key={i} style={{ width: '100%',justifySelf:'center',color:'black' }}>
//                         <Table responsive="sm">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Branch</th>
//                                     <th>Location</th>
//                                     <th>Complaint</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>{items.name}</td>
//                                     <td>{items.branch}</td>
//                                     <td>{items.location}</td>
//                                     <td>{items.complaint}</td>
//                                     <td className='thd' style={{ color: '#030202ff', fontWeight: '600' }}>{items.status}</td>
//                                 </tr>
//                             </tbody>
//                         </Table>
//                     </div>
//                 ))}
//             </div>   
//         </>
//     )
// }

// export default Page




'use client'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line, Legend } from "recharts";
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import _ from 'lodash';
import Adnav from '../../../adnvav/nav';
const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [uss, sets] = useState([]);
  const [u, setU] = useState([]);
  const [v, setV] = useState([]);
  const [l, setL] = useState([]);
  const[lo,slo] = useState("")
  const[c,sc] = useState({count:"",scount:""})
  const [maxUser, setMaxUser] = useState(null);
    console.log("backned url -> ",process.env.NEXT_PUBLIC_BACKEND)

  useEffect(() => {
     (async () => {
        try{
            slo("data is loading please wait....")
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/adm`);
      const data = await res.json();
      setUsers(data);
if(data.length){
    const countryCount = data.reduce((acc, item) => {
  acc[item.location] = (acc[item.location] || 0) + 1;
  return acc;
 }, {});

console.log("ccccc",countryCount);
let maxCountry = "";
let maxCount = 0;
for (let location in countryCount) {
  if (countryCount[location] > maxCount) {
    maxCount = countryCount[location];
    maxCountry = location;
  }
}
sc({cout:maxCountry,scout:maxCount})
console.log(maxCountry, maxCount);

    slo("");
}
if(!data.length){
    slo("Not content found yet....")
}
        }catch(err){
slo("please check your internet speed.....")
        }
    })();
  }, []);

  useEffect(() => {
    const statusCount = _.countBy(users, 'status');
    sets(Object.keys(statusCount).map(k => ({ name: k, status: statusCount[k] })));

    const branchCount = _.countBy(users, 'branch');
    setU(Object.keys(branchCount).map(k => ({ name: k, complaint: branchCount[k] })));

    const solved = users.filter(u => u.status === 'Resolved');
    setV(solved);

    const activity = _.countBy(users, 'name');
    setL(Object.keys(activity).map(k => ({ Name: k, value: activity[k] })));

    const grouped = _.groupBy(users, "userEmail");
    const top = _.maxBy(
      Object.values(grouped).map(g => ({ count: g.length, person: g[0] })),
      'count'
    );
    setMaxUser(top || null);
  }, [users]);

  console.log(c)
  return (
    <>
    {/* 🚨 JAIPUR ALERT */}
    {lo!==""&&<><div>{lo}</div></>}
<div className="jaipur-alert">
  ⚠️ <strong>Attention:</strong> Please solve first <span>{c.cout}</span>.
  <div>
    {c.cout} count {c.scout}
  </div>
</div>
<Adnav/>
      {/* MAIN LAYOUT */}
      <main className="layout">
        {/* DASHBOARD */}
        <section className="dashboard">
          <div className="charts-grid">
            <ChartBox title="Weekly Complaints">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={uss}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="status" fill="#667eea" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartBox>

            <ChartBox title="Problems by Branch">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={u}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="complaint" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>
            </ChartBox>
          </div>

          <div className="charts-grid">
            <ChartBox title="User Activity">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={l}>
                  <XAxis dataKey="Name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="value" stroke="#4caf50" />
                </LineChart>
              </ResponsiveContainer>
            </ChartBox>

            <div className="top-user">
              <h3>🏆 Top User</h3>
              <p>{maxUser?.person?.name}</p>
              <strong>{maxUser?.count}</strong>
            </div>
          </div>
        </section>

        {/* TABLE */}
        <section className="table-wrapper">
          <h2>TOTAL RESOLVED RECORDS</h2>
          <Table responsive bordered>
            <thead>
              <tr>
                <th>Name</th><th>Branch</th><th>Location</th><th>Complaint</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {v.map((i, idx) => (
                <tr key={idx}>
                  <td>{i.name}</td>
                  <td>{i.branch}</td>
                  <td>{i.location}</td>
                  <td>{i.complaint}</td>
                  <td>{i.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </main>

      {/* CSS */}
      <style jsx global>{`
      .jaipur-alert {
  background: linear-gradient(135deg, #ff9800, #ff5722);
  color: white;
  padding: 14px 18px;
  border-radius: 12px;
  margin: 100px auto 20px; /* navbar ke niche */
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
}

.jaipur-alert span {
  background: rgba(0,0,0,0.25);
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
}

.jaipur-alert button {
  background: white;
  color: #ff5722;
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.jaipur-alert button:hover {
  transform: scale(1.05);
}

 @media (max-width: 600px) {
  .jaipur-alert {
    flex-direction: column;
    align-items: flex-start;
  }

  .jaipur-alert button {
    width: 100%;
    text-align: center;
  }
}
        body { background:#0f172a; color:white; }

        .layout {
          padding-top: 90px;
          max-width: 1400px;
          margin: auto;
          padding-inline: 16px;
        }

        .dashboard { display:flex; flex-direction:column; gap:32px; }

        .charts-grid {
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap:24px;
        }

        .chart-box {
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
          padding:16px;
        }

        .top-user {
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
          padding:24px;
          text-align:center;
        }

        .table-wrapper {
          margin: 48px auto;
          max-width: 1200px;
        }

        h2 { text-align:center; margin-bottom:16px; }
      `}</style>
    </>
  )
};

const ChartBox = ({ title, children }) => (
  <div className="chart-box">
    <h3 style={{textAlign:'center'}}>{title}</h3>
    {children}
  </div>
);

export default Page;
