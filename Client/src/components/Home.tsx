// HomePage.tsx
import React from 'react';
import Navbar from '../components/NavBar';
import TaskList from '../components/tasklist/TaskList'; // Assuming you have a TaskList component

const HomePage: React.FC = () => {
  return (
    <div className='w-full'>
      <Navbar />
      {
        localStorage.getItem("authToken")?

      
      <div className="w-full">
        {/* Other content */}
        <TaskList />
      </div>:
      <div>
        <h1 className='m-10 text-3xl'>Please Login to get your tasks!</h1>
      </div>
}
    </div>
    
  );
};

export default HomePage;
