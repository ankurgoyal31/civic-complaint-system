'use client';
// import { Player } from '@lottiefiles/react-lottie-player';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
  const Nav = () => {
  const { data: session, status } = useSession();
      const [first, setFirst] = useState(false);
  if (status === 'loading') return null;
 
  const sho = () => {
     setFirst(!first);
  };
const op =()=>{
  setFirst(false)
}
  return (
    <>   
    <div className='w3'> 
      <div  className='q2'> 
        <div className='j8'>
          <div className='qw'>
             
          </div> 
          <div className='j6'>
            <div className='j7'>
              <Link href='/' className='d9'>
                <div>complaint</div>
              </Link>  
              <div>
               </div>
            </div>
            <div className='s1'> 
            <div  style={{display:'flex', gap:'40px', marginLeft:'-280px'}}> 
              <div style={{display:'flex', gap:'100px'}}>  
                {session && (
                  <div onClick={sho} className='w2' style={{color:'white', display:'flex', height:'23px', textAlign:'center', width:'250px'}}>
                    <div className='s7'>
        
                      <img className='s8' style={{width:'25px', height:'25px'}} src={session.user?.image} alt="" />
                    </div>
                    <div className='w6' style={{marginLeft:'15px',color:'black'}}>
                     <p className='w9'>{session.user?.email}</p>  
                    </div>
                  </div>
                )}
              </div>
              <div>
                {!session && <Link href="/login/" className='w5'><div className='w2'  style={{color:'black'}}>LOGIN</div></Link>}
                {session && (<div onClick={() => signOut()} className='w5' style={{color:'black'}}>LOGOUT</div>)}
              </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
                </div>    

      <div className='o1'> 
      {first && <div className='as11'>
        <div onClick={sho} className='do'>X</div>
             <div> <Link href='/' className='dp'><div style={{color:'black'}} className='do'>HOME</div></Link></div> 
            <Link href='/dash' className='dp'><div style={{color:'black'}} className='do'>DASHWORD</div></Link>
            <Link href='/compl' className='dp'><div style={{color:'black'}} className='do'>CREATE COMPLAIAINT</div></Link>
            
          </div>   
          }
          </div>
     </> 
  );
};
export default Nav;