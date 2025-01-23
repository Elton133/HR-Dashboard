import React from 'react'
import 'boxicons/css/boxicons.min.css';

import { useState } from 'react'
import './AddEmployee.css'
import toast, { Toaster } from 'react-hot-toast';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({name: "", email: "", position: "", department: "", startDate: "", photo: ""});

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setEmployee({...employee, [name]: value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    localStorage.setItem("employees", JSON.stringify([...employees, employee]));
    toast.success("Employee Added Successfully");
    setEmployee({name: "", email: "", position: "", department: "", startDate: "", photo: ""})
    
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
      <h3>Add Employee</h3>
    <p>Create a new contract for employee</p></div>
    
    <form className="add-employee-form" onSubmit={handleSubmit}>
      <p>Personal Detail <i className='bx bx-user'></i></p>
      <div className='input-wrapper'>
        <input className="input-box" type="text" name='name' placeholder='Enter Full Name' 
      onChange={handleChange} required />
      <i className='bx bx-user'></i>
      </div>
      
    <p>Work Details <i className='bx bx-briefcase'></i></p>

    <div className='input-wrapper'>
    <input 
    type="email" 
    name="email" 
    placeholder="Email" 
    onChange={handleChange} 
    required 
    className="input-with-icon" 
  />
  <i className='bx bx-envelope'></i>
  </div>
  <div className='input-wrapper'>
  <input className="input-box" type="text" name='position' placeholder='Position' onChange={handleChange} required/>
  <i className='bx bx-briefcase'></i>
  </div>
      
  <div className="input-wrapper">
  <select
  name="department"
  value={employee.department || ""}
  onChange={handleDepartmentChange}
  required
>
  <option value="" disabled>
    Choose a department 
  </option>
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

      <button className='get-started' type='submit'>Add Employee</button>
    </form>
    </>
  )
}

export default AddEmployee