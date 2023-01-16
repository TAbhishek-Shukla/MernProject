import React,{useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom"
import logo from "../images/log1.png"
import { UserContext } from '../App';


const Navbar = () => {
const {state} = useContext(UserContext);

  const RenderMenu=()=>{
      if(state){
        return (
          <>
          
          <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/About">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Contact">Contact</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li>
          
          </>
        )
      }else{
        return(<>
         <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/About">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Contact">Contact</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Signup">Register</NavLink>
        </li>
       
        
        </>)
      }
  }
  return (
  <>
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#"><img src={logo} style={{width:"10%",height:"70%"}} alt="LOGO" /></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  ms-auto ">
       <RenderMenu />
        
      </ul>
    </div>
  </div>
</nav>
  </>
  )
}

export default Navbar