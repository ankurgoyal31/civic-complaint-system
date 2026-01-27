"use client";
import React from "react";
 import Link from 'next/link';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { signIn, signOut, useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session } = useSession();
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
  return (
    <>

<div style={{marginTop:'100'}}  className="premium-main-content">
                {/* Premium Sidebar */}
                <div  className="premium-sidebar">
                    <div  className="sidebar-header">
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
                        <Button  onClick={signOut({ callbackUrl: "/" })} className="premium-signout-sidebar">🚪 Sign Out</Button>
                        </div>}
 {!session && <div className="sidebar-footer">
                      <Link href="/login/" >  <Button className="premium-signout-sidebar">🚪 SignIn</Button></Link> 
                        </div>}
 
 </div>
                </div>


      <div className="profile-page">
        {/* ===== HEADER ===== */}
        <div className="profile-header">
          <img
            src={session?.user?.image || "/avatar.png"}
            alt="profile"
            className="avatar"
          />
          <div>
            <h1>Welcome, {session?.user?.name || "User"}</h1>
            <p>{session?.user?.email}</p>
          </div>
        </div>

        {/* ===== MAIN CARD ===== */}
        <div className="profile-card">
          <div className="info-grid">
            <div>
              <label>Name</label>
              <span>{session?.user?.name}</span>
            </div>

            <div>
              <label>Email</label>
              <span>{session?.user?.email}</span>
            </div>

            <div>
              <label>Role</label>
              <span>Citizen</span>
            </div>

            <div>
              <label>Status</label>
              <span className="status">Active</span>
            </div>

            <div className="full">
              <label>About</label>
              <span>
                I am a registered user of the complaint management system. I use
                this platform to raise and track civic complaints efficiently.
              </span>
            </div>
          </div>

          {/* ===== STATS ===== */}
          <div className="stats">
            <div>
              <h3>12</h3>
              <p>Total Complaints</p>
            </div>
            <div>
              <h3>7</h3>
              <p>Resolved</p>
            </div>
            <div>
              <h3>5</h3>
              <p>Pending</p>
            </div>
          </div>

          {/* ===== ACTIONS ===== */}
           
        </div>
      </div>

      {/* ================= CSS ================= */}
      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
        }

        /* HEADER */
        .profile-header {
          width: 100%;
          max-width: 1100px;
          display: flex;
          align-items: center;
          gap: 25px;
          margin-bottom: 35px;
        }

        .avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 3px solid #00e5ff;
        }

        .profile-header h1 {
          font-size: 2rem;
          margin-bottom: 6px;
        }

        .profile-header p {
          opacity: 0.8;
        }

        /* MAIN CARD */
        .profile-card {
          width: 100%;
          max-width: 1100px; /* 🔥 CHAODA */
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(18px);
          border-radius: 26px;
          padding: 40px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
        }

        /* INFO GRID */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }

        .info-grid div {
          background: rgba(255, 255, 255, 0.08);
          padding: 18px 20px;
          border-radius: 14px;
        }

        .info-grid label {
          font-size: 0.8rem;
          opacity: 0.7;
          display: block;
          margin-bottom: 6px;
        }

        .info-grid span {
          font-size: 1rem;
          font-weight: 500;
        }

        .info-grid .full {
          grid-column: span 2;
        }

        .status {
          color: #00ff8c;
          font-weight: 700;
        }

        /* STATS */
        .stats {
          display: flex;
          justify-content: space-between;
          margin: 40px 0 30px;
          gap: 20px;
        }

        .stats div {
          flex: 1;
          background: rgba(255, 255, 255, 0.08);
          padding: 25px;
          border-radius: 18px;
          text-align: center;
        }

        .stats h3 {
          font-size: 2rem;
          color: #00e5ff;
        }

        .stats p {
          margin-top: 6px;
          opacity: 0.8;
        }

        /* ACTIONS */
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 20px;
        }

        .actions button {
          padding: 14px 30px;
          border-radius: 30px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }

        .edit {
          background: linear-gradient(135deg, #00e5ff, #00ff8c);
          color: #000;
        }

        .logout {
          background: linear-gradient(135deg, #ff512f, #dd2476);
          color: #fff;
        }

        .actions button:hover {
          transform: translateY(-3px);
        }

        /* MOBILE */
        @media (max-width: 900px) {
          .info-grid {
            grid-template-columns: 1fr;
          }

          .info-grid .full {
            grid-column: span 1;
          }

          .stats {
            flex-direction: column;
          }

          .actions {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default ProfilePage;
