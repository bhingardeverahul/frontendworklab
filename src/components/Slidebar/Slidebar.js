import React ,{useState} from 'react'
import {FaBars,FaTasks,FaUserAlt,FaHome,FaSignInAlt,FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
const Slidebar = ({children}) => {
 const Navigate= useNavigate()
  const handleLogout =()=>{
    localStorage.removeItem('token');
   Navigate("/login")
  }
  const menuItems=[
    {
    path:"/",
    name:"Home",
    icon:<FaHome/>
  },
    {
    path:"/about",
    name:"About",
    icon:<FaUserAlt/>
  },
    {
    path:"/signup",
    name:"Signup",
    icon:<FaSignInAlt/>
  },
    {
    path:"/login",
    name:"Login",
    icon:<FaSignOutAlt/>
  },
 
]


const[isOpen ,setIsOpen] = useState(false);
const toggle = () => setIsOpen (!isOpen);
  return (
    <div className="container">
           <div style={{width: isOpen ? "500px" : "120px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "flex" : "none"}} className="logo"><FaTasks/> WorkLab</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick ={toggle}/>
                   </div>
               </div>
               {/* {!localStorage.getItem("token") ? */}
               {!localStorage.getItem("token") ?
                menuItems.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" type="active">
                           <div className="icon">{item.icon}</div>
                           
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   )):
                   <button className="btn btn-dark mx-2" onClick={handleLogout} style={{}}><FaSignOutAlt/>Logout</button>

               }

           </div>
           {/* {!localStorage.getItem("token") ? menuItems.name("Login","Signup"):
    <button className="btn btn-dark mx-2" onClick={handleLogout}  ><FaSignOutAlt/> Logout</button>} */}
           <main>{children}</main>
        </div>
  )
}

export default Slidebar
