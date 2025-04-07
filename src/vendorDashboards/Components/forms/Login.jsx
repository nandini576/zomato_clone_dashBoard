import React,{useState} from 'react'
import {API_URL} from '../../Data/apiPah'
const Login = ({showWelcomeHandler}) => {
  const [error, setError] = useState("");
 const [email,setEmail]=useState("") //empty value, state name should match with name attribute of forms
 const [password,setPassword]=useState("")

//  const [error,setError]=useState()
//  const [loading,setLoading]=useState(true)

 const handleSubmit = async(event)=>{//here async doesnt have req,res as we are in frontend
  event.preventDefault(); //prevents page refreshing after submission
 
  try{
        console.log("Form data:", {email, password});
  
        const response = await fetch(`${API_URL}/vendor/login`,{// `${API_URL}/vendor/register` end point for register
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password })
        });
        const data =await response.json() //assiging response to the data in the form of json
        if(response.ok){
          console.log(data);
          localStorage.setItem("loginToken",data.token)//setItem() gives a name for key in localstorage
          //after submitting form fields empty
          setEmail("");
          setPassword("");
          alert("vendor Login succefully");
          showWelcomeHandler()
        }
        else{
          setError(data.message || "Login failed");
          alert(data.message || "Invalid credentials");
        }
       } 
       catch (error) {
        console.log(error);
        alert("failed login") 
      }
    };

  return (
    <div className='loginSection'>
        <h3>Vendor Login</h3>
        <form className='authForm' onSubmit={handleSubmit}>

          <div className='innerAuth'>
            <label>Email:</label>
             <input type="email" name="email" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email...'/> {/* data passed to setEmail on change through this event */}
          </div>
          <div className='innerAuth'>
            <label>Password:</label>
            <input type="password"  name="password" value={password}  onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Password...'/>
          </div>
          <div className='innerAuth'>
            <div></div>
            <button type='submit'>Submit</button>
          </div>

        </form>
      
    </div>
  )
}

export default Login
