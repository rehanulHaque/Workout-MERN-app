import React, { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import useAuthContext from '../hooks/useAuthContext'


const WorkoutForm = () => {
  const {dispatch} = useWorkoutContext()
  const {user} = useAuthContext()
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    
    const handelSubmit = async(e)=>{
      e.preventDefault()
      if(!user){
        setError('You must be logged in')
        return
      }
        const workout = {title, reps, load}

        const response = await fetch('http://localhost:3000/api/workout', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }


  return (
    <form className='create' onSubmit={handelSubmit}>
      <h3>Add a new workout</h3>

      <label>Exersize Title : </label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={emptyFields.includes('title') ? 'error': ''}/>

      <label>Load : </label>
      <input type="text" value={load} onChange={e => setLoad(e.target.value)} className={emptyFields.includes('load') ? 'error': ''}/>

      <label>Reps : </label>
      <input type="text" value={reps} onChange={e => setReps(e.target.value)} className={emptyFields.includes('reps') ? 'error': ''}/>

      <button>Add workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm
