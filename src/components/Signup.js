import React ,{useState}from 'react'
import rcss from "./signup.module.css"
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios"
import Swal from 'sweetalert2'

const Signup = () => {
  const navigate=useNavigate()
    const [credit, setCredit] = useState({name:"",email:"",password:"",images:""})
    // const [credit, setCredit] = useState({name:"",email:"",password:""})

    const handleChange=(e)=>{
        setCredit({...credit,[e.target.name]:e.target.value})
    }

    const handleUpload=(e)=>{
     console.log( "file uploaded..")
     setCredit({...credit,images:e.target.files[0]})

    }


    const handleClick=async(e)=>{
      e.preventDefault()     
      const formdata=new FormData()
      formdata.append("images",credit.images,credit.images.name)
      formdata.append("name",credit.name)
      formdata.append("email",credit.email)
      formdata.append("password",credit.password)
     const response = await fetch(`${process.env.REACT_APP_BASE_URI}/signup`,{
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
          
        // //   // "Content-Type": "multipart/form-data","boundary":"------WebKitFormBoundaryg7okV37G7Gfll2hf--"   
        // //        // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        // body :JSON.stringify({email:credit.email,name:credit.name,password:credit.password,}),
       body:formdata
      })
      // const url=`http://localhost:5000/signup`
      // const response=await axios.post(url,formdata)
        const json=await response.json()
        console.log(json)
        if(json.success){
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your registration has been successfully, Please verify your mail.            ',
            showConfirmButton: false,
            timer: 10000
          })
            localStorage.setItem("token",json.token)
            navigate("/login")
        }else{
          // if(json.success){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User not register...',
              showConfirmButton: false,
              timer: 5000
            })
          }
        console.log("user created...")
    }
    const {loginWithRedirect,}=useAuth0()
  return (
   <>
   <div style={{paddingRight:"160px"}}>

<h1 className='d-flex justify-content-center' style={{marginLeft:"250px",marginTop:"5.625rem"}}>Create an account on WorkLab</h1>
<div className="d-flex justify-content-center" >

<div className={rcss.card}  style={{marginLeft:"250px"}}>
<div className={rcss.cardheader}>
<div className={rcss.textheader}>Register</div>
</div>
<div className={rcss.cardbody}>
<form action="#" style={{marginRight:".75rem"}}>
  <div className={rcss.formgroup}>
    <label htmlFor="username">Username:</label>
    <input required=""  className="form-control" onChange={handleChange} value={credit.name} name="name" id="name" type="text"/>
  </div>
  <div className={rcss.formgroup}>
    <label htmlFor="email">Email:</label>
    <input required=""  className="form-control" onChange={handleChange} value={credit.email} name="email" id="email" type="email"/>
  </div>
  <div className={rcss.formgroup}>
    <label htmlFor="images">Upload Your Image:</label>
    <input required=""  className="form-control" onChange={handleUpload} name="images" id="images" type="file"/>
  </div>
  <div className={rcss.formgroup}>
    <label htmlFor="password">Password:</label>
    <input required="" className="form-control" onChange={handleChange} value={credit.password} name="password" id="password" type="password"/>
  </div>
 
 <input type="submit" className={rcss.btn} onClick={handleClick} style={{marginLeft:"100px"}} value="Sign Up"/>
   
 <p className='d-flex justify-content-center ' >
    </p>
    <button className={rcss.oauthButton}  onClick={(e) => loginWithRedirect()}>
                    <svg className="icon" viewBox="0 0 24 24" style={{width:"40px"}}>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            <path d="M1 1h22v22H1z" fill="none"></path>
        </svg> Continue with Google
                </button>

    </form>
</div>
</div>
</div>
   </div>
   </>

  )
}

export default Signup
