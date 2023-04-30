import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {BsFillChatLeftTextFill} from 'react-icons/bs'
import { addAttributes, reset } from '../features/notes/noteSlice'
import Spinner from '../components/Spinner'

function Attributes() {
    const [formData, setFormData] = useState({
        id : '',
        attributes : ''
    })

    const { id, attributes } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.note)

    useEffect( () => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess) {
            toast.success(' Added User Attributes')

            setFormData({...formData, id : '', attributes : ''})
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

        const userData = {
            id,
            attributes,
            user,
        }
        dispatch(addAttributes(userData))
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
                            <BsFillChatLeftTextFill /> Attributes
                        </h2>
                    </div>
                    <div className = 'form-row'>
                        <input 
                            type = 'text'
                            id = 'id'
                            name = 'id'
                            value = {id}
                            placeholder = ' Enter User ID '
                            autoComplete = 'off'
                            onChange = {onChange}
                        />
                    </div>
                    <div className = 'form-row'>
                        <input 
                            type = 'text'
                            id = 'attributes'
                            name = 'attributes'
                            value = {attributes}
                            placeholder = 'Enter user attributes'
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

export default Attributes