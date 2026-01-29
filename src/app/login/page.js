"use client";

import { signIn, useSession } from "next-auth/react";
import Nav from "../cp/nav";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [role, setRole] = useState("user");
  const { data: session, status } = useSession();
  const [showPopup, setShowPopup] = useState(false);
  const [e, n] = useState(false);
  const router = useRouter();

  const ht = (e) => {
    setRole(e.target.value);
    n(true);
  };

   useEffect(() => {
    if (status === "authenticated") {
      setShowPopup(true);

      const t = setTimeout(() => {
        setShowPopup(false);
        router.push("/");
      }, 2500);

      return () => clearTimeout(t);
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <>
       
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2>🎉 Login Successful</h2>
            <p>Welcome <b>{session?.user?.name}</b></p>
            <img src={session?.user?.image} alt="" />
            <p className="redirect-text">Redirecting to home...</p>
          </div>
        </div>
      )}

       {!session && (
        <div className="login-page">
          <div className="login-card">

             <div className="css-anim-bg">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <h1 className="title">Welcome 👋</h1>
            <p className="subtitle">Login to get more support & help</p>

            <h3 className="role-title">Select Role</h3>

            <select value={role} onChange={ht} className="role-select">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="worker">Worker</option>
            </select>

            {(!e || role === "user") && (
              <>
                <button
                  onClick={() => signIn("github")}
                  className="login-btn github"
                >
                  Login with GitHub
                </button>

                <button
                  onClick={() => signIn("google")}
                  className="login-btn google"
                >
                  Login with Google
                </button>
              </>
            )}

            {e && role !== "user" && (
              <>
                <div className="form-box">
                  <input type="text" placeholder="Enter your name" />
                  <input type="email" placeholder="Enter your email" />
                </div>
                <button className="submit-btn">Submit</button>
              </>
            )}
          </div>
        </div>
      )}

       <style jsx>{`
        /* ===== PAGE ===== */
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg,#0f2027,#203a43,#2c5364);
          padding: 20px;
          }

        /* ===== CARD ===== */
        .login-card {
          width: 420px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(22px);
          border-radius: 22px;
          padding: 35px;
          text-align: center;
          color: white;
          box-shadow: 0 30px 80px rgba(0,0,0,0.55);
          position: relative;
          overflow: hidden;
        }

        /* ===== ANIMATED BG ===== */
        .css-anim-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .css-anim-bg span {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          filter: blur(40px);
          background: radial-gradient(circle,rgba(0,229,255,0.4),transparent);
          animation: floatMove 18s infinite linear;
         }

        .css-anim-bg span:nth-child(1) {
          top: -80px;
          left: -80px;
        }

        .css-anim-bg span:nth-child(2) {
          bottom: -100px;
          right: -80px;
          animation-duration: 26s;
        }

        .css-anim-bg span:nth-child(3) {
          top: 40%;
          left: 60%;
          width: 150px;
          height: 150px;
          animation-duration: 22s;
        }

        @keyframes floatMove {
          0% { transform: translate(0,0); }
          50% { transform: translate(40px,-30px); }
          100% { transform: translate(0,0); }
        }

        /* content above animation */
        .login-card > *:not(.css-anim-bg) {
          position: relative;
          z-index: 1;
        }

        /* ===== TEXT ===== */
        .title {
          font-size: 32px;
          font-weight: 700;
        }

        .subtitle {
          font-size: 14px;
          opacity: 0.8;
          margin-bottom: 25px;
        }

        .role-title {
          margin-bottom: 10px;
          font-weight: 600;
        }

        .role-select {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          margin-bottom: 25px;
        }

        /* ===== BUTTONS ===== */
        .login-btn {
          width: 100%;
          padding: 14px;
          margin-bottom: 15px;
          border-radius: 30px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .login-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 120%;
          height: 100%;
          background: linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { left: -120%; }
          100% { left: 120%; }
        }

        .github {
          background: #24292e;
          color: white;
        }

        .google {
          background: white;
          color: #333;
        }

        .form-box {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }

        .form-box input {
          padding: 14px;
          border-radius: 12px;
          border: none;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 30px;
          background: linear-gradient(135deg,#ff9800,#ff5722);
          color: white;
          border: none;
          font-weight: 700;
          cursor: pointer;
        }

        /* ===== POPUP ===== */
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .popup-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(25px);
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          color: white;
          animation: scaleIn 0.4s ease;
          box-shadow: 0 30px 80px rgba(0,0,0,0.7);
        }

        .popup-card img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 15px 0;
          border: 3px solid #00e5ff;
        }

        .redirect-text {
          font-size: 13px;
          opacity: 0.8;
        }

        @keyframes scaleIn {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Page;
