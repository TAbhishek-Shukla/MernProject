import React,{createContext,useReducer} from "react"
import 'bootstrap/dist/css/bootstrap.css'
import {Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Errorpage from "./components/Errorpage";
import Logout from "./components/Logout";
import { initialState,reducer } from "./reducer/UseReducer";

  //creating Context for NAvbar
 export const UserContext= createContext();
const Routing=()=>{
  return (
<Routes>  
<Route  exact path="/" element={<Home/>} />
<Route   path="/About" element={<About/>} />
<Route   path="/Contact" element={<Contact/>} />
<Route   path="/Signup" element={<Signup/>} />
<Route   path="/Login" element={<Login/>} />
<Route    path="*" element={<Errorpage/>}/>
<Route    path="/logout" element={<Logout/>}/>
</Routes>
  )
}



function App() {


  const [state, dispatch] = useReducer(reducer, initialState);
 
  return (

<>
  <UserContext.Provider value={{state,dispatch}}>
  <Navbar/>
  <Routing/>
</UserContext.Provider>
  </>
  );
}

export default App;
