import { useState,useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"

function Login() {
    const [formData, setFormData] = useState({        
        email : '',
        password : '',        
    })

    const { email, password } = formData

    const onChange = (event) => {
        const { name, value } = event.target

        setFormData({...formData, [name] : value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
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
                            <button type = 'submit' class = 'btn signIn'> Submit </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  
}

export default Login