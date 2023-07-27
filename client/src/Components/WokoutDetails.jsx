import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import useAuthContext from '../hooks/useAuthContext'

const WokoutDetails = ({workout}) => {
  const {dispatch} = useWorkoutContext()
  const {user} = useAuthContext()
  const {title, reps, load, createdAt} = workout

  const handelClick = async () =>{
    if(!user){
      return
    }
    const response = await fetch('http://localhost:3000/api/workout/'+ workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type: 'DELETE_WOTKOUT', payload: json})
    }
  }

  return (
    <div className='workout-details'>
        <h4>{title}</h4>
        <p><strong>Load (kg): </strong>{load}</p>
        <p><strong>Reps: </strong>{reps}</p>
        <p>{formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</p>
        <span onClick={handelClick}>Delete</span>
    </div>
  )
}

export default WokoutDetails
