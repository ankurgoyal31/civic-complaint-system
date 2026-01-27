 'use client'
 import React from 'react'
import { useEffect,useState } from 'react'
 import { Card, Button, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Pagination from 'react-bootstrap/Pagination';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
 const page = () => {
         const router = useRouter();5
   const [users, setUsers] = useState([]);
   const [us, setUs] = useState();
   const [s, Us] = useState([]);
     const [scrolled, setScrolled] = useState(false);
     const [search, setSearch] = useState("");
     const [se, set] = useState([0,12]);

const[p,m] = useState([]);
     const fetchUsers = async () => {
                  const res = await fetch("http://localhost:5000/adm");
                      const data = await res.json();
                     console.log("data - > " +data);
                     setUsers(data)
                       const sorted = data.sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );
// sets(sorted.slice(0, 8));
            setUsers(sorted.slice(0,12));
                     m(sorted)
                 };

                 useEffect(() => {
                   fetchUsers();
                 }, []);
    //   console.log(users)
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

   let i = p.length;
let v = 1;
let temp =[];
while (i > 0) {
  if (i >= 12) {
    console.log("this is i", i);
    console.log(v);
     i = i - 12;
temp.push(v)
         v++;
  } else {
    console.log("this is i", i);
    console.log(v);
    temp.push(v)
    i = 0;

   }
}
  //  console.log(temp)
   Us(temp)
        }, [users]);
      console.log(s);
      
      const nc = (e,i)=>{
     console.log(i)
     setUsers(p.slice(i*12,i*12+12))

//      if(search==""){
//   setUsers(p)
// }

// useEffect(() => {
//  sea() 
//  console.log("call")
// }, [search])
set([i*12,i*12+12])
      }
 const sea = ()=>{
  if(search==""){
    return
  }
     const filteredUsers = p.filter((item) => {
  const searchText = search.toLowerCase();
  return (
    item.name?.toLowerCase().includes(searchText) ||    
    item.branch?.toLowerCase().includes(searchText) ||  
    item.status?.toLowerCase().includes(searchText) || 
    item.complaint?.toLowerCase().includes(searchText)||  
    item.location?.toLowerCase().includes(searchText) ||
    item._id?.toLowerCase().includes(searchText) 
  );
});
// console.log("filter",filteredUsers)
setUsers(filteredUsers)
console.log(search)
}
const handleSearch = (e) => {
  const val = e.target.value;
  setSearch(val);

  if (val === "") {
     setUsers(p.slice(0,12));
  } 
}

      useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      console.log(1)
     };

    window.addEventListener("scroll", handleScroll);
  }, []);

  console.log(se)
const des =()=>{
if(se[0]==0){
  return;
}
setUsers(p.slice(se[0]-12,se[1]-12))
set([se[0]-12,se[1]-12])

}
const inc =()=>{
if(se[1]>p.length){
  return;
}
setUsers(p.slice(se[0]+12,se[1]+12))
set([se[0]+12,se[1]+12])

}
const get = (e,i)=>{
  const index = p.findIndex(item => item._id == users[i]?._id && item.name==users[i]?.name && item.branch==users[i]?.branch && item.userEmail == users[i]?.userEmail && item.complaint==users[i]?.complaint &&  item.location == users[i]?.location);
   router.push(`/info?data=${encodeURIComponent(index)}`);  
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
   return (
    <>

 <Navbar  className={scrolled ? " scrolled" : "navbar"} fixed="top" expand="lg">
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
              placeholder="Search...,Name,Branch,location,comlaint,status"
              className="me-2"
              aria-label="Search"
              value={search}
               onChange={handleSearch}
            />
            <Button onClick={sea} className='bt2' variant="outline-light">🔍</Button>
            <Button className='bt1'>Sign Out</Button>

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>




 <div style={{marginTop:100}} className="premium-sidebar">
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
                </div>




    <div style={{marginTop:'80px'}} className='ep1'> 
           <div className='c1'>
<div  className="container mt-4">
      <Row className="g-3">  {/* g-3 = gap between columns */}
        {users.map((items, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card onClick={(e)=>get(e,index)} className='g1' style={{ width: '80%',borderRadius:'20px',marginTop:'10px'
             }}>
                      <div  className='ds1'>{items.status}</div> 

              <Card.Img style={{height:"200px"}} variant="top" src={`data:image/jpeg;base64,${items.image}`} />
              <Card.Body>
                <Card.Title>{items.complaint}</Card.Title>
                <Card.Text>{items.des}</Card.Text>
                <Button onClick={(e)=>get(e,index)} variant="primary">Go Action</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
<Pagination  style={{ justifySelf: 'center', fontSize:'30px',marginTop:'150px' }}>
        <Pagination.First onClick={des} style={{width:'80px',height:'80px'}} />
 {
 s.map((item,i)=>{
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

      </div>

    </>
  )
}
export default  page             