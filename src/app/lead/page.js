"use client"
import React from 'react'
import Na from "../cf/na";
import { useEffect,useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useSession } from 'next-auth/react'
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useRef } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { BarChart, Bar } from "recharts";
import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import { useRouter } from 'next/navigation';
import { startSession } from 'mongoose';
 import { Card, Button, Row, Col } from 'react-bootstrap';
 import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const page = () => {
    const first = useRef()
      const [scrolled, setScrolled] = useState(false);
      const [users, setUsers] = useState([]);
      const{data:session} = useSession();
          const [show, set] = useState(false);
                    const [w, s] = useState(null);
                         const [se, ses] = useState([0,8]);
                    
   const [y, Us] = useState([]);

      const [use, sets] = useState([]);
           const [search, setSearch] = useState("");
      

    useEffect(() => {
     fetchUsers();
    }, [session])
   

    const data = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 60 },
    { name: 'Apr', value: 50 },
    { name: 'May', value: 70 },
    { name: 'Jun', value: 65 },
  ];

//     const da = [
//     { name: "Rohit", points: 75 },
//     { name: "Priya", points: 40 },
//     { name: "Aman", points: 90 },
//     { name: "Sneha", points: 55 },
//     { name: "Arjun", points: 30 },
//   ];

// const data = [
//   { name: "Plastic Saved", value: 120 },
//   { name: "E-Waste Saved", value: 40 },
//   { name: "CO₂ Saved", value: 60 }
// ];
 
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
      const fetchUsers = async () => {
      if (session?.user?.email) {
        console.log("fuck")
        console.log(session?.user?.email)
        const res = await fetch(`http://localhost:5000/users?email=${session?.user?.email}`);
        const data = await res.json();
        // console.log(data);
                setUsers(data?.slice(0,8))
        sets(data)
  }
}
const sh=(e,i)=>{
 s(i)
 set(true)
}
const re=()=>{
    set(false)
}
// setTimeout(() => {
//  set(false)
// },6000);

useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      console.log(1)
     };

    window.addEventListener("scroll", handleScroll);
  }, []);

  const sea = ()=>{
  if(search==""){
    return
  }
  const filteredUsers = use.filter((item) => {
  const searchText = search.toLowerCase();
  return (
    item.name?.toLowerCase().includes(searchText) ||    
    item.branch?.toLowerCase().includes(searchText) ||  
    item.status?.toLowerCase().includes(searchText) || 
    item.complaint?.toLowerCase().includes(searchText)||  
    item.location?.toLowerCase().includes(searchText) 
  );
});
// console.log("filter",filteredUsers)
setUsers(filteredUsers)
console.log(search)
}

  const media = [
    // { type: "image", src: "/images/image1.jpg", title: "City Roads Issue" },
    { type: "video", src: "/video/kr.mp4", title: "Garbage Collection" },
    // { type: "image", src: "/images/image2.jpg", title: "Street Lights" },
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
    fade: true, // smooth fade effect
  };


  const dta = [
    { title: "Pending", value: 120 },
    { title: "In Pogress", value: 235 },
    { title: "Resolved", value: 455 },
  ];

  useEffect(() => {
    let i = use.length;
let v = 1;
let temp =[];
while (i > 0) {
  if (i >= 8) {
    console.log("this is i", i);
    console.log(v);
     i = i - 8;
temp.push(v)
         v++;
  } else {
    console.log("this is i", i);
    console.log(v);
    temp.push(v)
    i = 0;
   }
}
   Us(temp)
  }, [users])
  

  const des =()=>{
if(se[0]==0){
  return;
}
setUsers(use.slice(se[0]-8,se[1]-8))
ses([se[0]-8,se[1]-8])
}
const inc =()=>{
if(se[1]>use.length){
  return;
}
setUsers(use.slice(se[0]+8,se[1]+8))
ses([se[0]+8,se[1]+8])
}
 const nc = (e,i)=>{
     console.log(i)
     setUsers(use.slice(i*8,i*8+8))
     ses([i*8,i*8+8])
      }
      console.log(use)

      const handleSearch = (e) => {
  const val = e.target.value;
  setSearch(val);

  if (val === "") {
     setUsers(use.slice(0,8));
  } 
}
     return (
    <>

 <Navbar style={{backgroundColor:'pink'}}  className={scrolled ? " scrolled" : "navbar"} fixed="top" expand="lg">
      <Container fluid>
        {/* Brand with animation */}
        <Navbar.Brand href="#" className="brand-animate">
          🚀 Civic Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 nav-links" navbarScroll>
            <Nav.Link href="#home" className="nav-animate">Home</Nav.Link>
            <Nav.Link href="#features" className="nav-animate">Features</Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown" className="nav-animate">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#disabled" disabled className="nav-animate">
              Disabled
            </Nav.Link>
          </Nav>

          {/* Animated Search */}
          <Form   className="d-flex search-animate">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2"
              aria-label="Search"
            />
            <Button className='bt2' variant="outline-light">🔍</Button>
            <Button className='bt1'>Sign Out</Button>

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>




  <div style={{ maxWidth: "2000px", margin: "70px auto", borderRadius: "15px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}>
       <Slider {...settings}>
        {media.map((item, index) => (
          <div key={index} style={{ position: "relative" }}>
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.title}
                style={{ width: "100%", height: "500px", objectFit: "cover" }}
              />
            ) : (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                style={{ width: "100%", height: "500px", objectFit: "cover",marginLeft:'16%', }}
              />
            )}
             <div style={{
          position: "absolute",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontSize: "25px",
          fontWeight: "bold",
          textAlign: "center",
            background: "rgba(1, 1, 1, 0.4)",
           backdropFilter: "blur(8px)",
           borderRadius:'10px' 
         }}>
<div style={{padding:'20px'}}> 
         <div>
          <img style={{justifySelf:'center',width:'80px',height:'80px',borderRadius:'40px'}} src={session?.user?.image} alt="" />
          </div> 
          <div>
            Hi,{use[0]?.name}
          </div>
</div>
        </div>
            <div style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "18px"
            }}>
            {item.title}
             </div>
          </div>
        ))}
      </Slider>
    </div>


