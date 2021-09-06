import React from 'react'
import Form from 'react-bootstrap/Form'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import Message from './Message'

export default function SignUp(){
  const [message, setMessage]=useState('')
  const [visibility, setVisibility] = useState('hidden')
   const history=useHistory()
    const [newUser, setNewUser]=useState({
        name:'',
        email:'', 
        password:'',
        gender:''

    })
    function updateUser(e){
        let name= e.target.name;
        let value= e.target.value
    
        setNewUser({...newUser, [name]: value})
    }
 
  
    function submit(e){
      e.preventDefault()
      console.log(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newUser.email)) ;
      if(newUser.name.length<5){
              setMessage('User name must be greater than 3 character')
              setVisibility('')
            }
            else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newUser.email)===false){
              setMessage('invalid email format')
              setVisibility('')
              
            }
            else if(newUser.password.length<5){
       setMessage(`Password length isn't strong enough`)
       setVisibility('')
       
      }
      else if(newUser.gender.length<1){
       setMessage(`Select gender`)
       setVisibility('')

     }

         else{fetch('/register',{
          method:'POST',
          headers:{
                    'Content-Type':'application/json'
          },
          body:JSON.stringify(newUser)
        }).then(response=>{
          response.status===201?history.push('/'): alert('not registered')
        })}
      
      }
    return(
      <>
        <Form className="mx-auto my-5 px-5 w-50" >
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text"  name="name" onChange={updateUser} />
          {/* <div className='message' style={{fontSize:'12px', color:'red'}}>Bhosdike isse bhar pahle</div> */}
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" onChange={updateUser} />
          
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={updateUser}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Gender : </Form.Label>
         <Form.Check.Input className="ms-3 me-1" type="radio" name="gender" value="male" onChange={updateUser}/>Male
          <Form.Check.Input className="ms-3 me-1"type="radio" name="gender" value="female" onChange={updateUser}/>Female
         <Form.Check.Input className="ms-3 me-1"type="radio" name="gender" value="other" onChange={updateUser}/> Other
        </Form.Group>
        <Button variant="primary" onClick={submit }>
          Submit
        </Button>
      {
        visibility!='hidden'? <Message message={message}/> : ''
      }
      </Form>
</>
    )
}