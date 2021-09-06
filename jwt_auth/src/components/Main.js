import React from 'react'
import '../style/Main.css'
import AddTodo from './AddTodo'
import img from '../img/todo.png'
import { useState, useEffect, useRef } from 'react'

export default function Main({ name, style }) {
    const [value, setValue] = useState(0)
  

    const addTodo=()=>{
        return(
            <AddTodo/>
        )
    }
   


    return (
        <div  style={style} className="main">
            <div className="main-text">

                <h1>Welcome</h1>
                <h2 style={{ textTransform: "uppercase" }}>{name}</h2>
                <h3>Get your notes down here!</h3>
                <h3> Customize your theme!</h3>
            </div>
            <img src={img} alt="" />
        </div>
    )
}