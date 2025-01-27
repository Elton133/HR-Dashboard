import React, { useState, useEffect } from 'react'
import 'boxicons/css/boxicons.min.css';
import './AddEmployee.css'
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeToEdit = location.state?.employee;
  const isEditing = !!employeeToEdit;

  const [employee, setEmployee] = useState({
    name: "", 
    email: "", 
    position: "", 
    department: "", 
    startDate: "", 
    photo: ""
  });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEmployee({...employee, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (isEditing) {
      // Update existing employee
      const updatedEmployees = employees.map(emp => 
        emp.email === employeeToEdit.email ? employee : emp
      );
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      toast.success("Employee Updated Successfully");
    } else {
      // Add new employee
      localStorage.setItem("employees", JSON.stringify([...employees, employee]));
      toast.success("Employee Added Successfully");
    }

    setEmployee({name: "", email: "", position: "", department: "", startDate: "", photo: ""});
    navigate('/');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          photo: reader.result, 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div><Toaster position="top-center"/></div>
      <div className='header'>
        <h3>{isEditing ? 'Edit Employee' : 'Add Employee'}</h3>
        <p>{isEditing ? 'Update employee information' : 'Create a new contract for employee'}</p>
      </div>
      
      <form className="add-employee-form" onSubmit={handleSubmit}>
        <p>Personal Detail <i className='bx bx-user'></i></p>
        <div className='input-wrapper'>
          <input 
            className="input-box" 
            type="text" 
            name='name' 
            placeholder='Enter Full Name' 
            value={employee.name}
            onChange={handleChange} 
            required 
          />
          <i className='bx bx-user'></i>
        </div>
        
        <p>Work Details <i className='bx bx-briefcase'></i></p>

        <div className='input-wrapper'>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={employee.email}
            onChange={handleChange} 
            required 
            className="input-with-icon" 
          />
          <i className='bx bx-envelope'></i>
        </div>

        <div className='input-wrapper'>
          <input 
            className="input-box" 
            type="text" 
            name='position' 
            placeholder='Position' 
            value={employee.position}
            onChange={handleChange} 
            required
          />
          <i className='bx bx-briefcase'></i>
        </div>
        
        <div className="input-wrapper">
          <select
            name="department"
            value={employee.department}
            onChange={handleDepartmentChange}
            required
          >
            <option value="" disabled>Choose a department</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
            <option value="Retail Banking">Retail Banking</option>
            <option value="Teller">Teller Department</option>
          </select>
        </div>
        
        <div className="date-picker-container input-wrapper">
          <input 
            type="date" 
            name="startDate" 
            id="startDate" 
            value={employee.startDate}
            onChange={handleChange} 
            required 
            className="date-input"
            placeholder='Date'
          />
          <i className='bx bx-calendar'></i>
        </div>

        <div className="input-wrapper">
          <p>Upload Image</p>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="file-input border-gray-300 p-2 rounded w-full"
          />
        </div>

        <button className='get-started' type='submit'>
          {isEditing ? 'Update Employee' : 'Add Employee'}
        </button>
        
        <button 
          className='get-started' 
          type='button' 
          onClick={() => navigate('/')}
          style={{ marginTop: '10px', backgroundColor: '#6c757d' }}
        >
          Cancel
        </button>
      </form>
    </>
  )
}

export default AddEmployee