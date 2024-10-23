import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
function Home({ onSignIn }) {
  return (
    <div>
      <Navbar/>    
      <h1>Welcome to the Front Page</h1>
    </div>
  );
}

export default Home;