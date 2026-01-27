'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';
 const page = () => {
     const searchParams = useSearchParams();
     const item = searchParams.get("data");
     const [n, k] = useState([]);
          const [v, g] = useState({});
 const [response, setResponse] = useState('');
    const ind = parseInt(item);
    console.log(ind);
    const  fetchUsers =async()=>{
           const re = await fetch("http://localhost:5000/use");
           const dat = await re.json();
           k(dat)
    }
    useEffect(() => {
     fetchUsers();
    }, [])
    const handleSubmitResponse = (e) => {
    e.preventDefault();
    if (response.trim()) {
      alert(`Response submitted: ${response}`);
      setResponse('');
    }
  };
    useEffect(() => {
    g(n[ind]);
    }, [n])  
    console.log(v) 
  return (
    <div>
    <div className="support-card">
      <div className="card-header">
        <h2>User Support Request</h2>
      </div>
      
      <div className="user-info">
        <div className="user-photo">
          <img src={n[ind]?.img} alt={n[ind]?.name} />
        </div>
        <div className="user-details">
          <h3>{n[ind]?.name}</h3>
          <p className="user-email">{n[ind]?.email}</p>
        </div>
      </div>
      
      <div className="issue-section">
        <div style={{color:'black'}} className="issue-header">
          <span className="issue-tag">Issue</span>
          {/* <h4>{n[ind]?.issue[0]}</h4> */}
           {n[ind]?.issue?.map((update, index) => (
                      <div key={index}>
                         <div>{update}</div>
                      </div>
                    ))}
        </div>
         
      </div>
       <div className="issue-section">
        <div className="issue-header">
          <span className="issue-tag">ID</span>
          <h4>{n[ind]?.id}</h4>
                  </div>
         
      </div>
         <div className="issue-section">
        <div className="issue-header">
          <span className="issue-tag">BRANCH</span>
          <h4>{n[ind]?.branch}</h4>
                  </div>
         
      </div>
      
      <div className="response-section">
        <h4>Add Response</h4>
        <form onSubmit={handleSubmitResponse}>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your response here..."
            rows="4"
          />
          <div className="response-actions">
            <button type="submit" className="submit-btn">
              Send Response
            </button>
          </div>
        </form>
      </div>
    </div>    </div>
  )
}

export default page