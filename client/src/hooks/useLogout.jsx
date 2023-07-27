import useAuthtContext from './useAuthContext'
// import useWorkoutContext from './useWorkoutContext'


export const useLogout = () =>{
    const {dispatch} = useAuthtContext()
    // const {dispatch: workoutDispatch} = useWorkoutContext()

    const logout = async() =>{
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        // workoutDispatch({type: 'SET_WORKOUTS', payload: null})
    }
    return {logout}
}