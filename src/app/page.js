import React from 'react'
 import { useEffect,useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from 'next-auth/react';
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useRef } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { BarChart, Bar } from "recharts";
import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import { useRouter } from 'next/navigation';
 import { Card, Button, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Srtr from './sidev/srtr';
// import { values } from 'lodash';
// import { useSVGOverlay } from 'react-leaflet/lib/SVGOverlay';

const Page = () => {
    const { data: session } = useSession();
    const first = useRef()
    const [scrolled, setScrolled] = useState(false);
    const [users, setUsers] = useState([]); 
    const [show, set] = useState(false);
    const [w, s] = useState(null);
    const [se, ses] = useState([0,8]);
    const [y, Us] = useState([]);
    const [use, sets] = useState([]);
    const [search, setSearch] = useState("");
    const[p,sp] = useState(0);
    const[pr,spr] = useState(0);
    const[r,sr] = useState(0);
    const[grf,sgrf]  = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false);
        const[brf,sbrf]  = useState([])
const[shk,ssh] = useState("")
    useEffect(() => {
        fetchUsers();
    }, [session?.user?.email])

    const data = [
        { name: 'Jan', value: 30 },
        { name: 'Feb', value: 45 },
        { name: 'Mar', value: 60 },
        { name: 'Apr', value: 50 },
        { name: 'May', value: 70 },
        { name: 'Jun', value: 65 },
    ];
    console.log("ENV CHECK", {
  id: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_CLIENT_SECRET,
  nextauth: process.env.NEXTAUTH_SECRET,
});
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

    const COLORS = ["#00e5ff", "#00ff8c", "#ff6b35"];
    
    const fetchUsers = async () => {
        console.log("backend",process.env.NEXT_PUBLIC_BACKEND)
        ssh("Loading Your Data....")
        if (session?.user?.email) {
            console.log("Fetching users...")
            console.log(session?.user?.email)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/complaint/users?email=${session?.user?.email}`);
            const data = await res.json();
            if(!data.length){ 
                ssh("Not found Any Report....")
                return;
            } 
            if(data.length){
                ssh("");
            }
            console.log(data)
            setUsers(data?.slice(0,8))
            sets(data)
            let fil = data.filter((item)=>item.status==="Pending");
            console.log(fil.length)
            sp(fil.length)
                let fil1 = data.filter((item)=>item.status==="In Progress");
            console.log(fil1.length)
            spr(fil1.length)
                let fil2 = data.filter((item)=>item.status==="Resolved");
            console.log(fil2.length)
            sr(fil2.length)
           let f = {};
            let d = data.reduce((acc, items) => {
            f[items.branch] = (f[items.branch] || 0) + 1;
            return acc;
        }, {})
        const formattedDa = Object.keys(f).map(key => ({
            name: key,
            value: f[key]
        }));
        console.log(formattedDa)
        sgrf(formattedDa)

        const counts = data.reduce((acc, item) => {
      acc[item.complaint] = (acc[item.complaint] || 0) + 1;
      return acc;
    }, {});
    
    const formattedData = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
    sbrf(formattedData)
    console.log(formattedData)
        }
    }

    const sh = (e, i) => {
        s(i)
        set(true)
    }

    const re = () => {
        set(false)
    }

    useEffect(() => {
        //  const formattedD = Object.keys(v).map(key => ({
        //     Name: key,
        //     value: v[key]
        // }));
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
    }, []);

    const sea = () => {
        if(search === "") return;
        
        const filteredUsers = use.filter((item) => {
            const searchText = search.toLowerCase();
            return (
                item.name?.toLowerCase().includes(searchText) ||    
                item.branch?.toLowerCase().includes(searchText) ||  
                item.status?.toLowerCase().includes(searchText) || 
                item.complaint?.toLowerCase().includes(searchText) ||  
                item.location?.toLowerCase().includes(searchText) ||
                 item._id?.toLowerCase().includes(searchText)
            );
        });
        setUsers(filteredUsers)
    }

    const media = [
        { type: "video", src: "/video/kr.mp4", title: "Garbage Collection" },
        { type: "video", src: "/video/ky.mp4", title: "Water Supply Problem" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: true,
        fade: true,
    };

    const dta = [
        { title: "Pending", value: p },
        { title: "In Progress", value: pr },
        { title: "Resolved", value:r },
    ];

    useEffect(() => {
        let i = use.length;
        let v = 1;
        let temp = [];
        while (i > 0) {
            if (i >= 8) {
                i = i - 8;
                temp.push(v)
                v++;
            } else {
                temp.push(v)
                i = 0;
            }
        }
        Us(temp)
    }, [users])

    const des = () => {
        if(se[0] === 0) return;
        setUsers(use.slice(se[0]-8, se[1]-8))
        ses([se[0]-8, se[1]-8])
    }

    const inc = () => {
        if(se[1] > use.length) return;
        setUsers(use.slice(se[0]+8, se[1]+8))
        ses([se[0]+8, se[1]+8])
    }

    const nc = (e, i) => {
        setUsers(use.slice(i*8, i*8+8))
        ses([i*8, i*8+8])
    }

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearch(val);
        if (val === "") {
            setUsers(use.slice(0,8));
        }
    }
     const bh = ()=>{
console.log("hello")
     }

    return (
        <div className="premium-dashboard">  
             <div className="premium-main-content">
                <Srtr/>
                 <div className="premium-content-area">
                     <div className="premium-carousel-container">
                        <Slider {...settings} className="premium-slider">
                            {media.map((item, index) => (
                                <div key={index} className="carousel-slide">
                                    {item.type === "video" && (
                                        <video
                                            src={item.src}
                                            autoPlay
                                            loop
                                            muted
                                            className="carousel-media"
                                        />
                                    )}
                                    <div className="carousel-overlay">
                                        <div className="user-welcome">
                                            <img 
                                                src={session?.user?.image} 
                                                alt="User" 
                                                className="user-avatar"
                                            />
                                            <div className="welcome-text">
                                                <h3>Welcome back, {use[0]?.name || 'User'}!</h3>
                                                <p>Here's your complaint performance overview</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-caption">
                                        {item.title}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                     <div className="premium-stats-grid">
                        {dta.map((item, index) => (
                            <div key={index} className="stat-card-premium">
                                <div className="stat-glow"></div>
                                <h4>{item.title}</h4>
                                <div className="stat-value">{item.value}</div>
                             </div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="premium-charts-section">
                        <div className="chart-container-premium">
                            <h3 className="chart-title">Your Complaint Trends By Branch</h3>
                            <ResponsiveContainer width="100%" height="80%">
                                <AreaChart data={grf}>
                                    <defs>
                                        <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#00e5ff" stopOpacity={0.1}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#00e5ff" />
                                    <YAxis stroke="#00e5ff" />
                                    
                                      <Tooltip
                                                                            formatter={(value) => ["Count", `${value}`]}
                                                                            labelFormatter={(label) => `City: ${label}`}
                                                                            contentStyle={{ backgroundColor: '#1e293b', color: '#fff', border: '1px solid var(--glass-border)' }}
                                                                        />
                                    <Area 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke="#00e5ff" 
                                        fillOpacity={1} 
                                        fill="url(#premiumGradient)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="chart-container-premium">
                            <h3 className="chart-title">Your Complaints Types</h3>
                           <div style={{ width: "100%", height: "300px" }}>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={brf}>
      <XAxis dataKey="name" stroke="#00ff8c" />
      <YAxis stroke="#00ff8c" />

      <Tooltip
        formatter={(value) => [`${value}`, "Count"]}
        labelFormatter={(label) => `City: ${label}`}
        contentStyle={{
          backgroundColor: "#1e293b",
          color: "#fff",
          border: "1px solid var(--glass-border)",
        }}
      />

      <Bar
        dataKey="value"
        fill="#00ff8c"
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>
                        </div>
                    </div>
 
                    <div className="premium-reports-section">
                        <div className="section-header">
                            <h2>Your Complaint Reports</h2>
                            <div className="search-controls">
                                <input 
                                    value={search} 
                                    onChange={handleSearch}
                                    className="premium-search-field"
                                    type="text" 
                                    placeholder="Search reports..."
                                />
                                <Button onClick={sea} className="premium-search-action">
                                    🔍 Search
                                </Button>
                            </div>
 
                         </div>
 
                          <div className="premium-table-container">

                         { shk=="" && <Table responsive className="premium-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Branch</th>
                                        <th>Id</th>
                                        <th>Complaint</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((items, i) => (
                                        <tr key={i} className="premium-table-row">
                                            <td className="user-cell">
                                                <img 
                                                    src={session?.user?.image} 
                                                    alt="User" 
                                                    className="table-avatar"
                                                />
                                                {items.name}
                                            </td>
                                            <td>{items.branch}</td>
                                            <td>
                                                <span className="location-pin"></span>
                                                {items._id}
                                            </td>
                                            <td className="complaint-cell">{items.complaint}</td>
                                            <td>
                                                <span className={`status-badge status-${items.status?.toLowerCase()}`}>
                                                    {items.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>}
                 {shk!=="" && <><div className="prirfn16" >{shk}</div></>}

                        </div>
                                                { shk=="" && <div className="premium-pagination">
                            <Pagination>
                                <Pagination.First onClick={des} className="pagination-btn" />
                                {y.map((item, i) => (
                                    <Pagination.Item 
                                        key={i} 
                                        onClick={(e) => nc(e, i)}
                                        className="pagination-btn"
                                    >
                                        {item}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Last onClick={inc} className="pagination-btn" />
                            </Pagination>
                        </div>}
                    </div>
                </div>
            </div>
             <style jsx>{`
                .premium-dashboard {
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
                    min-height: 100vh;
                    color: #ffffff;
                    overflow-x: hidden;
                }

                /* Premium Navbar Styles */
                .premium-navbar {
                    background: rgba(10, 10, 10, 0.95) !important;
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(0, 229, 255, 0.2);
                    padding: 15px 0;
                    transition: all 0.3s ease;
                }

                .premium-navbar.scrolled {
                    background: rgba(0, 0, 0, 0.98) !important;
                    box-shadow: 0 4px 30px rgba(0, 229, 255, 0.1);
                }

                .premium-brand {
                    font-size: 1.8rem;
                    font-weight: 800;
                    background: linear-gradient(90deg, #00e5ff, #00ff8c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    position: relative;
                    padding: 10px 20px;
                }

                .brand-glow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at center, rgba(0, 229, 255, 0.2), transparent 70%);
                    border-radius: 10px;
                    animation: pulse 2s infinite;
                }

                .premium-nav-links .nav-link {
                    color: #ffffff !important;
                    font-weight: 600;
                    margin: 0 10px;
                    padding: 10px 20px !important;
                    border-radius: 25px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .nav-link-glow:hover {
                    background: rgba(0, 229, 255, 0.1);
                    color: #00e5ff !important;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 229, 255, 0.3);
                }

                .premium-search {
                    gap: 15px;
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

                .premium-search-input {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(0, 229, 255, 0.3) !important;
                    color: white !important;
                    border-radius: 25px;
                    padding: 10px 20px;
                    backdrop-filter: blur(10px);
                }

                .premium-search-input:focus {
                    background: rgba(255, 255, 255, 0.15) !important;
                    border-color: #00e5ff !important;
                    box-shadow: 0 0 20px rgba(0, 229, 255, 0.3) !important;
                }

                .premium-search-btn, .premium-signout-btn {
                    border-radius: 25px;
                    padding: 10px 25px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .premium-search-btn {
                    background: transparent;
                    border: 1px solid #00e5ff;
                    color: #00e5ff;
                    margin-left: 10px;
                }

                .premium-search-btn:hover {
                    background: #00e5ff;
                    color: #000;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 229, 255, 0.4);
                }

                .premium-signout-btn {
                    background: linear-gradient(135deg, #ff6b35, #ff3860);
                    border: none;
                    color: white;
                }

                .premium-signout-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
                }

                /* Premium Sidebar */
                .premium-sidebar {
                    width: 280px;
                    background: linear-gradient(180deg, #111111 0%, #0a0a0a 100%);
                    border-right: 1px solid rgba(0, 229, 255, 0.1);
                    padding: 30px 20px;
                    height: 100vh;
                    position: fixed;
                    left: 0;
                    top: 0;
                    overflow-y: auto;
                }

                .sidebar-header {
                    text-align: center;
                    margin-bottom: 40px;
                    position: relative;
                }

                .sidebar-header h3 {
                    color: #00e5ff;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .sidebar-glow {
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #00e5ff, transparent);
                    margin-top: 10px;
                }

                .sidebar-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .sidebar-link {
                    display: flex;
                    align-items: center;
                    padding: 15px 20px;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .sidebar-link:hover {
                    background: rgba(0, 229, 255, 0.1);
                    color: #00e5ff;
                    transform: translateX(10px);
                }

                .link-icon {
                    font-size: 1.2rem;
                    margin-right: 15px;
                }

                .link-text {
                    font-weight: 600;
                }

                .link-glow {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.2), transparent);
                    transition: left 0.5s;
                }

                .sidebar-link:hover .link-glow {
                    left: 100%;
                }

                .sidebar-footer {
                    margin-top: 40px;
                    padding: 20px 0;
                }

                .premium-signout-sidebar {
                    width: 100%;
                    background: linear-gradient(135deg, #ff6b35, #ff3860);
                    border: none;
                    border-radius: 12px;
                    padding: 12px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .premium-signout-sidebar:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
                }

                /* Main Content Area */
                .premium-main-content {
                    margin-left: 280px;
                 }

                .premium-content-area {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                /* Premium Carousel */
                .premium-carousel-container {
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    margin-bottom: 40px;
                }

                .carousel-slide {
                    position: relative;
                    height: 500px;
                }

                .carousel-media {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .carousel-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .user-welcome {
                    text-align: center;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    padding: 30px;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .user-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 3px solid #00e5ff;
                    margin-bottom: 15px;
                }

                .welcome-text h3 {
                    color: #00e5ff;
                    margin-bottom: 10px;
                }

                .welcome-text p {
                    color: #ffffff;
                    opacity: 0.8;
                }

                .carousel-caption {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    background: rgba(0, 0, 0, 0.7);
                    color: #00e5ff;
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-weight: 600;
                }

                /* Stats Grid */
                .premium-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 25px;
                    margin-bottom: 40px;
                }

                .stat-card-premium {
                    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                    padding: 30px;
                    border-radius: 15px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(0, 229, 255, 0.1);
                    transition: all 0.3s ease;
                }

                .stat-card-premium:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 229, 255, 0.2);
                    border-color: rgba(0, 229, 255, 0.3);
                }

                .stat-glow {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .stat-card-premium:hover .stat-glow {
                    opacity: 1;
                }

                .stat-card-premium h4 {
                    color: #ffffff;
                    margin-bottom: 15px;
                    font-weight: 600;
                }

                .stat-value {
                    font-size: 2.5rem;
                    font-weight: 800;
                    background: linear-gradient(90deg, #00e5ff, #00ff8c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 10px;
                }

                .stat-trend {
                    color: #00ff8c;
                    font-weight: 600;
                }

                /* Charts Section */
                .premium-charts-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
                    gap: 30px;
                    margin-bottom: 40px;
                }

                .chart-container-premium {
                    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                    padding: 25px;
                    border-radius: 15px;
                    border: 1px solid rgba(0, 229, 255, 0.1);
                    height: 350px;
                }

                .chart-title {
                    color: #00e5ff;
                    margin-bottom: 20px;
                    font-weight: 700;
                    text-align: center;
                }

                /* Quick Stats */
                .premium-quick-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 40px;
                }

                .quick-stat-card {
                    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                    padding: 25px;
                    border-radius: 15px;
                    text-align: center;
                    border: 1px solid rgba(0, 229, 255, 0.1);
                    transition: all 0.3s ease;
                }

                .quick-stat-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0, 229, 255, 0.2);
                }

                .stat-icon {
                    font-size: 2rem;
                    margin-bottom: 15px;
                }

                .quick-stat-card h4 {
                    color: #ffffff;
                    margin-bottom: 10px;
                    font-weight: 600;
                }

                .stat-number {
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: #00e5ff;
                    margin-bottom: 10px;
                }

                .stat-progress {
                    background: rgba(255, 255, 255, 0.1);
                    height: 6px;
                    border-radius: 3px;
                    overflow: hidden;
                }

                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #00e5ff, #00ff8c);
                    border-radius: 3px;
                    transition: width 0.3s ease;
                }

                /* Reports Section */
                .premium-reports-section {
                    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                    padding: 30px;
                    border-radius: 20px;
                    border: 1px solid rgba(0, 229, 255, 0.1);
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .section-header h2 {
                    color: #00e5ff;
                    font-weight: 700;
                }

                .search-controls {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                }

                .premium-search-field {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(0, 229, 255, 0.3);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 25px;
                    min-width: 250px;
                }

                .premium-search-field:focus {
                    outline: none;
                    border-color: #00e5ff;
                    box-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
                }

                .premium-search-action {
                    background: linear-gradient(135deg, #00e5ff, #00ff8c);
                    border: none;
                    border-radius: 25px;
                    padding: 12px 25px;
                    font-weight: 600;
                    color: #000;
                }

                // /* Premium Table */
                // .premium-table-container {
                //     border-radius: 15px;
                //     overflow: hidden;
                //     background: rgba(0, 0, 0, 0.3);
                // }

                // .premium-table {
                //     margin: 0;
                //     color: #ffffff;
                // }


       
                // .premium-table thead th {
                //     background: linear-gradient(135deg, #3ee6f5ff, #00ff8c) !important;
                //     color: #000 !important;
                //     border: none;
                //     padding: 20px;
                //     font-weight: 700;
                //     text-align: center;
                // }

                // .premium-table tbody td {
                //     background: rgba(255, 255, 255, 0.1) !important;
                //     // border-color: rgba(255, 255, 255, 0.1);
                //     padding: 15px 20px;
                //     vertical-align: middle;
                // }

                // .premium-table-row:hover td {
                //     background: rgba(0, 229, 255, 0.1) !important;
                //      transition: all 0.5s ease;
                //     color:white;
                // }

                // .user-cell {
                //     display: flex;
                //     align-items: center;
                //     gap: 10px;
                //     font-weight: 600;
                // }

                .table-avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    border: 2px solid #00e5ff;
                }

                // .location-pin {
                //     color: #ff6b35;
                //     margin-right: 5px;
                // }

                // .complaint-cell {
                //     max-width: 200px;
                //     overflow: hidden;
                //     text-overflow: ellipsis;
                //     white-space: nowrap;
                // }

                // .status-badge {
                //     padding: 8px 16px;
                //     border-radius: 20px;
                //     font-weight: 700;
                //     font-size: 0.8rem;
                //     text-transform: uppercase;
                // }

                // .status-pending {
                //     background: linear-gradient(135deg, #ff6b35, #ff3860);
                //     color: white;
                // }

                // .status-in-progress {
                //     background: linear-gradient(135deg, #00e5ff, #0099cc);
                //     color: white;
                // }

                // .status-resolved {
                //     background: linear-gradient(135deg, #00ff8c, #00cc66);
                //     color: white;
                // }



/* Premium Table - Fixed for Mobile */
.premium-table-container {
    border-radius: 15px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
}

.premium-table {
    margin: 0;
    color: #ffffff !important; /* Important to override Bootstrap */
    width: 100%;
    border-collapse: collapse;
}

/* Fix for Bootstrap responsive table text color */
.premium-table * {
    color: #ffffff !important;
}

/* Table header */
.premium-table thead th {
    background: linear-gradient(135deg, #3ee6f5, #00ff8c) !important;
    color: #000000 !important; /* Keep header text black for contrast */
    border: none !important;
    padding: 20px;
    font-weight: 700;
    text-align: center;
    font-size: 1rem;
     color: #000 !important;
}

/* Table body cells */
.premium-table tbody td {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    padding: 15px 20px;
    vertical-align: middle;
    color: #ffffff !important;
}

/* Hover effect */
.premium-table-row:hover td {
    background: rgba(0, 229, 255, 0.2) !important;
    // transform: scale(1.02);
    transition: all 0.3s ease;
    color: #ffffff !important;
}

/* Individual cell styles */
.user-cell {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
 color: #000 !important;
 }

.branch-cell, 
.location-cell, 
.complaint-cell, 
.status-cell {
    color: #ffffff !important;
    vertical-align: middle;
}

.table-avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px solid #00e5ff;
}

.location-pin {
    color: #ff6b35 !important;
    margin-right: 5px;
    font-size: 0.9rem;
}

.complaint-cell {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
     color: #000 !important;
 }

.status-badge {
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    min-width: 100px;
}

.status-pending {
    background: linear-gradient(135deg, #ff6b35, #ff3860);
    color: white !important;
}

.status-in-progress {
    background: linear-gradient(135deg, #00e5ff, #0099cc);
    color: white !important;
}

.status-resolved {
    background: linear-gradient(135deg, #00ff8c, #00cc66);
    color: white !important;
}

/* Mobile-specific fixes */
@media (max-width: 768px) {
    .premium-table-container {
        border-radius: 10px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    
    .premium-table {
        min-width: 600px; /* Ensure table doesn't get too small */
        color: black;
    }
    
    .premium-table thead th {
        padding: 15px 10px;
        font-size: 0.9rem;
    }
    
    .premium-table tbody td {
        padding: 12px 10px;
        font-size: 0.9rem;
    }
    
    .user-cell {
        flex-direction: column;
        gap: 15px;
        text-align: center;
        color: #000 !important;
        width:150px;
    }
    
    .table-avatar {
        width: 30px;
        height: 30px;
    }
    
    .complaint-cell {
        max-width: 150px;
     }
    
    .status-badge {
        padding: 6px 12px;
        font-size: 0.7rem;
        min-width: 80px;
    }
}

/* Extra small devices */
@media (max-width: 480px) {
    .premium-table thead th {
        padding: 12px 8px;
        font-size: 0.8rem;
    }
    
    .premium-table tbody td {
        padding: 10px 8px;
        font-size: 0.8rem;
    }
    
    .status-badge {
        padding: 4px 8px;
        font-size: 0.65rem;
        min-width: 70px;
    }
}

/* Fix for Bootstrap table-responsive class */
.table-responsive .premium-table {
    color: #ffffff !important;
}

.table-responsive .premium-table th,
.table-responsive .premium-table td {
    color: #ffffff !important;
}

/* Ensure text remains visible in all states */
.premium-table tbody tr:nth-child(even) td {
    background: rgba(255, 255, 255, 0.05) !important;
    color: #ffffff !important;
}

.premium-table tbody tr:nth-child(odd) td {
    background: rgba(255, 255, 255, 0.1) !important;
    color: #ffffff !important;
}



                /* Pagination */
                .premium-pagination {
                    display: flex;
                    justify-content: center;
                    margin-top: 30px;
                }

                .pagination-btn {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(0, 229, 255, 0.3) !important;
                    color: #ffffff !important;
                    margin: 0 5px;
                    border-radius: 10px !important;
                    transition: all 0.3s ease;
                }

                .pagination-btn:hover {
                    background: rgba(0, 229, 255, 0.2) !important;
                    border-color: #00e5ff !important;
                    transform: translateY(-2px);
                }

                /* Animations */
                @keyframes pulse {
                    0% { opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { opacity: 0.5; }
                }

                /* Responsive Design */
                @media (max-width: 1200px) {
                    .premium-sidebar {
                        width: 250px;
                    }
                    .premium-main-content {
                        margin-left: 250px;
                    }
                    .premium-charts-section {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .premium-sidebar {
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }
                    .premium-main-content {
                        margin-left: 0;
                    padding: 100px 15px 15px;
                    width: 100%;
                    overflow-x: hidden;
                    position: relative;
                    left: 0;
                        transition: left 0.3s ease;
                    }
                    .section-header {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .search-controls {
                        justify-content: center;
                    }
                    .premium-search-field {
                        min-width: auto;
                        width: 100%;
                    }
                }

                /* Scrollbar Styling */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #1a1a1a;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #00e5ff, #00ff8c);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #00ff8c, #00e5ff);
                }
            `}</style>
        </div>
    )
}

export default Page
