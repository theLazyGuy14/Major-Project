import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import OwnerDashboard from './pages/OwnerDashboard'
import NotePage from './pages/NotePage';
import Attributes from './pages/Attributes';

function App() {
  return (
    <>
      <Router>        
        <div className = "container">  
          <Header />                  
          <Routes>
            <Route path = '/' element = {<Dashboard />} />  
            <Route path = '/note' element = {<NotePage />}/>  
            <Route path = '/home' element = {<OwnerDashboard />}/>            
            <Route path = '/login' element = {<Login />} />
            <Route path = '/register' element = {<Register />} /> 
            <Route path = '/add' element = {<Attributes />}/>           
          </Routes>
        </div>
      </Router>
      <ToastContainer limit={1}/>
    </>
    
  );
}

export default App;
