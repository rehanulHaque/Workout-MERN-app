import React, { useEffect, useState } from 'react'
import WorkoutDetails from '../Components/WokoutDetails'
import WorkoutForm from '../Components/WorkoutForm'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import useAuthContext from '../hooks/useAuthContext'

const Home = () => {
  const {workouts, dispatch} = useWorkoutContext()
  const {user} = useAuthContext()
  useEffect(()=>{
    const fetchWorkout = async()=>{
      const response = await fetch('http://localhost:3000/api/workout', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    
    if(user){
      fetchWorkout()
    }
  }, [dispatch, user])
  return (
    <div className='home'>
      <div className="workouts">
      {workouts && workouts.map((workout)=>{
          return(
            <WorkoutDetails key={workout._id} workout={workout}/>
          )
        })}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home
