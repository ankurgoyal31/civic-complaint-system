'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from 'react';
import { AreaChart, Area } from "recharts";
import { useRouter } from 'next/navigation';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Srtr from '../sidev/srtr';
import Link from 'next/link';
 import Adnav from '../../../adnvav/nav';
const Page = () => {
  const router = useRouter();
  const [uss, sets] = useState([]);
  const [u, set] = useState([]);
  const [users, setUsers] = useState([]);
  const [us, setUs] = useState();
  const [isOpen, setisOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const[l,sl] = useState("")
 const[p,sp] = useState(0);
    const[pr,spr] = useState(0);
    const[r,sr] = useState(0);
    const[t,st] = useState(0);
  const fetchUsers = async () => {
    try{
      sl("loading your content....")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/adm`);
    const data = await res.json();
    console.log(data);
    setUsers(data)
    if(data.length){
      st(data.length);
       let fil = data.filter((item)=>item.status==="Pending");
            console.log(fil.length)
            sp(fil.length)
                let fil1 = data.filter((item)=>item.status==="In Progress");
            console.log(fil1.length)
            spr(fil1.length)
                let fil2 = data.filter((item)=>item.status==="Resolved");
            console.log(fil2.length)
            sr(fil2.length)
sl("")
    }

    }catch(err){
sl("check your internet connection....")
    }
  };
  
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
    const counts = users.reduce((acc, item) => {
      acc[item.complaint] = (acc[item.complaint] || 0) + 1;
      return acc;
    }, {});
    
    const formattedData = Object.keys(counts).map(key => ({
      name: key,
      points: counts[key]
    }));
    
    setUs(formattedData);
  }, [users]);

  useEffect(() => {
    const sorted = [...users].sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );
    sets(sorted.slice(0, 8));
    
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const recentTwoDays = users.filter(user => 
     new Date(user.uploadedAt) >= twoDaysAgo
    );
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weeklyCounts = {};
    users.forEach(item => {
      const day = days[new Date(item.uploadedAt).getDay()];
      weeklyCounts[day] = (weeklyCounts[day] || 0) + 1;
    });
    
    days.forEach(day => {
      if (!weeklyCounts[day]) weeklyCounts[day] = 0;
    });
    
    const formattedDa = Object.keys(weeklyCounts).map(key => ({
      name: key,
      complaints: weeklyCounts[key]
    }));
    console.log(formattedDa)
    set(formattedDa)
  }, [users]);

  const get = (e, i) => {
    console.log(i)
    router.push(`/info?data=${encodeURIComponent(i)}`);  
  }
  
  const red = () => {
    router.push(`/adcom`);  
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="super-dashboard">
      
<Adnav/>
    <div className="main-content-wrapper">
         <div className="bg-animation">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>

        {/* Stats Cards with Glow Effects */}
        <div className="super-stats-section">
          <div className="stat-card-glow total">
            <div className="stat-content">
              <div className="stat-icon">📊</div>
              <h3>Total Complaints</h3>
              <p className="stat-number">{t}</p>
              <div className="stat-glow"></div>
            </div>
          </div>
          
          <div className="stat-card-glow pending">
            <div className="stat-content">
              <div className="stat-icon">⏳</div>
              <h3>Pending</h3>
              <p className="stat-number">{p}</p>
              <div className="stat-glow"></div>
            </div>
          </div>
          
          <div className="stat-card-glow progress">
            <div className="stat-content">
              <div className="stat-icon">🔄</div>
               <h3>In Progress</h3>
              <p className="stat-number">{pr}</p>
              <div className="stat-glow"></div>
            </div>
          </div>
          
          <div className="stat-card-glow resolved">
            <div className="stat-content">
              <div className="stat-icon">✅</div>
              <h3>Resolved</h3>
              <p className="stat-number">{r}</p>
              <div className="stat-glow"></div>
            </div>
          </div>
        </div>
         <div className="super-recent-section">
          <div className="section-header-glow">
            <h2 className="section-title">🔥 LAST TIME COMPLAINTS</h2>
            <Button onClick={red} className="super-view-more-btn">
              👁️ View More
            </Button>
          </div>
          {l!=="" && <><div>{l}</div></>}
          <div className="super-complaints-grid">
            {uss.map((items, index) => (
              <div key={index} className="super-complaint-card" onClick={(e) => get(e, index)}>
                <div className={`status-badge-glow ${items.status?.toLowerCase()}`}>
                  {items.status}
                </div>
                <div className="image-container">
                  <img src={`data:image/jpeg;base64,${items.image}`} alt={items.name} />
                  <div className="image-overlay"></div>
                </div>
                <div className="card-content">
                  <h4 className="card-title">COMPLAINT - {items.complaint}</h4>
                  <p className="card-description">{items.des}</p>
                  <div className="card-meta">
                    <span className="location">📍 LOCATION - {items.location}</span>
                  </div>
                  <Button className="super-action-btn">🚀 Go Action</Button>
                </div>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Section - FIXED HEIGHT */}
        <div id="analytics" className="super-analytics-section">
          <div className="section-header-glow">
            <h2 className="section-title">📊 ANALYTICS DASHBOARD</h2>
          </div>
          
          <div className="super-charts-container">
            {/* Bar Chart - Fixed Height */}
            <div className="chart-card-glow">
              <h3 className="chart-title">📋 TOTAL PROBLEM</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={us}>
                    <XAxis dataKey="name" stroke="#fff" />
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
                    <Bar 
                      dataKey="points" 
                      fill="url(#barGradient)"
                      radius={[10, 10, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Area Chart - Fixed Height */}
            <div className="chart-card-glow">
              <h3 className="chart-title">📈 Weekly Complaints Trend</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={u}>
                    <XAxis dataKey="name" stroke="#fff" />
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
                      dataKey="complaints" 
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
          </div>

          {/* Progress Tracker - SAME HEIGHT AS CHARTS */}
          {/* <div className="progress-tracker-section">
            <h3 className="progress-title">📍 Complaint Progress Tracker</h3>
            <div className="tracker-container">
              <div className="status-progress">
                <div className="status-step active">
                  <div className="step-circle">1</div>
                  <p>Pending</p>
                </div>
                <div className="status-step active">
                  <div className="step-circle">2</div>
                  <p>In Progress</p>
                </div>
                <div className="status-step">
                  <div className="step-circle">3</div>
                  <p>Resolved</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <style jsx>{`
        .super-dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
          font-family: 'Segoe UI', system-ui, sans-serif;
          position: relative;
          overflow-x: hidden;
        }
.premium-sidebar{
padding:70px
font-size:60px;
margin-top:100px;
width:300px;
}
        /* Animated Background */
        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .floating-shapes {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, #667eea, #764ba2);
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 { width: 200px; height: 200px; top: 10%; left: 5%; animation-delay: 0s; }
        .shape-2 { width: 150px; height: 150px; top: 60%; right: 10%; animation-delay: 2s; }
        .shape-3 { width: 100px; height: 100px; bottom: 20%; left: 20%; animation-delay: 4s; }
        .shape-4 { width: 250px; height: 250px; top: 30%; right: 20%; animation-delay: 1s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        /* Super Navbar */
        .super-navbar {
          background: rgba(0, 0, 0, 0.8) !important;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(102, 126, 234, 0.3);
          padding: 15px 0;
          transition: all 0.4s ease;
          z-index: 1000;
        }

        .super-navbar.scrolled {
          background: rgba(0, 0, 0, 0.95) !important;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
        }

        .super-brand {
          font-size: 0 !important;
        }

        .brand-glow {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
          to { box-shadow: 0 0 30px rgba(102, 126, 234, 0.8), 0 0 40px rgba(102, 126, 234, 0.6); }
        }

        .brand-emoji {
          font-size: 28px;
        }

        .brand-text {
          font-size: 24px;
          font-weight: 800;
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .super-nav-links .nav-item-glow {
          color: #fff !important;
          font-weight: 600;
          margin: 0 15px;
          padding: 10px 20px !important;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-item-glow:hover {
          background: rgba(102, 126, 234, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .search-input-glow {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(102, 126, 234, 0.5) !important;
          border-radius: 25px;
          color: white !important;
          padding: 0px 0px;
          backdrop-filter: blur(10px);
        }

        .search-input-glow::placeholder {
          color: rgba(255, 255, 255, 0.7) !important;
        }

        .super-search-btn, .super-signout-btn {
          border-radius: 25px;
          margin-left: 10px;
          padding: 0px 0px;
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

        .super-search-btn:hover, .super-signout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        /* Main Content */
        .main-content-wrapper {
          position: relative;
          z-index: 1;
           max-width: 2800px;
          margin: -100 auto;
          }

        /* Super Stats Section */
        .super-stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }

        .stat-card-glow {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          cursor: pointer;
         }

        .stat-card-glow:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
          border-color: rgba(102, 126, 234, 0.6);
        }

        .stat-card-glow.total { background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2)); }
        .stat-card-glow.pending { background: linear-gradient(135deg, rgba(255, 165, 2, 0.2), rgba(255, 107, 107, 0.2)); }
        .stat-card-glow.progress { background: linear-gradient(135deg, rgba(17, 138, 178, 0.2), rgba(102, 126, 234, 0.2)); }
        .stat-card-glow.resolved { background: linear-gradient(135deg, rgba(6, 214, 160, 0.2), rgba(17, 138, 178, 0.2)); }

        .stat-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .stat-icon {
          font-size: 50px;
          margin-bottom: 15px;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }

        .stat-content h3 {
          margin: 0 0 10px 0;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
         }

        .stat-number {
          margin: 0;
          font-size: 42px;
          font-weight: 800;
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .stat-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .stat-card-glow:hover .stat-glow {
          opacity: 1;
        }

        /* Super Quick Actions */
        .super-quick-actions {
          position: fixed;
          top: 120px;
          right: 40px;
          z-index: 1000;
        }

        .super-menu-toggle {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .super-menu-toggle:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
        }

        .menu-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }

        .super-menu-box {
          background: rgba(0, 0, 0, 0.9);
          border-radius: 15px;
          padding: 0;
          margin-top: 15px;
          box-shadow: 0 15px 50px rgba(102, 126, 234, 0.3);
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: all 0.4s ease;
          border: 1px solid rgba(102, 126, 234, 0.3);
          backdrop-filter: blur(20px);
        }

        .super-menu-box.open {
          max-height: 400px;
          opacity: 1;
          padding: 20px 0;
        }

        .super-menu-item {
          padding: 15px 25px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          border-left: 3px solid transparent;
        }

        .super-menu-item:hover {
          background: rgba(102, 126, 234, 0.2);
          color: white;
          border-left-color: #667eea;
          transform: translateX(5px);
        }

        .menu-icon {
          font-size: 18px;
          filter: drop-shadow(0 0 5px rgba(102, 126, 234, 0.5));
        }

        /* Super Recent Section */
        .super-recent-section {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 25px;
          padding: 40px;
          margin: 40px 0;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(102, 126, 234, 0.2);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .section-header-glow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid rgba(102, 126, 234, 0.3);
        }

        .section-title {
          margin: 0;
          font-size: 32px;
          font-weight: 800;
          color: white;
          text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
          background: linear-gradient(135deg, #fff, #667eea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .super-view-more-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          padding: 12px 25px;
          border-radius: 25px;
          font-weight: 600;
          color: white;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .super-view-more-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.5);
        }

        .super-complaints-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          padding:30px
        }

        .super-complaint-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
          cursor: pointer;
          border: 1px solid rgba(102, 126, 234, 0.3);
          position: relative;
          backdrop-filter: blur(10px);
        }

        .super-complaint-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px rgba(102, 126, 234, 0.4);
          border-color: rgba(102, 126, 234, 0.6);
        }

        .status-badge-glow {
          position: absolute;
          top: 15px;
          right: 15px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          z-index: 3;
          backdrop-filter: blur(10px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .status-badge-glow.pending { background: linear-gradient(135deg, #ffa502, #ff6b6b); color: white; }
        .status-badge-glow.in-progress { background: linear-gradient(135deg, #118AB2, #667eea); color: white; }
        .status-badge-glow.resolved { background: linear-gradient(135deg, #06D6A0, #118AB2); color: white; }

        .image-container {
          width: 100%;
          height: 200px;
          overflow: hidden;
          position: relative;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .super-complaint-card:hover .image-container img {
          transform: scale(1.1);
        }

        .super-complaint-card:hover .image-overlay {
          opacity: 1;
        }

        .card-content {
          padding: 25px;
          position: relative;
          z-index: 2;
        }

        .card-title {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 700;
          color: white;
        }

        .card-description {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .card-meta {
          margin-bottom: 15px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .super-action-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          padding: 12px;
          border-radius: 12px;
          font-weight: 600;
          color: white;
          transition: all 0.3s ease;
        }

        .super-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(102, 126, 234, 0.2) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .super-complaint-card:hover .card-glow {
          opacity: 1;
        }

        /* Super Analytics Section - FIXED HEIGHTS */
        .super-analytics-section {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 25px;
          padding: 40px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(102, 126, 234, 0.2);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .super-charts-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .chart-card-glow {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          height: 400px; /* Fixed height for charts */
          border: 1px solid rgba(102, 126, 234, 0.3);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .chart-title {
          margin: 0 0 20px 0;
          font-size: 20px;
          font-weight: 700;
          color: white;
          text-align: center;
          text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
        }

        .chart-wrapper {
          height: 320px; /* Fixed chart wrapper height */
        }

        /* Progress Tracker - SAME HEIGHT AS CHARTS */
        .progress-tracker-section {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid rgba(102, 126, 234, 0.3);
          backdrop-filter: blur(10px);
          height: 400px; /* Same height as charts */
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .progress-title {
          margin: 0 0 30px 0;
          font-size: 24px;
          font-weight: 700;
          color: white;
          text-align: center;
          text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
        }

        .tracker-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
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
          top: 25px;
          left: 0;
          width: 66%; /* Progress line */
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          z-index: 1;
        }

        .status-progress::after {
          content: '';
          position: absolute;
          top: 25px;
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

        .step-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 18px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .status-step.active .step-circle {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .status-step p {
          margin: 0;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .status-step.active p {
          color: white;
          text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-content-wrapper {
            padding: 100px 20px 20px;
          }
          
          .super-quick-actions {
            position: static;
            margin-bottom: 20px;
          }
          
          .super-stats-section {
            grid-template-columns: 1fr;
          }
          
          .super-complaints-grid {
            grid-template-columns: 1fr;
          }
          
          .super-charts-container {
            grid-template-columns: 1fr;
          }
          
          .chart-card-glow {
            height: 350px;
          }
          
          .progress-tracker-section {
            height: 350px;
            padding: 30px;
          }
          
          .section-header-glow {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .status-progress {
            flex-direction: column;
            gap: 40px;
          }

          .status-progress::before,
          .status-progress::after {
            width: 4px;
            height: 66%;
            top: 0;
            left: 25px;
          }

          .status-step {
            flex-direction: row;
            gap: 20px;
          }

          .step-circle {
            margin-bottom: 0;
          }
        }

        @media (max-width: 480px) {
          .chart-card-glow {
            height: 300px;
            padding: 20px;
          }
          
          .progress-tracker-section {
            height: 300px;
            padding: 20px;
          }
          
          .chart-wrapper {
            height: 250px;
          }
          
          .step-circle {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
        }



.stat-card-glow.progress {
  background: linear-gradient(135deg, rgba(17, 138, 178, 0.2), rgba(102, 126, 234, 0.2));
  min-height: 240px; /* ensure the card has enough height */
   text-align: 50px;
}

.stat-card-glow .stat-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /* make it expand fully */
    justify-self: center;

 }

  .status-badge-glow {
   position: absolute;
   top: 15px;
   right: 15px;
   z-index: 3;
   padding: 8px 16px;
   border-radius: 20px;
   font-size: 12px;
   font-weight: 700;
   text-transform: uppercase;
 }


      `}</style>
    </div>
  )
}

export default Page