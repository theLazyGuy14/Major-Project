import { useState,useEffect } from "react"
import { FaUser } from "react-icons/fa"

function Register() {
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : '',
        password2 : ''
    })

    const { name, email, password, password2 } = formData

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
                            <button type = 'submit' class = 'btn signIn'> Submit </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  
}

export default Register