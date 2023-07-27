import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


const useAuthtContext = () =>{
    const context = useContext(AuthContext)
    if(!context) throw Error('useAuthContext must me used inside a AuthContextProvider')
    return context
}
export default useAuthtContext