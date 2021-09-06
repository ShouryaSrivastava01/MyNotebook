import React from 'react'
import { useState } from 'react'
import '../style/share.css'



import '../style/TodoItem.css'

export default function TodoItems({ todoitem, onDelete, update }) {
  const [shareItem, setShareItem]=useState({
    from:JSON.parse(localStorage.getItem('data')).email,
    remark:'',
    title:todoitem.title,
    desc:todoitem.desc

})
const updateShare=(e)=>{
  let name= e.target.name;
  let value= e.target.value

  setShareItem({...shareItem, [name]: value})
}
  const [shareDisplay, setShareDisplay]=useState('none')
  const [email , setEmail]=useState('')
    function float(e){
        let card=e.target
        
             
             card.onmousedown = function(event) {
              
                 card.style.position = 'absolute';
                 card.style.zIndex = 1000;
               
                 document.body.append(card);
              
                 function moveAt(pageX, pageY) {
                   card.style.left = pageX - card.offsetWidth / 2 + 'px';
                   card.style.top = pageY - card.offsetHeight / 2 + 'px';
                 }
               
                 // // move our absolutely positioned card under the pointer
                 // moveAt(event.pageX, event.pageY);
               
                 function onMouseMove(event) {
                   moveAt(event.pageX, event.pageY);
                 }
               
                 // (2) move the card on mousemove
                 document.addEventListener('mousemove', onMouseMove);
               
                 // (3) drop the card, remove unneeded handlers
                 card.onmouseup = function() {
                   document.removeEventListener('mousemove', onMouseMove);
                   card.onmouseup = null;
                 };
               
               };
             
      }
    
    const toggle=()=>{
        setDisplay('none')
    }

    const [display, setDisplay] = useState('none')
    const [bdisplay, seBtDisplay] = useState('flex')

    
    const updateColor=(color)=>{
        update(todoitem, color)
    }
    const btn =()=>{
        toggle()
        setDisplay('flex')
        seBtDisplay('none')
    }
    const send = (e) => {
      e.preventDefault();
      setShareDisplay('none')
      const put={
        email:email,
        share:shareItem
      }
     console.log(put)
      fetch('/share', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(put)
      }).then(response => response.json()).then(data => console.log(data))
  
    }
   
    return (
        <div   className="todoitem" style={{boxShadow: `0px 0px 4px 4px ${todoitem.border}` }} >
          <button className='share-btn' onClick={()=>setShareDisplay('block')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
</svg></button>
         
         <div className="share-container" style={{display: shareDisplay}}>
           <button className="close-btn" onClick={()=>setShareDisplay('none')}>✕</button>
         <form  >

                <input className="share-fields" name='email' type="text" placeholder="Id" onChange={(e)=>setEmail(e.target.value)}/>
                <textarea className="share-fields" name='remark' placeholder="Remark" onChange={updateShare} />

                <button className="send-btn" onClick={send} ><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" height="30" viewBox="0 0 512 512"><title>Exit</title><path d="M320 176v-40a40 40 0 00-40-40H88a40 40 0 00-40 40v240a40 40 0 0040 40h192a40 40 0 0040-40v-40M384 176l80 80-80 80M191 256h273" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg></button>
            </form>
         </div>
         <div className="todo-body">

                <span>{todoitem.title}</span><br />
                <p>{todoitem.desc}</p>
         </div>
        
            <div className="todo-btn">
                
                <button className="delete-btn" onClick={() =>{ onDelete(todoitem)}} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button>

                <div className="clicked-btn" style={{ display: display }} >
                    <button className="color-btn" name="color" value="red" style={{ backgroundColor: 'red' }} onClick={(e) =>updateColor(e.target.value)} />
                    <button className="color-btn" name="color" value="blue" style={{ backgroundColor: 'blue' }} onClick={(e) => updateColor(e.target.value)} />
                    <button className="color-btn" name="color" value="#91BA4D" style={{ backgroundColor: '#91BA4D' }} onClick={(e) => updateColor(e.target.value)} />
                    <button className="setColor-btn" onClick={() => { setDisplay('none'); seBtDisplay('flex') }} >OK</button>
                </div> <span className="click-btn" onClick={btn} style={{ display: bdisplay }}  >Set Color </span>
            </div>






        </div>
    )
}