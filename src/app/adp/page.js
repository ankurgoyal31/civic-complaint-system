"use client";
import React from "react";
 import Adnav from "../../../adnvav/nav";
export default function AdminProfile() {
  return (
    <div className="admin-wrapper">
                <Adnav/>

      <div className="profile-glass">
         <div className="profile-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="avatar"
          />
          <h2>Ankur Goyal</h2>
          <span className="role">Admin • Civic Dashboard</span>

          <div className="info">
            <p><b>Email:</b> Vaibhav@gmail.com</p>
            <p><b>Branch:</b> Sarmathura</p>
            <p><b>Phone:</b> +91 9509518631</p>
          </div>

        </div>

         <div className="profile-right">
          <div className="stat">
            <h1>124</h1>
            <p>Total Complaints</p>
          </div>

          <div className="stat">
            <h1>98</h1>
            <p>Resolved</p>
          </div>

          <div className="stat">
            <h1>26</h1>
            <p>Pending</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }

        .profile-glass {
          width: 900px;
          display: flex;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
          overflow: hidden;
        }

        .profile-left {
          width: 40%;
          padding: 40px;
          color: white;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.2);
        }

        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin-bottom: 15px;
          border: 3px solid white;
        }

        .role {
          font-size: 14px;
          opacity: 0.9;
        }

        .info {
          margin-top: 25px;
          text-align: left;
          font-size: 15px;
        }

        .info p {
          margin: 8px 0;
        }

        .btns {
          display: flex;
          gap: 10px;
          margin-top: 25px;
        }

        .edit {
          flex: 1;
          background: #22c55e;
          border: none;
        }

        .logout {
          flex: 1;
          background: #ef4444;
          border: none;
        }

        .profile-right {
          width: 60%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 40px;
        }

        .stat {
          background: rgba(255,255,255,0.2);
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          color: white;
          width: 150px;
          transition: 0.3s;
        }

        .stat:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,0.3);
        }

        .stat h1 {
          font-size: 42px;
          margin: 0;
        }

        .stat p {
          margin-top: 5px;
          font-size: 14px;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .profile-glass {
            flex-direction: column;
          }
          .profile-left,
          .profile-right {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
