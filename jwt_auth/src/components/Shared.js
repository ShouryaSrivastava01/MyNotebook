import { useState,useEffect } from "react"
import '../style/shared.css'
import SharedItem from "./SharedItem"
export default function Shared(){
    const [share, setShare]=useState([])
    const [display, setDisplay]=useState('none')
    useEffect(()=>{
        setShare(() => {
            return JSON.parse(localStorage.getItem('data')).share != null ? JSON.parse(localStorage.getItem('data')).share : []
          })
    },[])
    console.log(share)
    return (
        <div className="sharedContainer">
        
        {
            share.map((i)=>{
                return(
                
                    <SharedItem i={i}/>
                    
                )
                
            })
        }
        </div>

    )
}