import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector( (state) => state.auth)

    const onLogOut = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className = 'header'>
        <div>
            <Link to = '/' className = "logo"> NoteSetter </Link>
        </div>
        <ul>
            { user ? (
                <li>
                <button className = 'logOutBtn' onClick = {onLogOut}>
                    <FaSignOutAlt /> Logout
                </button>
            </li>
            ) : (
                <>
                    <li>
                        <Link to = '/login' className = "btnn">
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li>
                        <Link to = '/register' className = "btnn">
                            <FaUser /> Register
                        </Link>
                    </li>
                </>
            )}            
        </ul>
        
    </header>
  )
}

export default Header