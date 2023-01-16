import React,{useState,useEffect} from 'react'

const Contact = () => {

  
const [userdata,setUserData] = useState({
  name:"",
  email:"",
  phone:"",
  message:"",
});
//checking for user login or not
const  userContact= async ()=>{
   try{
  const res= await fetch('/getdata',{
   method:"GET",
   headers:{
   
    "Content-Type": "application/json"
   },
   
  });
 //getting data from backend and setting in  
const data=await res.json();

setUserData({...userdata,name:data.name, email:data.email, phone:data.phone});
//if we are not getting data form req.rootUser

  if(!res.status === 200 ){
    const error= new Error(res.error);
    throw error;
  }
}
   catch(err){
    console.log(err);
    
   }
}
   useEffect(() => {
    userContact();  
   },[]);

   //storing data in state
   
   const changeHandler=(e)=>{
    const name=e.target.name;
    const  value= e.target.value;
    setUserData({...userdata,[name]:value});
   }
   //sending data to backend 
const contactForm=async (e)=>{
  e.preventDefault();
  const {name,email,phone,message}=userdata;
const res= await fetch("/contact",{
  method:"POST",
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,email,phone,message
  })
});
const data=await res.json();
if(!data){
  console.log("message not send!");
}
else{
  alert("Message send");
  setUserData({...userdata, message:" "});
}

}

  return (
    <>
      <div className='contact-info'>
        <div className="container-fluid">
          <div className='row'>
            <div className='col-lg-10 offset-lg-1 d-flex justify-content-between mt-3'>
              {/* //phone no */}
              <div className='contact_info_item  ' style={{ width: "18rem" }}>
                <i className="zmdi zmdi-phone"></i>
                <div className='contact_info_content'>
                  <div className='contact_info_title'>Phone
                  </div>
                  <div className='contact_info_text'>+91 1111 234 567
                  </div>
                </div>
              </div>
              {/* //contact Email */}
              <div className='contact_info_item  ' style={{ width: "18rem" }}>
              <i className="zmdi zmdi-email"></i>
                <div className='contact_info_content'>
                  <div className='contact_info_title'>Email
                  </div>
                  <div className='contact_info_text'>abhi@gmail.com
                  </div>
                </div>
              </div>
              {/* //contact address */}
              <div className='contact_info_item  ' style={{ width: "18rem" }}>
              <i className="zmdi zmdi-file"></i>
                <div className='contact_info_content'>
                  <div className='contact_info_title'>Address
                  </div>
                  <div className='contact_info_text'>+91 1111 234 567
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* //contact form */}
      <div className='contact-form'>
        <div className='container'>
          <div className='row  '>
            <div className='col-lg-10 offset-lg-1' >
              <div className='contact_form_container py-3'>
                <div className='contact_form_title mb-3'>
                  Get in Touch</div>
                  <form id='contact_form' method='POST'>
                    <div className='contact_form_name d-flex justify-content-between align-items-betwwen'>
                      <input  type="text" id='contact_form_name'
                       className='contact_form_name input_field'  
                       onChange={changeHandler}
                       name='name'
                       value={userdata.name}
                       placeholder='Name' required={true}/>
                       <input type="email" id='contact_form_email'
                       className='contact_form_email input_field'  
                       onChange={changeHandler}
                       name='email'
                       value={userdata.email}
                       placeholder='Email' required={true}/>
                        <input type="number" id='contact_form_number'
                       className='contact_form_number input_field'  
                       name='phone'
                       value={userdata.phone}
                       onChange={changeHandler}
                       placeholder='phone number' required={true}/>
                    </div>
                    <div className='contact_form_text mt-4'>
                      <textarea className="text_field contact_form_message"
                      onChange={changeHandler}
                      name='message'
                      value={userdata.message}
                       placeholder='Message' cols="30" rows="10"></textarea>
                    </div>
                    <div className='contact_form_button'>
                      <button type='submit' className='btn btn-primary' onClick={contactForm}>Send Message</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact