import React, { createContext ,useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
// import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import About from "./components/About";
import Slidebar from "./components/Slidebar/Slidebar";
import "./App.css"
import EmailVerify from "./components/EmailVerify";
import Forgetpassword from "./components/Forgetpassword";
import Resetpassword from "./components/Resetpassword";
import VerifyLogin from "./components/VerifyLogin";

const contextData=createContext()

const App = () => {
//

  const info=[]
const [details, setDetails] = useState(info)
const ResetPassword=async()=>{
  const response = await fetch(`${process.env.REACT_APP_BASE_URI}/resetpassword`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "auth-token":localStorage.getItem("token"),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await response.json();
  console.log(json);
}

const FetchAllTask=async()=>{
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URI}/userinfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    console.log(json);
    setDetails(json);
  } catch (error) {
    console.log(error)
  }
}
const AddAllTask=async(title,description,task)=>{
  try {
    const data=await fetch(`${process.env.REACT_APP_BASE_URI}/Addwork`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({title,description,task})
    })
    const jsondata=await data.json()
    console.log(jsondata)
    //adding next work 
    setDetails(details.concat(jsondata))
  } catch (error) {
    console.log(error)
  }
}
const UpdateAllTask=async(id,title,description,task)=>{
  try {
    const data=await fetch(`${process.env.REACT_APP_BASE_URI}/update/${id}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({title,description,task})
    })
    const jsondata=await data.json()
    console.log(jsondata)
    //create a work for update
let newWork= JSON.parse(JSON.stringify(details));
for (let index = 0; index < newWork.length; index++) {
  const element = newWork[index];
  if (element._id === id) {
    newWork[index].title = title;
    newWork[index].description = description;
    newWork[index].task = task;
    break;
  }
}
setDetails(newWork);

  } catch (error) {
    console.log(error)
  }
}
const DeleteAllTask=async(id)=>{
  try {
    const data=await fetch(`${process.env.REACT_APP_BASE_URI}/delete/${id}`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const jsondata=await data.json()
    console.log(jsondata)
    console.log("deleted itmes " + id);

    const items =details.filter((element) => {
      return element._id !== id;
    });
    setDetails(items);
  } catch (error) {
    console.log(error)
  }
}

  return (
    <>
<contextData.Provider value={{details,setDetails,FetchAllTask,AddAllTask,UpdateAllTask,DeleteAllTask,ResetPassword}}>
      <Router>
     <Slidebar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/verify/:token" element={<EmailVerify/>} />
          <Route exact path="/forgetpassword" element={<Forgetpassword/>} />
          <Route exact path="/resetpassword/:id/:token" element={<Resetpassword/>} />
          <Route exact path="/verifyLogin" element={<VerifyLogin/>} />
        </Routes>
        </Slidebar>  
      </Router>
</contextData.Provider>
    </>
  );
};

export default App;
export {contextData}