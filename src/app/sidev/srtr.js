"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav } from 'react-bootstrap';
const srtr = () => {
    const{data:session} = useSession();
             const [scrolled, setScrolled] = useState(false);
             useEffect(() => {
                     const handleScroll = () => {
                         setScrolled(window.scrollY > 0);
                     };
             
                     window.addEventListener("scroll", handleScroll);
                 }, []);
    const menu = [
  { icon: '🏠', label: 'Dashboard', href: '/' },
  { icon: '📊', label: 'Message', href: '/ana' },
  { icon: '📋', label: 'Complaint', href: '/compl' },
  { icon: '🔔', label: 'Report', href: '/rc' },
  { icon: '📈', label: 'Status', href: '/status' },
  { icon: '👤', label: 'Profile', href: '/profile' },
];
  return (
    <>
    <Navbar className={`premium-navbar mobile-only ${scrolled ? "scrolled" : ""}`} fixed="top" expand="lg">
                                             <Container fluid>
                                                {!session && <div><Link href="/login/" >  <Button className="premium-signout-sidebar129">🚪 SignIn</Button></Link> </div>}
 
                                               {session && <div  ><span><img src={session?.user?.image} alt="" className='table-avatar' /></span> <span className="search-container">{session?.user.email}</span> </div>}
                    <Navbar.Brand href="#" className="premium-brand">
                        <div className="brand-glow"></div>
                     </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" className="premium-toggle" />
                     
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 premium-nav-links" navbarScroll>
                                                    </Nav>

                             <div className='center'>
                      <Link href={"/"} className="sidebar-link">🏠 Dashboard</Link> 
                      <Link href={"/ana"} className="sidebar-link">📊 Message</Link> 
                      <Link href={"/compl"} className="sidebar-link">📋 Complaints</Link> 
                      <Link href={"/rc"} className="sidebar-link">🔔 Report</Link> 
                      <Link href={"/status"} className="sidebar-link">📈 Status</Link> 
                      <Link href={"/profile"} className="sidebar-link">👤 Profile</Link>

   {session && <div className="sidebar-footer">
                        <Button style={{width:"200px"}} onClick={() => signOut({ callbackUrl: "/" })} className="premium-signout-sidebar">🚪 Sign Out</Button>
                        </div>}
                             </div>
                     </Navbar.Collapse>
                </Container>
            </Navbar>


<div  className='premium3'>
    {session && <div className='bacg'><span><img src={session?.user?.image} alt="" className='img4' /></span> <span className="search-container454">{session?.user.email}</span> </div>}
</div>
      <div className="premium-main-content">
                 <div className="premium-sidebar">
                     <div className="sidebar-header">
                        {/* <h3>Navigation Menu</h3> */}
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
{!session && <div><Link href="/login/" >  <Button className="premium-signout-sidebar">🚪 SignIn</Button></Link> </div>}

                </div>
</div>
    </>
  )
}
export default srtr
