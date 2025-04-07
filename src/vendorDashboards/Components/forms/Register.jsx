import React,{ useState } from 'react'
import {API_URL} from '../../Data/apiPah'
const Register = ({showLoginHandler}) => {
  const [username,setUserName]=useState("")//empty value, state name should match with name attribute of forms
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState()//showing error
  const [loading,setLoading]=useState(true)
  
  const handleSubmit = async(event)=>{//here async doesnt have req,res as we are in frontend
    event.preventDefault(); //prevents page refreshing after submission


    try{
      console.log("Form data:", { username, email, password });

      const response = await fetch(`${API_URL}/vendor/register`,{// `${API_URL}/vendor/register` end point for register
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  vendorName: username, email, password })
      })
      const data =await response.json() //assiging response to the data in the form of json
      if(response.ok){
        console.log(data);
        //after submitting form fields empty
        setUserName("");
        setEmail("");
        setPassword("");
        alert("vendor registered succefully");
        showLoginHandler()//showing  loginpage whenever register success
      }
     } 
     catch (error) {
      console.log("registration failed");
      alert("failed registration") 
    }
  }
  return (
    <div className='registerSection'>
        <h3>Vendor Register</h3>
        <form className='authForm' onSubmit={handleSubmit}>

        <div className='innerAuth'>
            <label>UserName:</label>
             <input type="text" name="username" value={username}  onChange={(e)=>setUserName(e.target.value)} placeholder='Enter User Name...'/>
          </div>

          <div className='innerAuth'>
            <label>Email:</label>
             <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email...'/>
          </div>
          <div className='innerAuth'>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Password...'/>
          </div>
          <div className='innerAuth'>
            <div></div>
            <button type='submit'>Submit</button>
          </div>

        </form>
      
    </div>
  )
}

export default Register//when ever we use export with  default keyword no need to give curlybraces when ever we import it
