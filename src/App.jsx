import './App.css'
import { useState, useEffect } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import AdminDashboard from './Components/AdminDashboard'
import AddEmployee from './Components/AddEmployee'
import Navigation from './Components/Navigation'
import { 
  Users,
  MessageCircle,
  DollarSign,
  SidebarOpen,
  BuildingIcon
} from 'lucide-react';


function App() {

    const [isNavActive, setIsNavActive] = useState(true);

    const toggleNavigation = () => {
      setIsNavActive(!isNavActive);
    };
  return (
    <>
    <Navigation isActive={isNavActive} />
    <div className="topbar">
          <div className="toggle" onClick={toggleNavigation}>
            <SidebarOpen />
          </div>
          <div className="search">
            <label>
              <input className='search-box' type="text" placeholder="Search here" />
              <button className='search-btn'>Search</button>
            </label>
          </div>
        </div>
      <Routes>
        <Route path='/' element={<AdminDashboard/>}></Route>
        <Route path='/add-employee' element={<AddEmployee/>}></Route>
        
      </Routes>
     
    </>
  )
}

export default App
