import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function OwnerDashboard() {
  const navigate = useNavigate()

  const {user} = useSelector( (state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  },[user, navigate])

  return (
    <>
      <section className = 'heading'>
        <h1> Welcome {user && user.name} </h1>
        <p> Add user attributes </p>
        <Link className = 'btnn' to = '/add' target = '_blank'> Add </Link>        
      </section>      
      <section className = 'heading'>
        <p> Notes Dashboard </p>        
        <Link className = 'btnn' to = '/note' target = "_blank"> Secret </Link>
      </section>      
    </>   
  )
}

export default OwnerDashboard