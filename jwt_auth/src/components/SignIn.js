import React from 'react'
import '../style/signin.css'
import { Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Message from './Message'

export default function SignIn() {
  const [message, setMessage] = useState('')
  const [visibility, setVisibility] = useState('hidden')
  
  const history = useHistory()
  const [user, setUser] = useState({
    email: " ",
    password: " "
  })
  function updateForm(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value })

  }
  function submit(e) {
    e.preventDefault()
    console.log(user)
    fetch('/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => {

      if (response.status === 200) {
        response.json().then(data => {
          history.push(`/${data.name}`)
          localStorage.clear()
          localStorage.setItem('data', JSON.stringify(data))
        }
        )
      }
      else if (response.status === 500) {
        setVisibility('none')
        setMessage('user is not registered')
      }

      else {

        setVisibility('none')
        setMessage('incorrect password')
      }
    })



  }
  
  return (
    <Container className="mx-auto my-5 px-5 w-50" >

      <Form>
        <Form.Group controlId="formBasicEmail" >
          <Form.Label >Email address</Form.Label>
          <Form.Control onChange={updateForm} type="email" name="email" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={updateForm} name="password" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={submit}>
          Sign In
        </Button>
        <Button className="mx-2" variant="primary" onClick={() => history.push('/signup')}>
          Sign Up
        </Button>

      </Form>
      {
        visibility!='hidden'? <Message message={message}/> : ''
      }
      
    </Container>

  )
}


