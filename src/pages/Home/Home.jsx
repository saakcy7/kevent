import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import EventList from "../../components/EventCard/EventList";
import { useNavigate } from "react-router-dom";
function Home() 
{
  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate('/signup');
  };
  return (
    <div>
      <Navbar />
     <EventList onEventClick={handleEventClick}/>
    </div>
  );
}

export default Home;
