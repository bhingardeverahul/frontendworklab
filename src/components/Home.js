import React, { useState,useContext,} from 'react'
import "./stlye.css"
// import {FaTasks} from "react-icons/fa";

// import { SiDeutschebank } from 'simple-icons';
// import { useAuth0 } from "@auth0/auth0-react";
import {contextData} from "../App"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import WorkList from './WorkList';
import Swal from 'sweetalert2'
import 'animate.css';
const Home = () => {
  // const {user,isAuthenticated,loginWithRedirect,logout}=useAuth0()
// console.log(user,)



const context = useContext(contextData)
const {AddAllTask}=context
const [data, setData] = useState({title:"",description:"",task:""})

const handleChamge=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
}

const handleClick=async(e)=>{
  // Swal.fire({
  //   position: 'top-end',
  //   icon: 'success',
  //   title: 'Your work has been saved',
  //   showConfirmButton: false,
  //   timer: 1500
  // })
  Swal.fire({
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500,
    icon: 'success',

    showClass: {
      popup: 'animate__animated animate__fadeInTopRight'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
 e.preventDefault()
//  toast.success("Added successfully...!",{position:"top-left",theme: "light",})
AddAllTask(data.title,data.description,data.task)
setData({title:"",description:"",task:""})
}

  return (
    <>
    <div className='container'>
    <h1 style={{ display:"flex",justifyContent:"center",gap:"10px", filter: "drop-shadow(5px 5px 4px black)",
 color:"skyblue",
 width:"110px",
 height:"90px",
 letterSpacing:"2px",
 marginLeft:'730px',alignItems:"center"}}><i class="fa-solid fa-list-check"></i><b>WorkLab</b></h1>
    </div>
{/* {   isAuthenticated &&   <h1>HOME {user.name}</h1>}  
{
        isAuthenticated?
 <button className='border border-rounded  w-25 h-25 ' onClick={(e) => loginWithRedirect()} style={{backgroundColor:"black",color:"white",marginLeft:"120px" ,borderRadius:"12px" }}> Log with</button>:
    <button className="btn btn-dark mx-2" onClick={(e)=>logout()}  ><i className="fa-solid fa-right-from-bracket"></i> Logout</button>

      } */}
  
  
      <div className="d-flex justify-content-center" >
<div className="formcontainer " style={{marginLeft:"234px"}}>
      <form className="form">
        <div className="formgroup">
          <label htmlFor="title">Company Work Title</label>
          <input type="text" id="title" onChange={handleChamge} value={data.title} name="title" required=""/>
        </div>
        <div className="formgroup">
          <label htmlFor="textarea">How Can We Help You?</label>
          <textarea onChange={handleChamge} name="description" id="description" value={data.description} rows="10" cols="50"   required="">          </textarea>
        </div>
        <div className="formgroup">
          <label htmlFor="task">Project Work</label>
          <input type="text" id="task" onChange={handleChamge} value={data.task} name="task" required=""/>
        </div>
    
        <button className="formsubmitbtn" onClick={handleClick} type="submit">Submit</button>
        {/* <ToastCont ainer/> */}
      </form>
    </div>
    </div>
    <WorkList />
    </>
  )
}

export default Home
