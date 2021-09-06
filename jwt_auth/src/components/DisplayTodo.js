import React from 'react'
import TodoItems from './TodoItem';
import '../style/DisplayTodo.css'
import { useState } from 'react';

export default function DisplayTodo(props) {

    const [content, setContent]=useState('Filter')
   
   
      
  

    return (
        <div  className="display-container">
             <div className="dropdown">

  <button  onClick={()=>{props.fil("none"); setContent('Filter')}} className="dropbtn">{content}</button>
  <div className="dropdown-content">
  <li onClick={()=>{props.fil("red"); setContent('✕')}}>Important</li>
  <li onClick={()=>{props.fil("blue"); setContent('✕')}}>Inprogress</li>
  <li onClick={()=>{props.fil("#91BA4D"); setContent('✕')}}>Completed</li>
  </div>
</div>
            {
                props.todos.map((i, key) => {
                    return (
                        <TodoItems todoitem={i} key={key} onDelete={props.onDelete} update={props.update} />
                    )
                })
            }
     
        </div>
    )
}