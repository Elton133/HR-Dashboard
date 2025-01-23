import React from 'react'
import './AdminDashboard.css'
import { 
    Users, 
    LogOut,
    Menu,
    SidebarOpen,
    MessageCircle,
    DollarSign,
    LayoutDashboard,
    BuildingIcon
  } from 'lucide-react';

const Cards = ({totalEmployees, countByDepartment}) => {
    const cardData = [
        { title: 'Total Employees', value: totalEmployees , icon: <Users /> },
        { title: 'Departments', value: Object.keys(countByDepartment).length, icon: <BuildingIcon /> },
        { title: 'Organization', value: '284', icon: <MessageCircle /> },
        { title: 'Earning', value: '$7,842', icon: <DollarSign /> },
      ];
  return (
  
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
        
  )
}

export default Cards