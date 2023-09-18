import React from 'react'
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios'

function Forgotpassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    // axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BASE_URI}/forgotpassword`, {email})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
            }
        }).catch(err => console.log(err))
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-info " style={{marginLeft:"350px",marginTop:"130px",boxSizing:"content-box",width:"780px",height:"650px"}}>
      <div className="bg-white p-5 rounded w-50">
        <h4>Forgot Password</h4>
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
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              style={{marginLeft:"-14px"}}
            />
          </div>
          <button type="submit" style={{marginLeft:"-12px"}} className="btn btn-success w-100 rounded-0">
            Send
          </button>
          </form>
        
      </div>
    </div>
    )
}
export default Forgotpassword;