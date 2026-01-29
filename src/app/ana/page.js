"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, Button, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { Logout } from "@mui/icons-material";

// import { Sessions } from "openai/resources/beta/realtime/sessions";
const page = () => {
    const { data: session } = useSession();
  const [first, setfirst] = useState([]);
  const[sh,ses]  = useState("") 
  const router = useRouter(); 
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
 const t = async() => {
     signOut({ callbackUrl: "/" });
      };
  const get = async () => {
    try {

        ses("Loading....")
        
        console.log(session?.user?.email)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/msg`,{
          method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:session?.user?.email})
       
      });
      const data = await res.json();
      if(data.length){
        ses("")
      }
      if(!data.length){
        ses("Not found..")
      }
      setfirst(data);
    } catch (err) {
        ses("Check your internet connetion.")
      console.error("check your connection...");
    }
  };

  useEffect(() => {
    get();
  }, [session?.user?.email]);

  return (
    <> 
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

                    
                    <div className="sidebar-footer">
                        <Button onClick={t} className="premium-signout-sidebar">🚪 Sign Out</Button>
                    </div>
                </div>

    <div className="masge" style={{ color: "black" }}>



     { sh !=="" && <div className="prirfn13">{sh}</div>}

      {first.map((item, i) => (
        <div className="mbns" key={i} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <div><b>Name:</b> {item.name}</div>
          <div><b>Email:</b> {item.email}</div>
          <div><b>Status:</b> {item.status}</div>
         <div><b>ComplaintId:</b> {item.complaintId}</div>
        <div><b>Complaint Description:</b> {item.des}</div>

         <div><Link className="remsx" href={"/status"}>Clicked</Link></div>
        </div>
      ))}
    </div>
    </>
  );
};

export default page;