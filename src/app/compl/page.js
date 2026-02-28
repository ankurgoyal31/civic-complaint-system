'use client'
export const dynamic = 'force-dynamic'
import React from 'react'
import { Suspense } from 'react'
import { useState,useEffect } from 'react'
 import Link from 'next/link'
 import { useSearchParams } from 'next/navigation'
 import Container from 'react-bootstrap/Container';
 import { useSession } from 'next-auth/react';
 import Srtr from '../sidev/srtr'
export default function Page() {
  return (
    <Suspense fallback={<div style={{ color: 'white', padding: 20 }}>Loading...</div>}>
      <ComplContent />
    </Suspense>
  )
}
function ComplContent() {
  console.log("backe->  ",process.env.NEXT_PUBLIC_BACKEND)
      const searchParams = useSearchParams();
         const [scrolled, setScrolled] = useState(false);
     
   const{data:session, status} = useSession()
  const[load,sload]  = useState("");
   const [first, setfirst] = useState({name:"",event:"",time:"",image:null,location:"",mobile:"",des:"",color:""})
  const[m,n] = useState("")
  const[r,x] = useState(false)
  const [users, setUsers] = useState([]);
 const item = searchParams.get("data");
    const ind = parseInt(item);
  const hand = (e)=>{
    setfirst({...first,[e.target.name]:e.target.value});
  }
    const sho = () => {
     x(true);
  };
  const handleFile = (e) => {
    setfirst({ ...first, image: e.target.files[0] });
  }
const menu = [
  { icon: '🏠', label: 'Dashboard', href: '/' },
  { icon: '📊', label: 'Message', href: '/ana' },
  { icon: '📋', label: 'Complaint', href: '/compl' },
  { icon: '🔔', label: 'Report', href: '/rc' },
  { icon: '📈', label: 'Status', href: '/status' },
  { icon: '👤', label: 'Profile', href: '/profile' },
];
const fetchUsers = async () => {
    console.log("item",item)
  if ( item) {
 const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/update?edit=${item}`);
   const data = await res.json();
   console.log("data is ->",data.data)
   if(data.data){
    setfirst({name:data?.data.name,event:data?.data.branch,location:data?.data.location,mobile:data?.data.mobile,des:data?.data.des})
   }
    setUsers(data.data);
    return
      }
  };
 useEffect(() => {
      if(!item) return
    fetchUsers();
  }, [item]);

  const cre = async (v) => {
sload("")
     if(first.location=="" || first.event=="" || first.name=="" ||first.des=="" ||first.time=="" || first.mobile=="" ){
sload("filled the requres field..");
return;
    }
        sload("your complaint is sending please wait don't close the page ...")
    console.log(v)
   const formData = new FormData();
  formData.append("image", first.image);   // file
  formData.append("userEmail", session.user.email);
  formData.append("userName", session.user.name);
    formData.append("location",first.location);
  formData.append("branch", first.event);
  formData.append("name",first.name);
    formData.append("des",first.des);
    formData.append("complaint",first.time);
    formData.append("img",session.user?.image)
      formData.append("mobile", first.mobile);
      formData.append("_id", v);
      if(ind && users){
console.log("fuck->>",users)
       }
       try{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/upload`, {
    method: "POST",
    body: formData
  });
  if(!res.ok){
sload("something went wrong ....")
  }
  const data = await res.json();
  console.log(res.ok)
  console.log(data);
  sload("");
  if(res.ok){
  alert("Uploaded successfully!");
setfirst({name:"",event: "",time:"",image:"",location:"",mobile:"",des: "",color:""})
  }
  }catch(err){
    sload("please Check Your internet connection....")
  }
};

//   useEffect(() => {
//     if(item  && users){
//   console.log("-> ",ind)
// setfirst({name:users[ind]?.name,event:users[ind]?.branch,time:users[ind]?.complaint,image:users[ind]?.image,location:users[ind]?.location,mobile:users[ind]?.mobile,des:users[ind]?.des,color:users[ind]?.color})
//     }
//   }, [users,item])

  console.log("fuck->>",users)


  return (
    <>
    <div className='display'> 
    <div> 
    {/* <Srtr/> */}
</div>

            <Srtr/>

     <div  className='x1'> 
      <div className='x2'> 
           {session && <div className='s0'>welcome, {session.user.name}</div>}
 </div>
 
 <div className='p1'> 
      {load!=="" && <><div className='loader_handler'>{load}</div></>}
     <div><input name='name' value={first.name} onChange={hand} type="text" placeholder='ENTER PERSON NAME' /></div>
    <div><input name='event' value={first.event} onChange={hand} type="text" placeholder='ENTER YOUR BRANCH' /></div>
    <div><input name='time' value={first.time} onChange={hand} type="text" placeholder='ENTER COMPLAIAINT' /></div>
      <div style={{backgroundColor:'brown',color:'black'}}><input type="file" accept="image/*" onChange={handleFile} /></div> 
    <div ><input name='location' value={first.location} onChange={hand} type="text" placeholder='ENTER  LOCATION' /></div>
        <div><input name='mobile' value={first.mobile} onChange={hand} type="text" placeholder='ENTER  MOBILE' /></div>

<div><textarea name='des' value={first.des} onChange={hand} placeholder='ABOUT THE COMPLAINT'></textarea></div>
 {!session&&<div className='p0' style={{backgroundColor:'red'}} onClick={cre}><Link className='free' href={"/login"}> SignIn to create </Link></div> }
{!item && session &&<div className='p0' style={{backgroundColor:'red'}} onClick={cre}> CREATE </div>}
{item && <div onClick={()=>cre(users[ind]?._id)} className='p0' style={{backgroundColor:'red'}}>EDIT </div>}
</div>
</div>
 </div>
     </>
  )
}
