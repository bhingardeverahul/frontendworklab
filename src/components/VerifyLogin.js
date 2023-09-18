import React from 'react'
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'
import 'animate.css';
function VerifyLogin() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    // axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`${process.env.REACT_APP_BASE_URI}/verifyLogin`, {email})
        .then(res => {
          
            // if(res.data.Status === "Success") {
              Swal.fire({
                title: 'Email has been verified ',
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
                navigate('/login')
                // }
        }).catch(err => console.log(err))
    }

    return(
      <div className="d-flex justify-content-center align-items-center bg-primary " style={{marginLeft:"350px",marginTop:"130px",boxSizing:"content-box",width:"780px",height:"650px"}}>
      <div className="bg-white p-5 rounded w-50">
        <h4>Verify Email</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              style={{marginLeft:"-12px"}}
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" style={{marginLeft:"-12px"}}
 className="btn btn-success w-100 rounded-0">
            Verify 
          </button>
          </form>
        
      </div>
    </div>
    )
}
export default VerifyLogin;