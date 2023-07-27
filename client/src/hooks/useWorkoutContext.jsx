import { useContext } from "react";
import { WorkoutContext } from "../Context/WorkoutContext";


export const useWorkoutContext = () =>{
    const context = useContext(WorkoutContext)
    if(!context) throw Error('useWorkoutContext must me used inside a workoutContextProvider')
    return context
}

