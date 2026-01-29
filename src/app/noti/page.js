"use client"
import { useState, useEffect } from 'react';
 import { Card, Button, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSession } from 'next-auth/react';
export default function CivicMessageSystem() {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [conversations, setConversations] = useState({});
  const [isMobile, setIsMobile] = useState(false);
    const [scrolled, setScrolled] = useState(false);
     const [search, setSearch] = useState("");
    
  // Check mobile screen
const handleSearch = (e) => {
  const val = e.target.value;
  setSearch(val);

  
}
    useEffect(() => {
          const handleScroll = () => {
              setScrolled(window.scrollY > 0);
          };

          window.addEventListener("scroll", handleScroll);
      }, []);
  

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Demo data - civic related messages
  const demoMessages = [
    {
      id: 1,
      sender: 'Road Maintenance Team',
      content: 'Pothole repair work completed on MG Road. Area is now safe for traffic.',
      timestamp: '2 hours ago',
      unread: true,
      avatar: '🚧',
      category: 'road',
      threadId: 'road-1'
    },
    {
      id: 2,
      sender: 'Water Department',
      content: 'Water supply will be interrupted tomorrow from 10 AM to 4 PM for pipeline maintenance.',
      timestamp: '3 hours ago',
      unread: true,
      avatar: '💧',
      category: 'water',
      threadId: 'water-1'
    },
    {
      id: 3,
      sender: 'Garbage Collection',
      content: 'Garbage collection schedule updated. Your area will be serviced every Tuesday and Friday.',
      timestamp: '5 hours ago',
      unread: true,
      avatar: '🗑️',
      category: 'garbage',
      threadId: 'garbage-1'
    },
    {
      id: 4,
      sender: 'Electricity Board',
      content: 'Power outage reported in your area. Our team is working on it. Estimated restoration: 1 hour.',
      timestamp: '1 hour ago',
      unread: false,
      avatar: '⚡',
      category: 'electricity',
      threadId: 'electricity-1'
    },
    {
      id: 5,
      sender: 'Sewage Department',
      content: 'Sewage line cleaning completed in Sector 15. Drainage system now functioning properly.',
      timestamp: 'Yesterday',
      unread: false,
      avatar: '🚽',
      category: 'sewage',
      threadId: 'sewage-1'
    },
    {
      id: 6,
      sender: 'Traffic Police',
      content: 'New traffic signals installed at Main Square. Please follow the updated signals.',
      timestamp: 'Yesterday',
      unread: false,
      avatar: '🚦',
      category: 'traffic',
      threadId: 'traffic-1'
    }
  ];

  // Initialize conversations with demo messages
  useEffect(() => {
    const initialConversations = {};
    demoMessages.forEach(msg => {
      if (!initialConversations[msg.threadId]) {
        initialConversations[msg.threadId] = [];
      }
      initialConversations[msg.threadId].push({
        ...msg,
        isOriginal: true
      });
    });
    
    setConversations(initialConversations);
    setMessages(demoMessages);
    const unread = demoMessages.filter(msg => msg.unread).length;
    setUnreadCount(unread);

    // Set first message as selected by default
    if (demoMessages.length > 0 && !isMobile) {
      setSelectedMessage(demoMessages[0]);
    }
  }, [isMobile]);

  const markAsRead = (threadId) => {
    setMessages(messages.map(msg => 
      msg.threadId === threadId ? { ...msg, unread: false } : msg
    ));
    const unread = messages.filter(msg => msg.unread && msg.threadId !== threadId).length;
    setUnreadCount(unread);
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    markAsRead(message.threadId);
    setReplyText('');
  };

  const handleBackToList = () => {
    setSelectedMessage(null);
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedMessage) return;

    const newReply = {
      id: Date.now(),
      sender: 'You',
      content: replyText,
      timestamp: 'Just now',
      unread: false,
      avatar: '👤',
      category: 'reply',
      threadId: selectedMessage.threadId,
      isReply: true
    };

    // Add to conversations - SIRF USI THREAD MEIN
    setConversations(prev => ({
      ...prev,
      [selectedMessage.threadId]: [
        ...(prev[selectedMessage.threadId] || []), 
        newReply
      ]
    }));

    setReplyText('');
  };

  const getCategoryColor = (category) => {
    const colors = {
      road: '#FF6B6B',
      water: '#4ECDC4',
      garbage: '#FFD166',
      electricity: '#118AB2',
      sewage: '#06D6A0',
      lights: '#6A0572',
      park: '#2EC4B6',
      traffic: '#FF9F1C',
      reply: '#667eea'
    };
    return colors[category] || '#6C757D';
  };

  const getCurrentThreadMessages = () => {
    if (!selectedMessage) return [];
    return conversations[selectedMessage.threadId] || [selectedMessage];
  };

  return (
    <div className="container">

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
            <Button   className='bt2' variant="outline-light">🔍</Button>
            <Button className='bt1'>Sign Out</Button>

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>







                <div className="premium-sidebar">
                    <div className="sidebar-header">
                        <h3>Navigation Menu</h3>
                        <div className="sidebar-glow"></div>
                    </div>
                    
                    <nav className="sidebar-nav">
                        {['🏠 Dashboard', '📊 Analytics', '📋 Reports', '🔔 Notifications', 
                          '📈 Status', '💬 Messages', '👷 Workers', '👤 Profile'].map((item, index) => (
                            <a key={index} href="#" className="sidebar-link">
                                <span className="link-icon">{item.split(' ')[0]}</span>
                                <span className="link-text">{item.split(' ').slice(1).join(' ')}</span>
                                <div className="link-glow"></div>
                            </a>
                        ))}
                    </nav>
                    
                    <div className="sidebar-footer">
                        <Button className="premium-signout-sidebar">🚪 Sign Out</Button>
                    </div>
                </div>

      <title>Civic Messages</title>
      <meta name="description" content="Civic message system" />

      <div className="message-app">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="app-title">
              <h1>🏛️ CivicConnect</h1>
              {unreadCount > 0 && (
                <span className="unread-badge">{unreadCount} new</span>
              )}
            </div>
            <div className="header-info">
              <span>City Department Communications</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="main-content">
          {/* Messages List - Left Side */}
          {(!isMobile || !selectedMessage) && (
            <div className="messages-list">
              <div className="list-header">
                <h2>Departments</h2>
                <span className="total-count">{messages.length} contacts</span>
              </div>
              
              <div className="messages-container">
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={`message-item ${message.unread ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="message-avatar" style={{ backgroundColor: getCategoryColor(message.category) }}>
                      <span className="avatar-icon">{message.avatar}</span>
                    </div>
                    
                    <div className="message-content">
                      <div className="message-header">
                        <h3 className="sender-name">{message.sender}</h3>
                        <span className="timestamp">{message.timestamp}</span>
                      </div>
                      <p className="message-preview">{message.content}</p>
                    </div>
                    
                    {message.unread && <div className="unread-dot"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conversation Thread - Right Side */}
          {(!isMobile || selectedMessage) && (
            <div className="conversation-thread">
              {selectedMessage ? (
                <div className="thread-container">
                  {/* Thread Header */}
                  <div className="thread-header">
                    {isMobile && (
                      <button className="back-button" onClick={handleBackToList}>
                        <span className="back-icon">←</span>
                      </button>
                    )}
                    <div className="thread-avatar" style={{ backgroundColor: getCategoryColor(selectedMessage.category) }}>
                      <span className="avatar-icon">{selectedMessage.avatar}</span>
                    </div>
                    <div className="thread-info">
                      <h2>{selectedMessage.sender}</h2>
                      <span className="thread-status">City Department</span>
                    </div>
                  </div>

                  {/* Messages in this thread */}
                  <div className="messages-thread">
                    {getCurrentThreadMessages()
                      .sort((a, b) => a.id - b.id)
                      .map(message => (
                      <div 
                        key={message.id} 
                        className={`message-bubble ${message.sender === 'You' ? 'own-message' : 'other-message'}`}
                      >
                        <div className="bubble-content">
                          <p>{message.content}</p>
                          <span className="bubble-time">{message.timestamp}</span>
                        </div>
                        <div 
                          className="sender-avatar" 
                          style={{ 
                            backgroundColor: message.sender === 'You' ? '#667eea' : getCategoryColor(message.category)
                          }}
                        >
                          {message.sender === 'You' ? '👤' : message.avatar}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input - Fixed at Bottom */}
                  <div className="reply-section">
                    <div className="reply-input-container">
                      <input
                        type="text"
                        className="reply-input"
                        placeholder={`Type your response to ${selectedMessage.sender}...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                      />
                      <button 
                        className="reply-btn"
                        onClick={handleReply}
                        disabled={!replyText.trim()}
                      >
                        <span className="send-icon">📤</span>
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-selection">
                  <div className="placeholder-icon">💬</div>
                  <h2>Select a Department</h2>
                  <p>Click on any department to start conversation</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Segoe UI', system-ui, sans-serif;
          margin: 0;
          padding: 0;
          overflow: hidden;
          justify-self:center;
          margin-top:100px;
        }
        
        .message-app {
          width: 100%;
          height: 100vh;
          background: white;
          display: flex;
          flex-direction: column;
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
        }
        
        /* Header */
        .header {
          background: linear-gradient(135deg, #1a1919ff 0%, #e49999ff 100%);
          color: white;
          padding: 25px 40px;
          border-bottom: 1px solid #333;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
          .premium-sidebar{
          margin-top:100px;
          }
        
        .app-title {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .app-title h1 {
          margin: 0;
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #ddd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .unread-badge {
          background: linear-gradient(135deg, #FF6B6B, #FF8E53);
          color: white;
          padding: 10px 18px;
          border-radius: 20px;
          font-size: 18px;
          font-weight: 700;
          animation: pulse 2s infinite;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }
        
        .header-info {
          font-size: 20px;
          color: #ccc;
          font-weight: 500;
        }
        
        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          overflow: hidden;
          height: calc(100vh - 95px);
        }
        
        /* Messages List - Left Side */
        .messages-list {
          width: 400px;
          background: #f8f9fa;
          border-right: 2px solid #e0e0e0;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }
        
        .list-header {
          padding: 25px 30px;
          border-bottom: 2px solid #e0e0e0;
          background: white;
        }
        
        .list-header h2 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 800;
          color: #333;
        }
        
        .total-count {
          font-size: 18px;
          color: #666;
          font-weight: 500;
        }
        
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
        }
        
        .message-item {
          display: flex;
          padding: 20px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 12px;
          background: white;
          border: 2px solid transparent;
          position: relative;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .message-item:hover {
          background: #f0f2f5;
          transform: translateX(8px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .message-item.unread {
          background: #e3f2fd;
          border-left: 6px solid #2196F3;
        }
        
        .message-item.selected {
          background: #e8f5e8;
          border: 3px solid #4CAF50;
          transform: translateX(8px);
        }
        
        .message-avatar {
          width: 70px;
          height: 70px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          flex-shrink: 0;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        .avatar-icon {
          font-size: 28px;
          font-weight: 700;
        }
        
        .message-content {
          flex: 1;
          min-width: 0;
        }
        
        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .sender-name {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }
        
        .timestamp {
          font-size: 16px;
          color: #666;
          font-weight: 500;
        }
        
        .message-preview {
          margin: 0;
          font-size: 18px;
          color: #555;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .unread-dot {
          position: absolute;
          top: 25px;
          right: 25px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #2196F3;
          animation: pulse 2s infinite;
          box-shadow: 0 0 15px rgba(33, 150, 243, 0.5);
        }
        
        /* Conversation Thread - Right Side */
        .conversation-thread {
          flex: 1;
          background: white;
          display: flex;
          flex-direction: column;
        }
        
        .thread-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .thread-header {
          padding: 25px 30px;
          border-bottom: 2px solid #e0e0e0;
          display: flex;
          align-items: center;
          gap: 20px;
          background: #fafafa;
        }
        
        .back-button {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .back-button:hover {
          background: #e0e0e0;
        }
        
        .thread-avatar {
          width: 70px;
          height: 70px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        .thread-info h2 {
          margin: 0 0 5px 0;
          font-size: 28px;
          font-weight: 800;
          color: #333;
        }
        
        .thread-status {
          font-size: 18px;
          color: #666;
          font-weight: 500;
        }
        
        /* Messages Thread */
        .messages-thread {
          flex: 1;
          overflow-y: auto;
          padding: 30px;
          background: #e5ddd5;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .message-bubble {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          max-width: 75%;
        }
        
        .message-bubble.own-message {
          align-self: flex-end;
        }
        
        .message-bubble.other-message {
          align-self: flex-start;
        }
        
        .bubble-content {
          padding: 18px 22px;
          border-radius: 22px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        
        .own-message .bubble-content {
          background: #dcf8c6;
          border: 1px solid #b3e099;
        }
        
        .other-message .bubble-content {
          background: white;
          border: 1px solid #e0e0e0;
        }
        
        .bubble-content p {
          margin: 0 0 8px 0;
          font-size: 20px;
          line-height: 1.5;
          color: #333;
          font-weight: 500;
        }
        
        .bubble-time {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        
        .sender-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        /* Reply Section */
        .reply-section {
          padding: 20px 30px;
          border-top: 2px solid #e0e0e0;
          background: white;
        }
        
        .reply-input-container {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .reply-input {
          flex: 1;
          padding: 18px 25px;
          border: 2px solid #e0e0e0;
          border-radius: 30px;
          font-size: 20px;
          outline: none;
          transition: all 0.3s ease;
          background: white;
        }
        
        .reply-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }
        
        .reply-input::placeholder {
          color: #999;
          font-size: 18px;
        }
        
        .reply-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 18px 30px;
          border-radius: 30px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .reply-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        
        .reply-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        
        .send-icon {
          font-size: 22px;
        }
        
        /* No Selection State */
        .no-selection {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #666;
          text-align: center;
          padding: 60px;
          background: #f8f9fa;
        }
        
        .placeholder-icon {
          font-size: 120px;
          margin-bottom: 30px;
          opacity: 0.3;
        }
        
        .no-selection h2 {
          margin: 0 0 15px 0;
          font-size: 36px;
          color: #333;
          font-weight: 800;
        }
        
        .no-selection p {
          margin: 0;
          font-size: 20px;
          color: #666;
          font-weight: 500;
        }
        
        /* Animations */
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .message-bubble {
          animation: slideIn 0.3s ease;
        }
        
        /* Scrollbar */
        .messages-container::-webkit-scrollbar,
        .messages-thread::-webkit-scrollbar {
          width: 8px;
        }
        
        .messages-container::-webkit-scrollbar-track,
        .messages-thread::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .messages-container::-webkit-scrollbar-thumb,
        .messages-thread::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        
        .messages-container::-webkit-scrollbar-thumb:hover,
        .messages-thread::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
          .header {
            padding: 20px 25px;
          }
          
          .app-title h1 {
            font-size: 28px;
          }
          
          .header-info {
            font-size: 16px;
          }
          
          .unread-badge {
            font-size: 14px;
            padding: 8px 14px;
          }
          
          .messages-list {
            width: 100%;
          }
          
          .conversation-thread {
            width: 100%;
          }
          
          .message-avatar {
            width: 60px;
            height: 60px;
          }
          
          .sender-name {
            font-size: 18px;
          }
          
          .message-preview {
            font-size: 16px;
          }
          
          .bubble-content p {
            font-size: 18px;
          }
          
          .reply-input {
            font-size: 18px;
            padding: 15px 20px;
          }
          
          .reply-btn {
            font-size: 18px;
            padding: 15px 25px;
          }
        }
        
        @media (max-width: 480px) {
          .header-content {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
          
          .app-title {
            justify-content: center;
          }
          
          .message-item {
            padding: 15px;
          }
          
          .message-avatar {
            width: 50px;
            height: 50px;
            margin-right: 15px;
          }
          
          .avatar-icon {
            font-size: 22px;
          }
          
          .sender-name {
            font-size: 16px;
          }
          
          .message-preview {
            font-size: 14px;
          }
          
          .bubble-content p {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}