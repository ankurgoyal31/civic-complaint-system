'use client'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line, Legend } from "recharts";
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import _ from 'lodash';
import Adnav from '../../../adnvav/nav';
const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [uss, sets] = useState([]);
  const [u, setU] = useState([]);
  const [v, setV] = useState([]);
  const [l, setL] = useState([]);
  const[lo,slo] = useState("")
  const[c,sc] = useState({count:"",scount:""})
  const [maxUser, setMaxUser] = useState(null);
    console.log("backned url -> ",process.env.NEXT_PUBLIC_BACKEND)

  useEffect(() => {
     (async () => {
        try{
            slo("data is loading please wait....")
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/complaint/adm`);
      const data = await res.json();
      setUsers(data);
if(data.length){
    const countryCount = data.reduce((acc, item) => {
  acc[item.location] = (acc[item.location] || 0) + 1;
  return acc;
 }, {});

console.log("ccccc",countryCount);
let maxCountry = "";
let maxCount = 0;
for (let location in countryCount) {
  if (countryCount[location] > maxCount) {
    maxCount = countryCount[location];
    maxCountry = location;
  }
}
sc({cout:maxCountry,scout:maxCount})
console.log(maxCountry, maxCount);

    slo("");
}
if(!data.length){
    slo("Not content found yet....")
}
        }catch(err){
slo("please check your internet speed.....")
        }
    })();
  }, []);

  useEffect(() => {
    const statusCount = _.countBy(users, 'status');
    sets(Object.keys(statusCount).map(k => ({ name: k, status: statusCount[k] })));

    const branchCount = _.countBy(users, 'branch');
    setU(Object.keys(branchCount).map(k => ({ name: k, complaint: branchCount[k] })));

    const solved = users.filter(u => u.status === 'Resolved');
    setV(solved);

    const activity = _.countBy(users, 'name');
    setL(Object.keys(activity).map(k => ({ Name: k, value: activity[k] })));

    const grouped = _.groupBy(users, "userEmail");
    const top = _.maxBy(
      Object.values(grouped).map(g => ({ count: g.length, person: g[0] })),
      'count'
    );
    setMaxUser(top || null);
  }, [users]);

  console.log(c)
  return (
    <>
    {/* 🚨 JAIPUR ALERT */}
    {lo!==""&&<><div>{lo}</div></>}
<div className="jaipur-alert">
  ⚠️ <strong>Attention:</strong> Please solve first <span>{c.cout}</span>.
  <div>
    {c.cout} count {c.scout}
  </div>
</div>
<Adnav/>
      {/* MAIN LAYOUT */}
      <main className="layout">
        {/* DASHBOARD */}
        <section className="dashboard">
          <div className="charts-grid">
            <ChartBox title="Weekly Complaints">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={uss}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="status" fill="#667eea" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartBox>

            <ChartBox title="Problems by Branch">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={u}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="complaint" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>
            </ChartBox>
          </div>

          <div className="charts-grid">
            <ChartBox title="User Activity">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={l}>
                  <XAxis dataKey="Name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="value" stroke="#4caf50" />
                </LineChart>
              </ResponsiveContainer>
            </ChartBox>

            <div className="top-user">
              <h3>🏆 Top User</h3>
              <p>{maxUser?.person?.name}</p>
              <strong>{maxUser?.count}</strong>
            </div>
          </div>
        </section>

        {/* TABLE */}
        <section className="table-wrapper">
          <h2>TOTAL RESOLVED RECORDS</h2>
          <Table responsive bordered>
            <thead>
              <tr>
                <th>Name</th><th>Branch</th><th>Location</th><th>Complaint</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {v.map((i, idx) => (
                <tr key={idx}>
                  <td>{i.name}</td>
                  <td>{i.branch}</td>
                  <td>{i.location}</td>
                  <td>{i.complaint}</td>
                  <td>{i.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </main>

      {/* CSS */}
      <style jsx global>{`
      .jaipur-alert {
  background: linear-gradient(135deg, #ff9800, #ff5722);
  color: white;
  padding: 14px 18px;
  border-radius: 12px;
  margin: 100px auto 20px; /* navbar ke niche */
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
}

.jaipur-alert span {
  background: rgba(0,0,0,0.25);
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
}

.jaipur-alert button {
  background: white;
  color: #ff5722;
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.jaipur-alert button:hover {
  transform: scale(1.05);
}

 @media (max-width: 600px) {
  .jaipur-alert {
    flex-direction: column;
    align-items: flex-start;
  }

  .jaipur-alert button {
    width: 100%;
    text-align: center;
  }
}
        body { background:#0f172a; color:white; }

        .layout {
          padding-top: 90px;
          max-width: 1400px;
          margin: auto;
          padding-inline: 16px;
        }

        .dashboard { display:flex; flex-direction:column; gap:32px; }

        .charts-grid {
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap:24px;
        }

        .chart-box {
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
          padding:16px;
        }

        .top-user {
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
          padding:24px;
          text-align:center;
        }

        .table-wrapper {
          margin: 48px auto;
          max-width: 1200px;
        }

        h2 { text-align:center; margin-bottom:16px; }
      `}</style>
    </>
  )
};

const ChartBox = ({ title, children }) => (
  <div className="chart-box">
    <h3 style={{textAlign:'center'}}>{title}</h3>
    {children}
  </div>
);

export default Page;
