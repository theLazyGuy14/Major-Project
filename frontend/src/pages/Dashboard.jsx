import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { decrypt, reset } from "../features/notes/noteSlice"
import Spinner from "../components/Spinner"
import { redirect } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.note)

  useEffect(() => { 
    if(isError) {
      toast.error(message)
    }
    if(isSuccess) {
      console.log(message)
      toast.success(' Secret : '+message.message)
    }    
    if(user) {
      if(JSON.stringify(user.email.split('@')[0]) === JSON.stringify("chairman")) {
        navigate('/home')
      }
      else {
        navigate('/')
      }
    } 
    if(!user) {
      navigate('/login')
    }      
   

    dispatch(reset())

  },[user, isError, isSuccess, message, navigate, dispatch])   

  const onSubmit = (event) => {
    event.preventDefault()  
    
    const userData = {
      user,
    }

    dispatch(decrypt(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className = "heading">
        <h1> Welcome {user && user.name} </h1>
        <p> Click below to access secret </p>
        <form onSubmit = {onSubmit}>
          <button type = 'submit' className = 'btn signIn'> Access </button>
        </form>
      </section>
    </>
  )
}

export default Dashboard