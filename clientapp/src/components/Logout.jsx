import React,{useEffect,useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../App';

const Logout = () => {
const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    //promises
    useEffect(() => {
    fetch("/logout",{
        method:"GET",
        headers:{
            Accept: "application/json" ,
            "Content-Type": "application/json"
           },
           credentials:"include"
    }).then((res)=>{
        dispatch({type:"USER",payload:false});
       navigate('/login',{replace:true});
       if(!res.status === 200){
        throw new Error(res.error);
       }
    }).catch((err)=>{
        console.log(err);
    })
    },[]);
  return (
    <div>
      <h2>Logout</h2>
    </div>
  );
}

export default Logout;
