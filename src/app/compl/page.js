'use client'
export const dynamic = 'force-dynamic'

import React from 'react'
import { useState,useEffect } from 'react'
 import Link from 'next/link'
import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Itim } from 'next/font/google'
import { Card, Button, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signIn, signOut, useSession } from 'next-auth/react';

const Page = () => {
      const searchParams = useSearchParams();
         const [scrolled, setScrolled] = useState(false);
     
  // const ind = parseInt(ite);
  const{data:session, status} = useSession()
   const [first, setfirst] = useState({name:"",event:"",time:"",image:null,location:"",mobile:"",des:"",color:""})
  const[m,n] = useState("")
  const[r,x] = useState(false)
  const [users, setUsers] = useState([]);
 const item = searchParams.get("data");
    const ind = parseInt(item);
  const hand = (e)=>{
    setfirst({...first,[e.target.name]:e.target.value});
  }
  useEffect(() => {
    if(session?.user?.email && item !==null){
      gp(session.user?.email , session.user?.name)
    }
  }, [session])
  const gp = async(p,s)=>{
// let o = await gt(p,s);
// console.log(o[item].name)
      // setfirst({name:o[item].name,event:o[item].event,time:o[item].time,image:o[item].image,location:o[item].location,des:o[item].des,color:o[item].color})
  //  n(o[item]._id);  
     }
    const sho = () => {
     x(true);
  };
  const handleFile = (e) => {
    setfirst({ ...first, image: e.target.files[0] });
  }
// console.log(first)
  //  const ht = ()=>{
  //   x(false)
  // }
        //  <div><b>ComplaintId:</b> {item.complaintId}</div>
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
  const fetchUsers = async () => {
 if (status === "authenticated" && session?.user?.email) {
 const res = await fetch(`http://localhost:5000/users?email=${session?.user?.email}`); 
   const data = await res.json();
    setUsers(data);
      }
  };
 useEffect(() => {
    fetchUsers();
  }, [session?.user?.email]);


  const cre = async (v) => {
    console.log(v)
   const formData = new FormData();
  formData.append("image", first.image);   // file
  formData.append("userEmail", session.user.email);
  formData.append("userName", session.user.name);
    formData.append("location",first.location);
  formData.append("branch", first.event);
  formData.append("name",first.name);
    formData.append("des",first.des);
    formData.append("complaint",first.time);
    formData.append("img",session.user?.image)
      formData.append("mobile", first.mobile);
      formData.append("_id", v);

          alert("fuck")
      if(ind && users){
console.log("fuck->>",users)
       }
  const res = await fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  console.log(data);
  alert("Uploaded successfully!");
};
  useEffect(() => {
    if(item  && users){
  console.log("-> ",ind)
setfirst({name:users[ind]?.name,event:users[ind]?.branch,time:users[ind]?.complaint,image:users[ind]?.image,location:users[ind]?.location,mobile:users[ind]?.mobile,des:users[ind]?.des,color:users[ind]?.color})
    }
  }, [users,item])

  console.log("fuck->>",users)


  return (
    <>
<Navbar className={`premium-navbar ${scrolled ? "scrolled" : ""}`} fixed="top" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#" className="premium-brand">
                        <div className="brand-glow"></div>
                        {/* 🚀 Civic Solutions */}
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" className="premium-toggle" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 premium-nav-links" navbarScroll>
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


     <div  className='x1'> 
      <div className='x2'> 
          {session && <div className='s9'><img className='f3' src={session.user.image} alt="" /></div>}
          {session && <div className='s0'>welcome, {session.user.name}</div>}
 </div>
 <div className='p1'> 
    <div><input name='name' value={first.name} onChange={hand} type="text" placeholder='ENTER PERSON NAME' /></div>
    <div><input name='event' value={first.event} onChange={hand} type="text" placeholder='ENTER YOUR BRANCH' /></div>
    <div><input name='time' value={first.time} onChange={hand} type="text" placeholder='ENTER COMPLAIAINT' /></div>
      <div style={{backgroundColor:'brown',color:'black'}}><input type="file" accept="image/*" onChange={handleFile} /></div> 
    <div ><input name='location' value={first.location} onChange={hand} type="text" placeholder='ENTER  LOCATION' /></div>
        <div><input name='mobile' value={first.mobile} onChange={hand} type="text" placeholder='ENTER  MOBILE' /></div>

<div><textarea name='des' value={first.des} onChange={hand} placeholder='ABOUT THE COMPLAINT'></textarea></div>
    <div><input name='color' value={first.color} onChange={hand} type="text" placeholder='ENTER CARD COLOR' /></div>
{/* <div className='p0' onClick={cre}><Link href='/dash/' style={{textDecoration:'none'}} >CREATE</Link> </div> */}
{!item &&<div className='p0' style={{backgroundColor:'red'}} onClick={cre}> CREATE </div>}
{item &&<div onClick={()=>cre(users[ind]?._id)} className='p0' style={{backgroundColor:'red'}}>{users[ind]?._id} EDIT </div>}

</div>
</div>
{/* <div>
      <h2>All Users Images</h2>
      {users.map((user, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <p>{user.userName} ({user.userEmail})</p>
          {user.image && (
            <img
              src={`data:image/jpeg;base64,${user.image}`}
              alt={user.userName}
              style={{ width: "150px", borderRadius: "10px" }}
            />
          )}
        </div>
      ))}
    </div> */}
     </>
  )


}
export default Page


 
 

