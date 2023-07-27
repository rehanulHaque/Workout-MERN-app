import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import useAuthtContext from "./hooks/useAuthContext";


function App() {
  const {user} = useAuthtContext()
  return (
    <>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={user ? <Home />: <Navigate to='/login'/>} />
          <Route path="/login" element={!user ? <Login/> : <Navigate to='/'/>} />
          <Route path="/signup" element={!user ? <Signup/> : <Navigate to='/'/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
