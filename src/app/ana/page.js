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
 import Srtr from "../sidev/srtr";
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
   { icon: '👤', label: 'Profile', href: '/profile' },
];
 const t = async() => {
     signOut({ callbackUrl: "/" });
      };
  const get = async () => {
    try {
      ses("Loading....")
        console.log(session?.user?.email);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/complaint/msg`,{
          method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:session?.user?.email})  
      });
         
      const data = await res.json();
      if(!data.ok){
        ses("Not found ....")
      }
      if(data.length){
              setfirst(data);
        ses("")
        return
        }
     } catch (err) {
        ses("Check your Internet Connection..")
      console.error("check your connection...");
    }
  };

  useEffect(() => {
    get();
  }, [session?.user?.email]);

  return (
    <> 
     <Srtr/>
    <div className="masge" style={{  color: "black" }}>
     { sh !=="" && <div className="prirfn13">{sh}</div>}

      {first.length>0 && first.map((item, i) => (
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
