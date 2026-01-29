"use client";
import React, { useEffect, useState } from "react";
// import Na from "../cf/na";
import Nav from "../cp/nav";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const { data: session, status } = useSession();

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! मैं आपकी मदद के लिए हूँ।" },
  ]);
  const [input, setInput] = useState("");

  const fetchUsers = async () => {
    if (status === "authenticated" && session?.user?.email) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/users?email=${session?.user?.email}`
      );
      const data = await res.json();
      console.log(data);
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [session]);

  const toggleChat = () => setChatOpen(!chatOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `आपने कहा: ${input}` },
      ]);
    }, 500);

    setInput("");
  };
const se = (e,i)=>{
console.log(i)
alert("fuck")
}
  return (
    <>
      {/* Top Component */}
      <div>
        {/* <Na /> */}
      </div>

      {/* Navbar */}
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

      
    <div className="l4" style={{color:'white'}}> 
  {users.map((items, i) => (
    <> 
 <div className="j5"> 
  <div key={i} style={{ color: 'white' }}> NAME - {items.name} </div>
  <div>BRANCH - {items.branch} </div>
  <div>COMPLAINT - {items.complaint} </div>
  <div> DES - {items.des} </div>
  <div> LOCATION - {items.location} </div>  

  {/* sirf ispe click hoga */}
</div>

    </>
  ))}
  
</div>


      {/* Chatbot Button */}
      <button className="chat-button" onClick={toggleChat}>
        💬 Chat
      </button>

      {/* Chatbot Container */}
      <div className={`chat-container ${chatOpen ? "open" : ""}`}>
        <div className="chat-header">
          ChatBot
          <span className="close-btn" onClick={toggleChat}>
            ✖
          </span>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>

      {/* Chatbot CSS */}
    </>
  );
};

export default Page;
