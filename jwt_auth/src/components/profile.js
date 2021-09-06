import React from 'react'
import '../style/profile.css';
import AddTodo from './AddTodo';
import DisplayTodo from './DisplayTodo';

import { useHistory } from 'react-router-dom'
import Main from './Main'

import { useState, useEffect } from 'react'


export default function Profile() {

  const [content,setContent]=useState('Add your note')

  const history=useHistory()

  const [name, setName]=useState('')
  const [todos, setTodos] = useState([])
 
  const [f, setF] = useState([])
  useEffect(() => {
    setTodos(() => {
      return JSON.parse(localStorage.getItem('data')).body != null ? JSON.parse(localStorage.getItem('data')).body : []
    })
    
    setF(() => {
      return JSON.parse(localStorage.getItem('data')).body != null ? JSON.parse(localStorage.getItem('data')).body : []
    })
  }, [])
  const addTodo = (title, desc) => {
    const newTodo = {
      title: title,
      desc: desc,
      border: 'black'

    }
    setTodos([...todos, newTodo])
    
  }



  const onDelete = (todo) => {
    setTodos(todos.filter((e) => {
      return e !== todo
    })
    )

    localStorage.setItem('todos', JSON.stringify(todos))
  }
  const restore=()=>{
    
  }
  const fil=(val)=>{
   if(val==="none"){
     setF(todos)
   }
   else{

     setF(todos.filter((e)=>{
       return e.border===val
     }))
   }
  }

  const update = (todo, color) => {
    setTodos(todos.filter(e => {
      if (e === todo) {
        todo.border = color
      }
      return e;
    }))
    localStorage.setItem('todos', JSON.stringify(todos))
    setF(todos)
  }



  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    setF(todos)
  }, [todos])

  useEffect(()=>{
    setName(JSON.parse(localStorage.getItem('data')).name)
    
  },[])



  const logout = () => {
    const put = {
      _id: JSON.parse(localStorage.getItem('data'))._id,
      body: todos
    }
    fetch('/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(put)
    }).then(response => response.json()).then(data => console.log(data))

    history.push('/')
    localStorage.clear();
  }


  const [style, setStyle] = useState({
    position: 'absolute',
    bottom: "130px",
    left: "200px",
    transition: " all .5s ease-in-out",
    visibility: "visible",
    overflow: " hidden",
    transform: "translateZ(0)",
    backgroundColor:'yellow',
    zIndex:'100',
    padding: '10px',
    border:'none',
    borderRadius:' 50px',
    right: "20px",
          width: "64px",
    border: '1px solid rgb(232, 217, 4)'
  })
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY < 440) {
        setContent('Add your note')
        console.log('check')
        setStyle({
          position: 'absolute',
    border: '1px solid rgb(232, 217, 4)',

          bottom: "130px",
          left: "200px",
          transition: " all .5s ease-in-out",
          visibility: "visible",
          overflow: " hidden",
          transform: "translateZ(0)",
          backgroundColor:'yellow',
          zIndex:'100',
          padding: '10px',
          border:'none',
          right: "20px",
          width: "64px",
          borderRadius:' 50px'
        }
        )
      }
      else if (window.scrollY > 440) {
        console.log('uncheck')
        setContent('✎')
        setStyle({
          backgroundColor:'yellow',
    border: '1px solid rgb(232, 217, 4)',

          position: "fixed",
          transition: 'all .5s ease-in-out',
          bottom: '20px',
          right: "20px",
          width: "64px",
          height: "64px",
          content:'hello',
          border:'none',
          borderRadius:'50%',
          visibility: "visible",
          overflow: "hidden",
          transform: "translateZ(0)",
          zIndex:'100'
      }
      )
    }
  })
}, [])

const [val, setVal]=useState('hidden')

const popup=(a)=>{
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
 setVal(a)


}





  return (
    <>
  
      <button onClick={()=>popup(' ')} style={style}>✎</button>
      <Main  name={name}/>

      <AddTodo addTodo={addTodo} name={name} val={val} popup={popup}/>
    <div  className="profile-container">
   
      <DisplayTodo todos={f} onDelete={onDelete} update={update} fil={fil} restore={restore} /> 
    </div>
      <button className="logout-btn" onClick={logout}>Log out</button>
      <button className="shared-btn" onClick={()=>history.push(window.location.pathname+'/shared')}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"viewBox="0 0 16 16">
  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
</svg>‎  ‎  Docs</button>
      
     
    </>
  );
}

