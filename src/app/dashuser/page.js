import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <div>    
    <div className='t1'>   
    <video autoPlay loop muted playsInline className="abv"><source src="/video/kr.mp4" type="video/mp4" /></video>
     </div>
      <div className='as10'><Link href='/compl' className='d0'><div style={{color:'black'}} className='o1'>complaint</div></Link></div>  
     </div>
  )
}
export default page
