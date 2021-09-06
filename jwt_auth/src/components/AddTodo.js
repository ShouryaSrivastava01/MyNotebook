import React from 'react'
import { useState, useEffect } from 'react'
import '../style/AddTodo.css'
export default function AddTodo(props) {

    // -------------------------------------------safe area----------------------------------------------
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    
    const submit = (e) => {
        e.preventDefault()
        console.log('submit function is called')
        console.log(title, desc)
        props.addTodo(title, desc)
        setTitle('');
        setDesc('')
        props.popup('hidden')
    }

    //-----------------------------------------------------------------------------------------------------------
  
    return (

        <div className="addTodo-container" style={{visibility:props.val}}>
            <button className="close-btn" onClick={()=>props.popup('hidden')}>✕</button>
          
            <form className="addTodo-form" onSubmit={submit}>

                Title <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                Description<textarea rows="5" cols="35" value={desc} onChange={(e) => setDesc(e.target.value)} />

                <button type='submit'>Add</button>
            </form>

        </div>
    )
}