'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AreaChart, LineChart, Line, Area, Cell, Legend } from "recharts";
import md5 from 'blueimp-md5';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import _ from "lodash";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';
import { Suspense } from 'react';
export const dynamic = 'force-dynamic'
import Srtr from '../sidev/srtr';
import Adnav from '../../../adnvav/nav';
export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <InfoContent />
    </Suspense>
  )
}
function InfoContent() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [uss, sets] = useState('');
    const [s, ts] = useState('');
    const [p, ss] = useState('');
    const [b, x] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [u, set] = useState([]);
    const [users, setUsers] = useState([]);
    const [us, setUs] = useState([]);
    const item = searchParams.get("data");
    const index = parseInt(item);
    const [status, setStatus] = useState("Pending");
    const [show, setShow] = useState(false);
    const [t, se] = useState(false);

    const fetchUsers = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/complaint/adm`);
        const data = await res.json();
        console.log(data);
        const sorted = data.sort(  (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        setUsers(sorted);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchUsers();
    }, []);
 const menu = [
  { icon: '🏠', label: 'Dashboard', href: '/admin' },
  { icon: '📊', label: 'Analytics', href: '/' },
  { icon: '📋', label: 'All Complaints', href: '/adcom' },
  { icon: '🔔', label: 'Report', href: '/report' },
   { icon: '💬', label: 'Notification', href: '/notia' },
   { icon: '👤', label: 'Profile', href: '/adp' },
];
    useEffect(() => {
        if (users[index]) {
            setUs(users[index]);
            setStatus(users[index].status)
        }
    }, [users, item]);

    useEffect(() => {
        if (us) {
            let y = users.filter((item) => item.userEmail === us.userEmail);
            console.log("done->", y)

            let co = y.reduce((acc, item) => {
                acc[item.userEmail] = (acc[item.userEmail] || 0) + 1;
                return acc;
            }, {});
            let ca = y.reduce((acc, item) => {
                acc[item.complaint] = (acc[item.complaint] || 0) + 1;
                return acc;
            }, {});
            const formattedD = Object.keys(ca).map(key => ({
                Name: key,
                Status: ca[key]
            }));
            x(formattedD)
            set(co)
            console.log("v->", formattedD)
            console.log("ca -> ", ca)
            const statusCount = _.countBy(y, "status");

            console.log(statusCount);
            console.log("Resolve count:", statusCount.Resolved);
            console.log("Resolve count:", statusCount["In Progress"]);
            sets(statusCount.Resolved)
            if(statusCount["In Progress"]!=null){
                            ts(statusCount["In Progress"])
            }
            else{
         ts(0)
  
            }
             ss(statusCount.Pending)
        }
    }, [us, users]);

    console.log(new Date(us.uploadedAt).toLocaleString())
    const userId = users[index]?.email || "random";
    const randomNum = Math.floor(Math.random() * 1000);
    const avatarUrl = `https://robohash.org/${encodeURIComponent(userId + randomNum)}.png`;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const chg = () => {
        se(true)
    }

    const handleSelect = async(value) => {
        console.log("called..",value)
        setStatus(value);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/complaint/chstatus`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:us?.userEmail,name:us.name,des:us?.des,mob:us?.mobile,status:value,complaint:us?.compalaint,date:new Date(us?.uploadedAt).toLocaleString()})
        });
         console.log("Clicked value:", value);
    };

    return (
        <div className="super-complaint-detail">
             {t && <div className='image-modal-overlay' onClick={() => se(!t)}>
                <div className='image-modal'>
                    <div className='modal-close' onClick={() => se(false)}>✕</div>
                    <img className='modal-image' src={`data:image/jpeg;base64,${us?.image}`} alt="Complaint" />
                </div>
            </div>}
{/* <div className="premium-sidebar">
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

                    
                    <div className="sidebar-footer">
                        <Button className="premium-signout-sidebar">🚪 Sign Out</Button>
                    </div>
                </div> */}


<Adnav/>
             <div className="main-content-wrapper">
                 <div className="user-info-card">
                    <div className="user-header">
                        <div className="user-avatar-section">
                            <div className="avatar-container">
                                <img className='user-avatar' src={avatarUrl} alt="User Avatar" />
                            </div>
                            <div className="user-details">
                                <h2 className="user-name">{us.userName}</h2>
                                <p className="user-email">{us?.userEmail}</p>
                                <div className="contact-info">
                                    <span className="phone">📱 +91 {us?.mobile}</span>
                                    <span className="location">📍 {us.location}, {us.branch}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="complaint-details">
                        <div className="complaint-header">
                            <h3 className="complaint-title">📋 Complaint Details</h3>
                            <Button onClick={chg} className="image-view-btn">
                                🖼️ View Image
                            </Button>
                        </div>
                        <div className="complaint-content">
                            <p className="complaint-description">{us.des}</p>
                            <div className="complaint-meta">
                                <span className="upload-time">
                                    🕒 {new Date(us.uploadedAt).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <Offcanvas show={show} onHide={handleClose} className="super-offcanvas">
                    <Offcanvas.Header closeButton className="offcanvas-header-glow">
                        <Offcanvas.Title>🚀 Quick Actions</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='offcanvas-menu'>
                            <div className="menu-item" onClick={() => {
                                const section = document.getElementById("analytics");
                                section.scrollIntoView({ behavior: "smooth" });
                                handleClose();
                            }}>
                                <span className="menu-icon">📈</span>
                                Analytics
                            </div>
                            <div className="menu-item">
                                <span className="menu-icon">📤</span>
                                Export Report
                            </div>
                            <div className="menu-item">
                                <span className="menu-icon">🚨</span>
                                Emergency
                            </div>
                            <div className="menu-item">
                                <span className="menu-icon">⚡</span>
                                Quick Action
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>

                 <div className="stats-overview">
                    <div className="stat-card resolved">
                        <div className="stat-icon">✅</div>
                        <div className="stat-content">
                            <h3>Resolved</h3>
                            <p className="stat-number">{uss}</p>
                        </div>
                    </div>
                    <div style={{height:125}} className="stat-card progress">
                        <div className="stat-icon">🔄</div>
                        <div className="stat-content">
                            <h3>In Progress</h3>
                            <p className="stat-number">{s}</p>
                        </div>
                    </div>
                    <div className="stat-card pending">
                        <div className="stat-icon">⏳</div>
                        <div className="stat-content">
                            <h3>Pending</h3>
                            <p className="stat-number">{p}</p>
                        </div>
                    </div>
                </div>

                 <div id="analytics" className="analytics-section">
                    <h3 className="section-title">📊 Complaints Analysis</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={b}>
                                <XAxis dataKey="Name" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        border: '1px solid #667eea',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Status"
                                    stroke="url(#areaStroke)"
                                    fill="url(#areaGradient)"
                                    strokeWidth={3}
                                />
                                <defs>
                                    <linearGradient id="areaStroke" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#667eea" />
                                        <stop offset="100%" stopColor="#764ba2" />
                                    </linearGradient>
                                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#667eea" stopOpacity={0.4} />
                                        <stop offset="100%" stopColor="#764ba2" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                 <div className="progress-tracker-section">
                    <h3 className="section-title">📍 Complaint Progress Tracker</h3>
                    <div className="tracker-container">
                        <div
                            className="status-progress"
                            style={{ "--line-width": status === "Pending" ? "0%" : status === "In Progress" ? "50%" : "100%" }}
                        >
                            <div className={`status-step ${status === "Pending" || status === "In Progress" || status === "Resolved" ? "active" : ""}`}>
                                <span>1</span>
                                <p>Pending</p>
                            </div>
                            <div className={`status-step ${status === "In Progress" || status === "Resolved" ? "active" : ""}`}>
                                <span>2</span>
                                <p>In Progress</p>
                            </div>
                            <div className={`status-step ${status === "Resolved" ? "active" : ""}`}>
                                <span>3</span>
                                <p>Resolved</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Section */}
                <div className="action-section">
                    <div className="status-selector">
                        <h4>🔄 Update Status</h4>
                        <Dropdown className="status-dropdown">
                            <Dropdown.Toggle className="dropdown-toggle-glow">
                                {status} ⬇️
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-glow">
                                <Dropdown.Item onClick={() => handleSelect("Pending")}>⏳ Pending</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSelect("In Progress")}>🔄 In Progress</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSelect("Resolved")}>✅ Resolved</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="share-section">
                        <h4>📤 Share Complaint</h4>
                        <Button className="share-btn">
                            🔗 Generate Share Link
                        </Button>
                    </div>
                </div>

                 <div className="map-section">
                    <h3 className="section-title">🗺️ Complaint Location</h3>
                    <div className="map-container">
                        <iframe
                            className='location-map'
                            width="100%"
                            height="400"
                            style={{ border: 0, borderRadius: '15px' }}
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps?q=${encodeURIComponent(us.location)}&output=embed`}
                        ></iframe>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .super-complaint-detail {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
                    font-family: 'Segoe UI', system-ui, sans-serif;
                    color: white;
                }

                /* Image Modal */
                .image-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    backdrop-filter: blur(10px);
                }
