import React,{useState , useContext} from 'react'
import login from "../images/login.jpg"
import { NavLink,useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
const Login = () => {
//caling context for navbarlast
const {state,dispatch} = useContext(UserContext);
  
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //loginn user function
  const loginUser= async (e)=>{
    e.preventDefault();
    const res=await fetch("/signin",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({
        email,
        password
      })
    });
    const data=await res.json();
    
    if(res.status === 400 || !data){
      window.alert("invalid Credentials");
    }
    else{
      dispatch({type:"USER",payload:true});
      window.alert("login successful");
      navigate("/");
    }

  }
  return (
   <>
   <section className='login' >
    <div className='container mt-5 login-div ' style={{width: "50%",height:"60vh"}}>
      <div className='signup-cotent d-flex justify-content-evenly align-items-center flex-row'>
      <div className='signup-image d-flex justify-content-center align-item-center mt-5 flex-column ' style={{width:"40%"}}>
            <figure>
              <img src={login} alt="login" style={{width:"90%",height:"auto"}} />
            </figure>
           <NavLink to="/signup" className="signup-image-link">Create an Account</NavLink>
      </div>
        <div className='signup-form d-flex justify-content-center align-items-center flex-column '>
          <h2 className='form-title text-warning mb-5' >LOGIN</h2>
          <form method='POST' className='register-form d-flex justify-content-center align-item-center flex-column' id='register-form'>
          
            <div className='form-group mb-3'>
              <label htmlFor="email" ><i className="zmdi zmdi-email material-icon-name"></i></label>
            <input type="email" name='email'  onChange={(e)=>{setEmail(e.target.value)}} value={email} id='email' autoComplete='off' class="form-control"  placeholder=' your email' />
            </div>
          
            <div className='form-group mb-3'>
              <label htmlFor="password" ><i className="zmdi zmdi-lock material-icon-name"></i></label>
            <input type="text" name='password' onChange={(e)=>{setPassword(e.target.value)}} value={password} id='password' autoComplete='off' class="form-control" placeholder='password' />
            </div>
            
            <div className='form-group form-btn'>
              <input type="submit" name='login' id='login' className='form-submit btn btn-primary' 
              value="LOG IN" 
              onClick={loginUser}
              />
            </div>
          </form>
          </div>  
      </div>
    </div>
   </section>
   </>
  )
}

export default Login