import React, { useEffect, useState } from 'react'
import {useParams,Link} from 'react-router-dom'

const EmailVerify = () => {
    const [valideUrl, setValideUrl] = useState(false)
//    const navigate=useNavigate()
const {token} = useParams()


useEffect(() => {
const verifyEmail=async()=>{
        const response=await fetch(`${process.env.REACT_APP_BASE_URI}/verify/${token}`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },

        })
        const json=await response.json()
        if(json.success){
            console.log(json)
            setValideUrl(true)
        }
            
    
}
verifyEmail()
    }, [token])
  return (

    <>
    {valideUrl?(
        <>
        <div className='d-flex justify-content-center ' style={{paddingTop:"120px"}}> 
            {/* <img src={success} alt="img" style={{width:"40px",height:"30px",marginLeft:"140px"}}/> */}
            <h2 style={{display:"flex",justifyContent:"center"}}>Your email has been verified successfully....! ✔</h2>
        </div>
            <br/>
			 {/* <button onClick={navigate("/login")} className='border border-dark my-12'style={{marginTop:"80px"}} >&larr;Go to Login page </button> */}
             <Link to="/login"> Go to Login</Link>
   </>
        ):" "
    }
        {/* (
            <h1 className=' d-flex justify-content-center'>404:Pages is Not Found </h1>
        ) */}
      
    </>
  )
}

export default EmailVerify