.premium-sidebar{
padding:70px
font-size:60px;
 width:300px;
}
                .image-modal {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.5);
                }

                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 20px;
                    z-index: 10;
                    transition: all 0.3s ease;
                }

                .modal-close:hover {
                    background: rgba(255, 0, 0, 0.7);
                    transform: scale(1.1);
                }

                .modal-image {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                /* Enhanced Navbar */
                .super-navbar {
                    background: rgba(0, 0, 0, 0.95) !important;
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(102, 126, 234, 0.3);
                    padding: 8px 0 !important;
                    height: 70px !important;
                    transition: all 0.3s ease;
                }

                .super-navbar.scrolled {
                    background: rgba(0, 0, 0, 0.98) !important;
                    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
                }

                .super-brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 5px 15px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                    font-size: 20px;
                    font-weight: 700;
                    color: white;
                }

                .brand-icon {
                    font-size: 24px;
                }

                .nav-link-glow {
                    color: #fff !important;
                    font-weight: 600;
                    margin: 0 10px;
                    padding: 8px 16px !important;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .nav-link-glow:hover {
                    background: rgba(102, 126, 234, 0.2);
                    transform: translateY(-2px);
                }

                .search-input-glow {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(102, 126, 234, 0.4) !important;
                    border-radius: 20px;
                    color: white !important;
                    padding: 8px 16px;
                }

                .super-search-btn, .super-signout-btn {
                    border-radius: 20px;
                    margin-left: 8px;
                    padding: 8px 16px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    border: none;
                }

                .super-search-btn {
                    background: rgba(102, 126, 234, 0.3);
                    color: white;
                    border: 1px solid rgba(102, 126, 234, 0.5);
                }

                .super-signout-btn {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                }

                /* Main Content */
                .main-content-wrapper {
                    padding: 20px 20px 40px;
                    max-width: 1200px;
                    margin: 0 auto;
                     
                }

                /* User Info Card */
                .user-info-card {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 30px;
                    margin-bottom: 30px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(102, 126, 234, 0.3);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                }

                .user-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 25px;
                }

                .user-avatar-section {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    flex: 1;
                }

                .avatar-container {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 3px solid #667eea;
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                }

                .user-avatar {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .user-details h2 {
                    margin: 0 0 5px 0;
                    font-size: 24px;
                    font-weight: 700;
                }

                .user-email {
                    color: rgba(255, 255, 255, 0.8);
                    margin: 0 0 10px 0;
                }

                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .contact-info span {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.7);
                }

                .complaint-details {
                    border-top: 1px solid rgba(102, 126, 234, 0.3);
                    padding-top: 20px;
                }

                .complaint-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }

                .complaint-title {
                    margin: 0;
                    font-size: 20px;
                    font-weight: 700;
                }

                .image-view-btn {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border: none;
                    border-radius: 10px;
                    padding: 8px 16px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .image-view-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
                }

                .complaint-description {
                    color: rgba(255, 255, 255, 0.9);
                    line-height: 1.6;
                    margin-bottom: 15px;
                }

                .upload-time {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 14px;
                }

                /* Quick Actions */
                .quick-actions-btn {
                    position: fixed;
                     right: 20px;
                    z-index: 1000;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border: none;
                    border-radius: 25px;
                    padding: 0px 20px;
                    font-weight: 600;
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                    transition: all 0.3s ease;
                }

                .quick-actions-btn:hover {
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
                }

                .super-offcanvas {
                    background: rgba(0, 0, 0, 0.9) !important;
                    backdrop-filter: blur(20px);
                }

                .offcanvas-header-glow {
                    border-bottom: 1px solid rgba(102, 126, 234, 0.3);
                }

                .offcanvas-menu {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .menu-item {
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-radius: 10px;
                    color: rgba(255, 255, 255, 0.8);
                }

                .menu-item:hover {
                    background: rgba(102, 126, 234, 0.2);
                    color: white;
                    transform: translateX(5px);
                }

                .menu-icon {
                    font-size: 18px;
                }

                /* Stats Overview */
                .stats-overview {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .stat-card {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 25px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(102, 126, 234, 0.3);
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
                }

                .stat-card.resolved { border-left: 4px solid #06D6A0; }
                .stat-card.progress { border-left: 4px solid #118AB2; }
                .stat-card.pending { border-left: 4px solid #FFA502; }

                .stat-icon {
                    font-size: 40px;
                }

                .stat-content h3 {
                    margin: 0 0 5px 0;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.8);
                }

                .stat-number {
                    margin: 0;
                    font-size: 32px;
                    font-weight: 800;
                    color: white;
                }

                /* Analytics Section */
                .analytics-section {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 30px;
                    margin-bottom: 30px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(102, 126, 234, 0.3);
                }

                .section-title {
                    margin: 0 0 20px 0;
                    font-size: 24px;
                    font-weight: 700;
                    color: white;
                    text-align: center;
                }

                .chart-container {
                    height: 300px;
                }

                /* Progress Tracker */
                .progress-tracker-section {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 30px;
                    margin-bottom: 30px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(102, 126, 234, 0.3);
                }

                .tracker-container {
                    display: flex;
                    justify-content: center;
                }

                .status-progress {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    max-width: 600px;
                    position: relative;
                }

                .status-progress::before {
                    content: '';
                    position: absolute;
                    top: 20px;
                    left: 0;
                    width: var(--line-width, 0%);
                    height: 4px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    transition: width 0.5s ease;
                    z-index: 1;
                }

                .status-progress::after {
                    content: '';
                    position: absolute;
                    top: 20px;
                    left: 0;  
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.2);
                    z-index: 0;
                }

                .status-step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }

                .status-step span {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 8px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .status-step.active span {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                }

                .status-step p {
                    margin: 0;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.7);
                    transition: all 0.3s ease;
                }

                .status-step.active p {
                    color: white;
                    font-weight: 600;
                }

                /* Action Section */
                .action-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                    margin-bottom: 30px;
                }

                .status-selector, .share-section {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 25px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(102, 126, 234, 0.3);
                }

                .status-selector h4, .share-section h4 {
                    margin: 0 0 15px 0;
                    font-size: 18px;
                    font-weight: 600;
                }

                .dropdown-toggle-glow {
                    background: linear-gradient(135deg, #667eea, #764ba2) !important;
                    border: none !important;
                    border-radius: 10px !important;
                    padding: 10px 20px !important;
                    font-weight: 600;
                }

                .dropdown-menu-glow {
                    background: rgba(0, 0, 0, 0.9) !important;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(102, 126, 234, 0.3) !important;
                }

                .share-btn {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border: none;
                    border-radius: 10px;
                    padding: 10px 20px;
                    font-weight: 600;
                    width: 100%;
                    transition: all 0.3s ease;
                }

                .share-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
                }

                /* Map Section */
                .map-section {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 30px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(102, 126, 234, 0.3);
                   margin-top:100px
                }

                .location-map {
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .main-content-wrapper {
                        padding: 80px 15px 20px;
                    }

                    .user-header {
                        flex-direction: column;
                        text-align: center;
                    }

                    .user-avatar-section {
                        flex-direction: column;
                        text-align: center;
                    }

                    .complaint-header {
                        flex-direction: column;
                        gap: 15px;
                        text-align: center;
                    }

                    .stats-overview {
                        grid-template-columns: 1fr;
                    }

                    .action-section {
                        grid-template-columns: 1fr;
                    }

                    .quick-actions-btn {
                        position: static;
                        margin-bottom: 20px;
                        width: 100%;
                    }

                    .status-progress {
                        flex-direction: column;
                        gap: 30px;
                    }

                    .status-progress::before,
                    .status-progress::after {
                        width: 4px;
                        height: var(--line-width, 0%);
                        top: 0;
                        left: 20px;
                    }

                    .status-step {
                        flex-direction: row;
                        gap: 15px;
                    }

                    .status-step span {
                        margin-bottom: 0;
                    }
                }

                @media (max-width: 480px) {
                    .user-info-card,
                    .analytics-section,
                    .progress-tracker-section,
                    .action-section > div,
                    .map-section {
                        padding: 20px;
                    }

                    .stat-card {
                        padding: 20px;
                    }

                    .section-title {
                        font-size: 20px;
                    }
                }
            `}</style>
        </div>
    )
}
