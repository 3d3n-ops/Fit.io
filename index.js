// File: /pages/api/workouts/[userId].js

import { db } from '../../../path-to-your-firebase-config'; // Adjust the path as needed


export default async function handler(req, res) {
  const { userId } = req.query;

  switch (req.method) {
    case 'POST':
      // Handle creating a new workout
      try {
        const { workout } = req.body;
        const docRef = db.collection('users').doc(userId).collection('workouts').doc();
        await docRef.set({
          ...workout,
          date: new Date(workout.date) // Ensure date is properly formatted
        });
        res.status(201).send({ message: 'Workout logged successfully!' });
      } catch (error) {
        res.status(500).send({ error: 'Failed to log workout' });
      }
      break;

    case 'GET':
      // Handle retrieving workouts
      try {
        const snapshot = await db.collection('users').doc(userId).collection('workouts').get();
        const workouts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(workouts);
      } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve workouts' });
      }
      break;

    case 'DELETE':
      // Handle deleting a specific workout
      const { workoutId: deleteWorkoutId } = req.query;
      try {
        await db.collection('users').doc(userId).collection('workouts').doc(deleteWorkoutId).delete();
        res.status(200).send({ message: 'Workout deleted successfully!' });
      } catch (error) {
        res.status(500).send({ error: 'Failed to delete workout' });
      }
      break;

    case 'PUT':
      // Handle updating a specific workout
      const { workoutId: updateWorkoutId } = req.query;
      try {
        const { workout } = req.body;
        await db.collection('users').doc(userId).collection('workouts').doc(updateWorkoutId).update({
          ...workout,
          date: new Date(workout.date) // Ensure date is properly formatted
        });
        res.status(200).send({ message: 'Workout updated successfully!' });
      } catch (error) {
        res.status(500).send({ error: 'Failed to update workout' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}


