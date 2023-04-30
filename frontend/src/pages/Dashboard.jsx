import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { decrypt, reset } from "../features/notes/noteSlice"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.note)

  useEffect(() => {     
    if(user) {
      if(JSON.stringify(user.email.split('@')[0]) === JSON.stringify("chairman")) {
        navigate('/home')
      }
    } 
    else {
      navigate('/login')
    }      
    if(isError) {
      toast.error(message)
    }
    if(isSuccess) {
      toast.success(' Secret : '+message.toString())
    }

    dispatch(reset())

  },[user, isError, isSuccess, message, navigate, dispatch])   

  const onSubmit = (event) => {
    event.preventDefault()

    const userData = {
      user
    }

    dispatch(decrypt(userData))
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