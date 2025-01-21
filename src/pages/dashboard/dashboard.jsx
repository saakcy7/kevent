import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import EventList from '../../components/EventCard/EventList';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Include styles for layout

const Dashboard = () => {
  const navigate = useNavigate();

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul className="sidebar-links">
            <li onClick={() => handleSidebarClick('/events/clubs')}>Clubs Events</li>
            <li onClick={() => handleSidebarClick('/events/category')}>Category Events</li>
          </ul>
        </aside>
        
        {/* Main Content */}
        <main className="main-content">
          <EventList onEventClick={handleEventClick} />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
