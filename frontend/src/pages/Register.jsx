import { useState,useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from "react-icons/fa"
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Register() {
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : '',
        password2 : ''
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth)

    useEffect( () => {
        if(isError) {
            toast.error(message)
        }

        // if(isSuccess || user) {
        //     navigate('/')
        // }
        if(isSuccess) {
            toast.success(' Successfully Registered ')

            setFormData({...formData, name : '', email : '', password : '', password2 : ''})
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, formData, navigate, dispatch])

    const onChange = (event) => {
        const { name, value } = event.target

        setFormData({...formData, [name] : value})
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error(' Passwords do not match ')
        } else {
            const userData = { name, email, password }

            dispatch(register(userData))            
        }
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
                                <FaUser />  Register 
                            </h2>
                            <p> Please create an account </p>
                        </div>                        
                        <div className = 'form-row'>
                            <input 
                                type = 'text' 
                                id = 'name'
                                name = 'name'
                                value = {name}
                                placeholder = 'Enter your name'
                                onChange = {onChange}
                            />
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
                        <div className = 'form-row'>
                            <input 
                                type = 'password' 
                                id = 'password2'
                                name = 'password2'
                                value = {password2}
                                placeholder = 'Confirm password'
                                onChange = {onChange}
                            />
                        </div>
                        <div className = 'form-last'>
                            <button className = 'btn signIn'> Submit </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  
}

export default Register