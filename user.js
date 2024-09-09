// File: /pages/user.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('/api/workouts/[userId]'); // Replace [userId] with actual user ID
        setWorkouts(response.data);
      } catch (error) {
        console.error('Failed to fetch workouts', error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleAddWorkout = async () => {
    try {
      await axios.post('/api/workouts', { userId: 'userId', workout: newWorkout }); // Replace 'userId' with actual user ID
      setWorkouts([...workouts, { workout: newWorkout }]);
      setNewWorkout('');
    } catch (error) {
      console.error('Failed to add workout', error);
    }
  };

  return (
    <div>
      <h1>User Page</h1>
      <input
        type="text"
        value={newWorkout}
        onChange={(e) => setNewWorkout(e.target.value)}
        placeholder="Enter new workout"
      />
      <button onClick={handleAddWorkout}>Add Workout</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>{workout.workout}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
