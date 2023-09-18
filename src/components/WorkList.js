import { useContext,useEffect, useRef, useState } from "react"
import { contextData } from "../App"
import { useNavigate } from "react-router-dom"
import "./stlye.css"
import Swal from 'sweetalert2'

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const WorkList = () => {
    const Navigate=useNavigate()
    const [test, setTest] = useState({id:"",etitle:"",edescription:"",etask:""})
    const context = useContext(contextData)
    const {details,FetchAllTask,UpdateAllTask,DeleteAllTask}=context;
    useEffect(() => {
  
        if (localStorage.getItem("token")) {
          FetchAllTask()

        }else{
            Navigate("/login")
          }
    // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null)
    
const ClickOnModal=(editText)=>{
  ref.current.click()
  // UpdateAllTask("updated edit works")
  setTest({id:editText._id,etitle:editText.title,edescription:editText.description,etask:editText.task})
}

const handleChange=(e)=>{
setTest({...test,[e.target.name]:e.target.value})
}
const handleClick =(e)=>{
e.preventDefault()
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been Updated',
  showConfirmButton: false,
  timer: 1500
})
// toast.success("Updated succesfully...!",{position:"top-left",theme:"dark"})
UpdateAllTask(test.id,test.etitle,test.edescription,test.etask)
refclose.current.click()
}

  return (
    <>
    {/* <!-- Button trigger modal --> */}
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">UPDATE YOUR WORK</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="d-flex justify-content-center">

<div className="formcontainer ">
      <form className="form" style={{marginLeft:"-35px",height:"400px",width:"350px"}}>
        <div className="formgroup">
          <label htmlFor="etitle">Company Work Title</label>
          <input type="text" id="etitle" onChange={handleChange} value={test.etitle} name="title" required=""/>
        </div>
        <div className="formgroup">
          <label htmlFor="textarea">How Can We Help You?</label>
          <textarea onChange={handleChange} name="edescription" id="edescription" value={test.edescription} rows="10" cols="50"   required="">          </textarea>
        </div>
        <div className="formgroup">
          <label htmlFor="etask">Project Work</label>
          <input type="text" id="etask" onChange={handleChange} value={test.etask} name="etask" required=""/>
        </div>
    
        
      </form>
    </div>
    </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={refclose} data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Work</button>
      </div>
    </div>
    {/* <ToastContainer/> */}
  </div>
</div>
<div>
    <h1 className='d-flex justify-content-center ' style={{color:"skyblue",marginLeft:"550px"}}>Project Works of Employees</h1>

</div>
    <table className="table table-bordered border-primary" style={{marginLeft:"230px"}}>
    <thead>
        <tr >
            <th ><b style={{display:"flex",justifyContent:"center"}}>Title</b></th>
            <th ><b style={{display:"flex",justifyContent:"center"}}>Discription</b></th>
            <th ><b style={{display:"flex",justifyContent:"center"}}>Task</b></th>
            <th ><b style={{display:"flex",justifyContent:"center"}}>Action</b></th>
        </tr>
        </thead>
      {
        details && details.map && details.map((item,index)=>{
            return (   
        <tbody key={index}>
            <tr>
                <td><p>{item.title}</p></td>
                <td><p>{item.description}</p></td>
                <td><p>{item.task}</p></td>
                <td className="d-flex  justify-content-center gap-2">
                <i className="far fa-trash-alt mx-2" onClick={()=>{DeleteAllTask(item._id); Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been Deleted',
    showConfirmButton: false,
    timer: 1500
  })}}></i><i className="far fa-edit mx-2" onClick={()=>{ClickOnModal(item)}}></i></td>
            </tr>
        </tbody>
            )
        })
      }
</table>
    </>
  )
}

export default WorkList
