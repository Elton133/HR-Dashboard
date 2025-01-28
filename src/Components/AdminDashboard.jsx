import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { 
  Users,
  MessageCircle,
  DollarSign,
  BuildingIcon
} from 'lucide-react';
import wavy from '../assets/bgg.png';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ 
  employees, 
  setEmployees, 
  selectedEmployee, 
  setSelectedEmployee, 
  handleEmployeeClick,
  isNavActive 
}) => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalEmployees(employees.length);
  }, [employees]);

  const countByDepartment = {};
  employees.forEach((employee) => {
    const department = employee.department;
    countByDepartment[department] = (countByDepartment[department] || 0) + 1;
  });

  const cardData = [
    { title: 'Total Employees', value: totalEmployees, icon: <Users /> },
    { title: 'Departments', value: Object.keys(countByDepartment).length, icon: <BuildingIcon /> },
    { title: 'Organization', value: '284', icon: <MessageCircle /> },
    { title: 'Earning', value: '$7,842', icon: <DollarSign /> },
  ];

  const handleEdit = (employee) => {
    navigate('/add-employee', { state: { employee } });
  };

  const deleteEmployee = (index) => {
    const updatedEmployees = employees.filter((_, empIndex) => empIndex !== index);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const handleDelete = () => {
    const index = employees.indexOf(selectedEmployee);
    if (index > -1) {
      toast(
        (t) => (
          <div>
            <p>Are you sure you want to delete <b>{selectedEmployee.name}</b>?</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  deleteEmployee(index);
                  setSelectedEmployee(null);
                  toast.dismiss(t.id);
                  toast.success("Employee deleted successfully");
                }}
              >
                Yes
              </button>
              <button
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => toast.dismiss(t.id)}
              >
                No
              </button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );
    }
  };

  return (
    <div className="container">
      <div><Toaster position="top-center"/></div>

      {/* Main Content */}
      <div className={`main ${isNavActive ? 'active' : ''}`}>
        {/* Cards */}
        <div className="cardBox">
          {cardData.map((card, index) => (
            <div className="card" key={index}>
              <div>
                <div className="numbers">{card.value}</div>
                <div className="cardName">{card.title}</div>
              </div>
              <div className="iconBx">
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Details Section */}
        <div className="details">
          {/* Employee List */}
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Employees</h2>
              <button 
                onClick={() => navigate('/add-employee')}
                className='get-started'
              >
                Add Employee
              </button>
            </div>
            
            {employees.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Start Date</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr 
                      key={index} 
                      onClick={() => handleEmployeeClick(emp)}
                      style={{ cursor: 'pointer' }}
                      className={selectedEmployee === emp ? 'selected-row' : ''}
                    >
                      <td>{emp.name}</td>
                      <td>{emp.position}</td>
                      <td>{emp.email}</td>
                      <td>{emp.department}</td>
                      <td>{emp.startDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-employees">
                <p>No employees available.</p>
              </div>
            )}
          </div>
                
          {/* Employee Details Card */}
          <div className="recentCustomers">
            <div className="cardHeader">
              <p className='employee-card-title'>Employee Details</p>
            </div>
            <table>
              {selectedEmployee ? (
                <div className="card1">
                  <img className="waves" src={wavy} alt="" />
                  <img className="avatar" src={selectedEmployee.photo} alt="" />
                  <div className="details1">
                    <p className="name">Name: {selectedEmployee.name}</p>
                    <p className="title">
                      <b>Position</b>: {selectedEmployee.position}
                    </p>
                    <p className="info">
                      <b>Email</b>: {selectedEmployee.email}
                    </p>
                    <p className="info">
                      <b>Department</b>: {selectedEmployee.department}
                    </p>
                    <p className="info">
                      <b>Start Date</b>: {selectedEmployee.startDate}
                    </p>
                  </div>
                  <div className="links">
                    <a href={`mailto:${selectedEmployee.email}`} id="X">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#4caf50"
                          d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
                        ></path>
                        <path
                          fill="#1e88e5"
                          d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
                        ></path>
                        <polygon
                          fill="#e53935"
                          points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
                        ></polygon>
                        <path
                          fill="#c62828"
                          d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
                        ></path>
                        <path
                          fill="#fbc02d"
                          d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div className='edit-delete-btn'>
                    <button onClick={() => handleEdit(selectedEmployee)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                  </div>
                </div>
              ) : (
                <p className='employee-card-title'>Select an employee to view details</p>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;