import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { policy, reset } from "../features/notes/noteSlice"
import { FaUserSecret } from "react-icons/fa"
import { TbLockAccess } from 'react-icons/tb'
import Spinner from "../components/Spinner"

function NotePage() {
    const [formData, setFormData] = useState({
        secret : '',
        attributes : ''
    })

    const { secret, attributes } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.note)

    useEffect( () => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess) {
            toast.success(' Generated Policy ')

            setFormData({...formData, secret : '', attributes : ''})
        }
        if(!user) {
           navigate('/') 
        }
        if(user) {
            if(JSON.stringify(user.email.split('@')[0]) !== JSON.stringify("chairman")) {
                navigate('/')
                toast.error(' Not authorized ')                
            }
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, formData, navigate, dispatch])

    const onChange = (event) => {
        const {name, value} = event.target

        setFormData({...formData, [name] : value})
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const policyData = {
            user,
            secret,
            attributes
        }

        dispatch(policy(policyData))
    }

    if(isLoading) {
        return <Spinner />
    }

  return <>
    <div className = 'page-content'>
        <div className = 'form-content'>
            <form onSubmit = {onSubmit} className = 'form-detail'>
                <div className = 'form-position'>
                    <div className = 'heading'>
                        <h2>
                            <FaUserSecret /> Secret
                        </h2>
                    </div>
                    <div className = 'form-row'>
                        <input 
                            type = 'text'
                            id = 'secret'
                            name = 'secret'
                            value = {secret}
                            placeholder = 'Enter secret text'
                            autoComplete = 'off'
                            onChange = {onChange}
                        />
                    </div>
                    <div className = 'heading'>
                        <h2>
                            <TbLockAccess /> Access Policy
                        </h2>
                    </div>
                    <div className = 'form-row'>
                        <input 
                            type = 'text'
                            id = 'attributes'
                            name = 'attributes'
                            value = {attributes}
                            placeholder = 'Attribute List'
                            autoComplete = 'off'
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

export default NotePage