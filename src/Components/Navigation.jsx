import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

const Navigation = ({ isActive, hoveredIndex, setHoveredIndex }) => {
  const navigationItems = [
    { icon: <LayoutDashboard />, title: 'Dashboard', to:'/' },
    { icon: <Users />, title: 'Employees', to: 'add-employee' },
    { icon: <LogOut />, title: 'Sign Out' },
  ];
  const toggleNavigation = () => {
    setIsNavActive(!isNavActive);
  };
  return (
    <div className={`navigation ${isActive ? 'active' : ''}`}>
      <ul>
        <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="logo-apple"></ion-icon>
            </span>
            <span className="title">TeamVault</span>
          </a>
        </li>
        {navigationItems.map((item, index) => (
          <li 
            key={index}
            className={hoveredIndex === index ? 'hovered' : ''}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link to={item.to}>
              <span className="icon">
                {item.icon}
              </span>
              <span className="title">{item.title}</span>
            </Link> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;