<div className='col'> 




<div>
      {/* Sidebar */}
      <div
        style={{
          height: "100%",
          width: "300px",
          position: "fixed",
          top: 0,
          left: 0,
          // backgroundColor: "#111",
          overflowX: "hidden",
          paddingTop: "10px",
          zIndex: "1000",
          padding:'30px',
        background: "linear-gradient(135deg, #121213ff, #651dc4ff)", // mst light background
         overflowY: "scroll",      // content scrollable
      scrollbarWidth: "none",   // Firefox
       msOverflowStyle: "none",  
        }}
      >
        <h2>Menu</h2>
        {/* Links */}
        <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
          🏠 Home
        </a>
        <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
          📄 About
        </a>
        <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
          🛠 Services
        </a>
        <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
          📞 Contact
        </a>

        <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
          Report
        </a>

 <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
           Notification
        </a>

         <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
        Status
        </a>

         <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
        Message
        </a>

         <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
        Worker
        </a>
<br style={{backgroundColor:'white'}}/>
         <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
        Profile
        </a>
         <a className='a1'
          href="#"
          style={{
            padding: "10px 20px",
            display: "block",
            fontSize: "22px",
            color: "#f1f1f1",
            textDecoration: "none"
          }}
        >
        Sign Out
        </a>
      </div>

      {/* Main content (right side shift) */}
      
    </div>





<div className='sho'> 

<div style={{width:'750px',marginLeft:'0px',position:'absolute',color:'white'}} className="flex justify-center items-center h-screen bg-gray-900">
      <h1 className="typing text-4xl font-bold text-pink-400">
        Welcome to your Dashboard
      </h1>
      <h3>your complaint performance overview</h3>
    </div>

 <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        // background: "linear-gradient(135deg, #070707ff, #060605ff)", // mst light background
        borderRadius: "15px",
        padding: "20px",
        // boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        maxWidth: "1200px",
        margin: "-40px 700px",   
      }}>
      {dta.map((item, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "20px",
            borderRight: index !== data.length - 1 ? "1px solid rgba(216, 192, 192, 0.1)" : "none",
            width:'200px'
          }}
      >
          <h3 style={{ margin: "0", fontSize: "20px", color: "#f4f3f3ff" }}>{item.title}</h3>
          <p style={{ margin: "10px 0 0", fontSize: "54px", fontWeight: "bold", color: "#d35400" }}>
            {item.value}
          </p>
        </div>
       ))}
    </div>


</div>
 


<div className='grf' style={{
    display: 'flex',
    gap: '40px',
    flexWrap: 'nowrap',   // important: wrap na ho
    overflowX: 'auto',    // agar screen chhoti ho to scroll mile
    padding: '20px',
    marginLeft:'290px'
    // justifySelf:'center'
    }}
