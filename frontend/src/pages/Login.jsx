import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Login() {
    const [formData, setFormData] = useState({        
        email : '',
        password : '',        
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth)

    useEffect( () => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {            
            if(JSON.stringify(user.email.split('@')[0]) === JSON.stringify("chairman")) {
                navigate('/home')
            }
            else {
                navigate('/')
            }            
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (event) => {
        const { name, value } = event.target

        setFormData({...formData, [name] : value})
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }
    
    return <>
        <div className = 'page-content'>
            <div className = 'form-content'>
                <form onSubmit = {onSubmit} className = 'form-detail'>
                    <div className = 'form-position'>
                        <div className = "heading">
                            <h2> 
                                <FaSignInAlt />  Login 
                            </h2>
                            <p> Welcome Back ! </p>
                        </div>                                                
                        <div className = 'form-row'>
                            <input 
                                type = 'email' 
                                id = 'email'
                                name = 'email'
                                value = {email}
                                placeholder = 'Enter your email'
                                onChange = {onChange}
                            />
                        </div>
                        <div className = 'form-row'>
                            <input 
                                type = 'password' 
                                id = 'password'
                                name = 'password'
                                value = {password}
                                placeholder = 'Enter password'
                                onChange = {onChange}
                            />
                        </div>                        
                        <div className = 'form-last'>
                            <button type = 'submit' className = 'btn signIn'> Submit </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  
}

export default Login