//  'use client'

// import React, { Suspense, useState, useEffect, useRef } from 'react'
// import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'
// import { signIn, signOut, useSession } from 'next-auth/react'
// import { Card, Button, Row, Col } from 'react-bootstrap'
// import Container from 'react-bootstrap/Container'
// import Form from 'react-bootstrap/Form'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'

// /* =========================
//    PAGE (Suspense wrapper)
//    ========================= */
// export default function Page() {
//   return (
//     <Suspense fallback={<div style={{ color: 'white', padding: 20 }}>Loading...</div>}>
//       <ComplContent />
//     </Suspense>
//   )
// }

// /* =========================
//    ACTUAL PAGE LOGIC
//    ========================= */
// function ComplContent() {
//   const searchParams = useSearchParams()
//   const item = searchParams.get("data")
//   const ind = parseInt(item)

//   const { data: session, status } = useSession()
//   const [scrolled, setScrolled] = useState(false)

//   const [first, setfirst] = useState({
//     name: "",
//     event: "",
//     time: "",
//     image: null,
//     location: "",
//     mobile: "",
//     des: "",
//     color: ""
//   })

//   const [users, setUsers] = useState([])

//   const hand = (e) => {
//     setfirst({ ...first, [e.target.name]: e.target.value })
//   }

//   const handleFile = (e) => {
//     setfirst({ ...first, image: e.target.files[0] })
//   }

//   const menu = [
//     { icon: '🏠', label: 'Dashboard', href: '/' },
//     { icon: '📊', label: 'Message', href: '/ana' },
//     { icon: '📋', label: 'Complaint', href: '/compl' },
//     { icon: '🔔', label: 'Report', href: '/rc' },
//     { icon: '📈', label: 'Status', href: '/status' },
//     { icon: '👤', label: 'Profile', href: '/profile' },
//   ]

//   const fetchUsers = async () => {
//     if (status === "authenticated" && session?.user?.email) {
//       const res = await fetch(
//         `http://localhost:5000/users?email=${session.user.email}`
//       )
//       const data = await res.json()
//       setUsers(data)
//     }
//   }

//   useEffect(() => {
//     fetchUsers()
//   }, [session?.user?.email])

//   useEffect(() => {
//     if (item && users[ind]) {
//       setfirst({
//         name: users[ind]?.name,
//         event: users[ind]?.branch,
//         time: users[ind]?.complaint,
//         image: users[ind]?.image,
//         location: users[ind]?.location,
//         mobile: users[ind]?.mobile,
//         des: users[ind]?.des,
//         color: users[ind]?.color
//       })
//     }
//   }, [users, item, ind])

//   const cre = async (v) => {
//     const formData = new FormData()
//     formData.append("image", first.image)
//     formData.append("userEmail", session.user.email)
//     formData.append("userName", session.user.name)
//     formData.append("location", first.location)
//     formData.append("branch", first.event)
//     formData.append("name", first.name)
//     formData.append("des", first.des)
//     formData.append("complaint", first.time)
//     formData.append("mobile", first.mobile)
//     formData.append("_id", v || "")

//     await fetch("http://localhost:5000/upload", {
//       method: "POST",
//       body: formData
//     })

//     alert("Uploaded successfully!")
//   }

//   return (
//     <>
//       {/* NAVBAR */}
//       <Navbar fixed="top" expand="lg">
//         <Container fluid>
//           <Navbar.Brand>Civic</Navbar.Brand>
//           <Navbar.Collapse>
//             <Nav className="me-auto" />
//             {session?.user?.email}
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* SIDEBAR */}
//       <div className="premium-sidebar">
//         {menu.map((m, i) => (
//           <Link key={i} href={m.href}>{m.icon} {m.label}</Link>
//         ))}
//       </div>

//       {/* FORM */}
//       <div className="p1">
//         <input name="name" value={first.name} onChange={hand} placeholder="NAME" />
//         <input name="event" value={first.event} onChange={hand} placeholder="BRANCH" />
//         <input name="time" value={first.time} onChange={hand} placeholder="COMPLAINT" />
//         <input type="file" onChange={handleFile} />
//         <input name="location" value={first.location} onChange={hand} placeholder="LOCATION" />
//         <input name="mobile" value={first.mobile} onChange={hand} placeholder="MOBILE" />
//         <textarea name="des" value={first.des} onChange={hand} />
//         <input name="color" value={first.color} onChange={hand} placeholder="COLOR" />

//         {!item && <div onClick={() => cre()} className="p0">CREATE</div>}
//         {item && <div onClick={() => cre(users[ind]?._id)} className="p0">EDIT</div>}
//       </div>
//     </>
//   )
// }