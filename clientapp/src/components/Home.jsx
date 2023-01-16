import React,{useState,useEffect} from 'react'

const Home = () => {
  const [show, setShow] = useState(false);
  const [username,setUsername] = useState('');
  //checking for user login or not
  const  userHomepage= async ()=>{
     try{
    const res= await fetch("/getdata",{
     method:"GET",
     headers:{
     
      "Content-Type": "application/json"
     },
     
    });
   //getting data from backend and setting in  
  const data=await res.json();
  
  setUsername(data.name);
  setShow(true);
  //if we are not getting data form req.rootUser
  
   
  }
     catch(err){
      console.log(err);
      
     }
  }
     useEffect(() => {
      userHomepage();  
     },[]);

  return (
    <>
 <div className="home-page ">
  
  <div className="home-div">
    <p className='pt-5 home_title'>WELCOME</p>
    <h1>{username}</h1>
    <h3> {show ?'Welcome back again' :'THE MERN PROJECT HOME PAGE'}</h3>
    
  </div>
 </div> 
    </>
    
  )
}

export default Home