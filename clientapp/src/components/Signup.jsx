import React,{useState} from 'react'
import signpic from "../images/signup.jpg"
import { NavLink,useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    name:"",
    email:"",
    phone:"",
    work: "",
    password:"",
    cpassword:"",

  });
  //handling input
  let name,value;
  const handleInput=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value});
  }
const PostData=async (e)=>{
  e.preventDefault();
  const { name,email,phone,work,password,cpassword}=user;
  const res= await fetch("/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      //key and value name same .
      name,email,phone,work,password,cpassword
    })
  });
  const data= await res.json();
  if(res.status === 422 || !data){
    window.alert("Invalid Registeration");
    console.log("Invalid Registeration");
  }
  else{
    window.alert(" Registeration successful");
    console.log("registeration successful");
    navigate("/login");
  }
}
  return (
   <>
   <section className='signup' >
    <div className='container mt-5 signup-card' style={{width: "50%",height:"100%"}}>
      <div className='signup-cotent d-flex justify-content-evenly align-items-center flex-row '>
        <div className='signup-form d-flex justify-content-center align-items-center flex-column '>
          <h2 className='form-title text-warning' >Signup</h2>
          <form method='POST' className='register-form' id='register-form'>
            <div className='form-group mb-3'>
              <label htmlFor="name" ><i className="zmdi zmdi-account material-icon-name"></i></label>
            <input type="text" name='name' id='name' onChange={handleInput} value={user.name} autoComplete='off' class="form-control" placeholder='your name'   />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor="email" ><i className="zmdi zmdi-email material-icon-name"></i></label>
            <input type="email" name='email' id='email' onChange={handleInput} value={user.email} autoComplete='off' class="form-control" placeholder='email' />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor="phone" ><i className="zmdi zmdi-phone-in-talk"></i></label>
            <input type="number" name='phone' id='phone' onChange={handleInput} value={user.phone} autoComplete='off' class="form-control" placeholder='your phone' />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor="work" ><i className="zmdi zmdi-slideshow material-icon-name"></i></label>
            <input type="text" name='work' id='work' onChange={handleInput} value={user.work} autoComplete='off' class="form-control" placeholder='your profession' />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor="password" ><i className="zmdi zmdi-lock material-icon-name"></i></label>
            <input type="text" name='password' id='password' onChange={handleInput} value={user.password} autoComplete='off' class="form-control" placeholder='password' />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor="cpassword" ><i className="zmdi zmdi-lock material-icon-name"></i></label>
            <input type="text" name='cpassword' id='cpassword' onChange={handleInput} value={user.cpassword} autoComplete='off'  class="form-control" placeholder='confirm your password' />
            </div>
            <div className='form-group form-btn'>
              <input type="submit" name='signup' id='signup' className='form-submit regi-btn btn btn-primary mb-2' value="register" onClick={PostData} />
            </div>
          </form>
          </div>
          
          <div className='signup-image d-flex justify-content-center flex-column ' style={{width:"40%"}}>
            <figure>
              <img src={signpic} alt="signup" style={{width:"90%",height:"auto"}} />
            </figure>
           <NavLink to="/Login" className="signup-image-link">i am already register</NavLink>
      </div>  
      </div>
    </div>
   </section>
   </>
  )
}

export default Signup