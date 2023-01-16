import React,{useEffect,useState} from 'react'
import userpic from "../images/user.png"
import userpic1 from "../images/user1.jpg";
import {useNavigate} from 'react-router-dom';

const About = () => {
const navigate = useNavigate();
const [userdata,setUserData] = useState({});
//checking for user login or not
const callaboutPage= async ()=>{
   try{
  const res= await fetch('/about',{
   method:"GET",
   headers:{
    Accept: "application/json" ,
    "Content-Type": "application/json"
   },
   credentials:"include"
  });
 //getting data from backend and setting in  
const data=await res.json();
setUserData(data);
//if we are not getting data form req.rootUser

  if(!res.status === 200 ){
    const error= new Error(res.error);
    throw error;
  }
}
   catch(err){
    console.log(err);
    navigate('/login');
   }
}
   useEffect(() => {
    callaboutPage();  
   },[]);

  return (
    
    <>
      <div className='container emp_profile'>
        <form method="GET"className='about_form mt-5 ' style={{ width: "55%", height: "80%" }}>
          <div className='row aboutus'>
            <div className='col-md-4 user_pic_div'>
              <img src={userdata.name === "Abhishek Shukla" ?userpic1 :userpic} alt="sorry" className='user_pic' />
            </div>
            <div className='col-md-6'>
              <div className='pofile_head'>
                <h5>{userdata.name}</h5>
                <h6>Web Developer</h6>
                <p className='profile_rating mt-3 mb-5'>Ranking:<span>1/10</span></p>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a className='nav-link '  id="home-tab" data-toggle="tab" role="tab" href="#home">About</a>
                  </li>
                  <li className="nav-item">
                    <a className='nav-link active' id="profile-tab" data-toggle="tab" role="tab" href="#profile">TimeLine</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-md-2 '>
              <input type="submit" className='profile-edit-btn ' name='btnAddmore' value="edit profile" />
            </div>
          </div>
          <div className='row px-4 about-btm-row'>
            {/* //left side url */}
            <div className='col-md-4'>
              <div className='profle-work'>
                <p>WORK LINK</p>
                <a href="https://www.youtube.com/" rel="noreferrer" target="_blank">Youtube</a><br />
                <a href="https://github.com/TAbhishek-Shukla" rel="noreferrer" target="_blank">Github</a><br />
                <a href="https://in.linkedin.com/" rel="noreferrer" target="_blank">LinkedIn</a><br />
              </div>
            </div>
            {/* //right side url */}
            <div className='col-md-8 pl-5'>
              <div className='tab-content profile-tab' id='myTabContent'>
              <div className='tab-pane fade show active' id="home" role="tabpanel" aria-labelledby='home-tab'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label >USER ID</label>
                    </div>
                    <div className='col-md-6'>
                      <p>424235353563</p>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-md-6'>
                      <label >NAME</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{userdata.name}</p>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-md-6'>
                      <label >EMAIL</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{userdata.email}</p>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-md-6'>
                      <label >phone</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{userdata.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade " id="profile" role="tabpanel"  aria-labelledby='profile-tab'>
                <div className='row'>
                    <div className='col-md-6'>
                      <label >Experience</label>
                    </div>
                    <div className='col-md-6'>
                      <p>intermediate</p>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-md-6'>
                      <label >Hourly Rate</label>
                    </div>
                    <div className='col-md-6'>
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-md-6'>
                      <label >EMAIL</label>
                    </div>
                    <div className='col-md-6'>
                      <p>abhi@gmail.com</p>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-md-6'>
                      <label >phone</label>
                    </div>
                    <div className='col-md-6'>
                      <p>234234345</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default About