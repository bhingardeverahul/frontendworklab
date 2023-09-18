import React from 'react'
import { useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

function Resetpassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()
    // axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BASE_URI}/resetpassword/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-info " style={{marginLeft:"350px",marginTop:"130px",boxSizing:"content-box",width:"780px",height:"650px"}}>
      <div className="bg-white p-5 rounded w-50">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              style={{marginLeft:"-12px"}}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={{marginLeft:"-12px"}} className="btn btn-success w-100 rounded-0">
            Update
          </button>
          </form>
        
      </div>
    </div>
    )
}

export default Resetpassword;
