// App.jsx
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
import toast from 'react-hot-toast';

function App() {
  const [employees, setEmployees] = useState([]); 
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isNavActive, setIsNavActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
    setFilteredEmployees(storedEmployees);
  }, []);

  const handleEmployeeClick = (emp) => {
    setSelectedEmployee(emp);
    setSearchQuery(""); // Clear search after selection
    setFilteredEmployees([]); // Clear suggestions after selection
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    if (query.trim() === '') {
      setFilteredEmployees([]);
      return;
    }

    const filtered = employees.filter(employee => 
      employee.name.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredEmployees(filtered);
    if (filtered.length === 0 && query !== '') {
      toast.error("No employees found");
    }
  };

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
            <input 
              className='search-box' 
              type="text" 
              placeholder="Search employee" 
              value={searchQuery} 
              onChange={handleSearch}
            />
            {searchQuery && filteredEmployees.length > 0 && (
              <div className="suggestions">
                {filteredEmployees.map((employee) => (
                  <div 
                    key={employee.id} 
                    className="suggestion-item" 
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    {employee.name}
                  </div>
                ))}
              </div>
            )}
            <button className='search-btn'>Search</button>
          </label>
        </div>
      </div>
      <Routes>
        <Route 
          path='/' 
          element={
            <AdminDashboard
              employees={employees}
              setEmployees={setEmployees}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              handleEmployeeClick={handleEmployeeClick}
              isNavActive={isNavActive}
            />
          }
        />
        <Route path='/add-employee' element={<AddEmployee />} />
      </Routes>
    </>
  )
}

export default App