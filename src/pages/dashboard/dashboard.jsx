import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import EventList from '../../components/EventCard/EventList';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };
  return (
    <>
    
    <Navbar/>
    <EventList onEventClick={handleEventClick}/>
    </>
  )
}

export default Dashboard;