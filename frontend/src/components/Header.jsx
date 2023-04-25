import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className = 'header'>
        <div>
            <Link to = '/' className = "logo"> NoteSetter </Link>
        </div>
        <ul>
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
        </ul>
        
    </header>
  )
}

export default Header