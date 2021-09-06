import React from 'react'

import '../style/header.css'
import {Link} from 'react-router-dom'

export default function Header() {

  let logo="{/}"
  const style={
    textDecoration:" none",
    color: "white"
}
  return (
    <>

      <nav>

       <div id="nav-menu">

        <span id="nav-brand">{logo}</span>

        <Link to='/' style={style} onClick={()=>localStorage.clear()}>Home</Link>
       </div>
        
       
        

      </nav>
  
 

 </>
  )
}