>
  {/* पहला graph */}
  <div style={{
        width: '480px',
        height: '330px',
        background: 'linear-gradient(145deg, #191819ff, #313135ff)',
        borderRadius: '15px',
        boxShadow: '8px 8px 20px rgba(87, 21, 253, 0.5)',
        padding: '15px'
      }}>
        <h3 style={{ textAlign: 'center', color: '#d63384', marginBottom: '10px' }}>Area Graph</h3>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff99cc" stopOpacity={0.7}/>
                <stop offset="95%" stopColor="#ff99cc" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fill: '#d63384' }} />
            <YAxis tick={{ fill: '#d63384' }} />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#d63384" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
  </div>

  {/* दूसरा graph */}
  <div style={{
        width: '480px',
        height: '330px',
        background: 'linear-gradient(145deg, #191819ff, #313135ff)',
        borderRadius: '15px',
        boxShadow: '8px 8px 20px rgba(87, 21, 253, 0.5)',
        padding: '15px'
      }}>
        <h3 style={{ textAlign: 'center', color: '#2e7d32', marginBottom: '10px' }}>Another Graph</h3>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#66bb6a" stopOpacity={0.7}/>
                <stop offset="95%" stopColor="#66bb6a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fill: '#2e7d32' }} />
            <YAxis tick={{ fill: '#2e7d32' }} />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#2e7d32" fillOpacity={1} fill="url(#colorValue2)" />
          </AreaChart>
        </ResponsiveContainer>
  </div>

  {/* तीसरा graph */}
  <div style={{
        width: '480px',
        height: '330px',
        background: 'linear-gradient(145deg, #191819ff, #313135ff)',
        borderRadius: '15px',
        boxShadow: '8px 8px 20px rgba(87, 21, 253, 0.5)',
        padding: '15px'
      }}>
        <h3 style={{ textAlign: 'center', color: '#2e7d32', marginBottom: '10px' }}>Third Graph</h3>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#66bb6a" stopOpacity={0.7}/>
                <stop offset="95%" stopColor="#66bb6a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fill: '#2e7d32' }} />
            <YAxis tick={{ fill: '#2e7d32' }} />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#2e7d32" fillOpacity={1} fill="url(#colorValue3)" />
          </AreaChart>
        </ResponsiveContainer>
  </div>
</div>





<div className="coniner">
      <div className="animated-box">Box 1</div>
      <div className="animated-box">Box 2</div>
      <div className="animated-box">Box 3</div>
      <div className="animated-box">Box 4</div>
    </div>

<div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  // width: '100%',
  padding: '0 20px',
  marginBottom: '20px',
  marginTop:'-300px',
  // gap:"1000px",
  // justifySelf:'center'
    marginLeft:'300px',

}}>
  <h2 style={{ color: '#d63384', fontSize: '1.8rem' }}>Your Reports</h2>
  {/* <h2 style={{ color: '#2e7d32', fontSize: '1.8rem' }}>Unout</h2> */}
  <div>
  <input value={search} onChange={handleSearch} style={{marginRight:'20px', background: 'linear-gradient(145deg, #191819ff, #313135ff)',borderRadius:'10px',fontSize:'20px'}} type="text"  placeholder='search....'/>
            <Button onClick={sea} className='bt2' variant="outline-light">🔍</Button>
  </div>
</div>


 


     <div className='ty5' style={{color:'white'}}>
  <Table responsive="sm">
    <thead>
      <tr>
        <th>Name</th>
        <th>Branch</th>
        <th>Location</th>
        <th>Complaint</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody >
    {users.map((items, i) => (
  <tr
    key={i}
    className='custom-row'
  >
    <td>{items.name}</td>
    <td>{items.branch}</td>
    <td>{items.location}</td>
    <td>{items.complaint}</td>
    <td className="thd">{items.status}</td>
  </tr>
))}
    </tbody>
  </Table>
</div>

<Pagination  style={{ justifySelf: 'center', fontSize:'30px',marginTop:'90px' }}>
        <Pagination.First onClick={des} style={{width:'80px',height:'80px'}} />
 {
 y.map((item,i)=>{
     return (
  <>
       <Pagination.Item  style={{width:'80px',height:'80px'}} onClick={(e)=>nc(e,i)}>{item}</Pagination.Item>    
  </>
     )
 })
 }
       <Pagination.Last onClick={inc} style={{width:'80px',height:'80px'}} />
 </Pagination>

</div>



  {/* {show && w !== null && (<div className='im'><div onClick={re} className='re'>X</div><img  src={`data:image/jpeg;base64,${users[w].image}`}  alt={users[w].name} style={{  borderRadius: "10px" }} /></div> )} */}
  
   {/* <div className='b7'>
        <Na />
      </div> */}


{/* <div className='n4'> 
 <nav className="navbar">
        <div className="navbar-logo">MyWebsite</div>
        <ul className="navbar-links">
          <li>
            <Link href="/cl">Complaint</Link>
          </li>
          <li>
            <Link href="/status">Status</Link>
          </li>
          <li>
            <Link href="/services">leadarboard</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <div className="navbar-search">
          <input className="in" type="text" placeholder="Search..." />
        </div>
      </nav>
      </div>
      <div className='hw' style={{color:'wheat'}}>
      <div   onClick={() => {
    const section = document.getElementById("rt1");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}>go to charts ---</div>
      </div>

 <div id='rt1' style={{ textAlign: "center", marginTop: "30px" }}>
      <h2 style={{ color: "white" }}>Community Impact Chart</h2>
      
      <PieChart width={400} height={400}>
        <Pie data={data}cx="50%" cy="50%" labelLine={false}outerRadius={150} fill="#8884d8" dataKey="value"label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
 


 <div style={{ width: "100%", height: 300, background: "#111", padding: "20px", borderRadius: "12px" }}>
      <h3 style={{ color: "wheat", textAlign: "center", marginBottom: "10px" }}>📊 Leaderboard Progress</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={da}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="points" fill="#22c55e" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

 */}
 {/* </div> */}
     </>
  )
}
export default page
