import React,{useState} from 'react'
import NavBar from '../Components/NavBar'
import SideBar from '../Components/SideBar'
import Login from '../Components/forms/Login'
import Register from '../Components/forms/Register'
import AddFirms from '../Components/forms/AddFirms'
import AddProducts from '../Components/forms/AddProducts'
import Welcome from '../Components/Welcome'
const LandingPage = () => {
   const [showLogin,SetShowLogin] = useState(false)

   const [showRegister,SetShowRegister]=useState(false)

   const [showAddFirm,SetshowAddFirm]=useState(false)

   const [showAddProducts,SetshowAddProducts]=useState(false)

   const [showWelcome,SetshowWelcome]=useState(false)

   const showLoginHandler = ()=>{
    SetShowLogin(true)
    SetShowRegister(false)
    SetshowAddFirm(false)
    SetshowAddProducts(false)
    SetshowWelcome(false)
   }

   const showRegisterHandler = ()=>{
    SetShowRegister(true)
    SetShowLogin(false)
    SetshowAddFirm(false)
    SetshowAddProducts(false)
    SetshowWelcome(false)
   }

   const showAddFirmHandler = ()=>{
    SetshowAddFirm(true)
    SetShowRegister(false)
    SetShowLogin(false)
    SetshowAddProducts(false)
    SetshowWelcome(false)
   }
   
   const showAddProductsHandler = ()=>{
    SetshowAddProducts(true)
    SetshowAddFirm(false)
    SetShowRegister(false)
    SetShowLogin(false)
    SetshowWelcome(false)
   }
  
   const showWelcomeHandler = ()=>{
    SetshowWelcome(true)
    SetshowAddProducts(false)
    SetshowAddFirm(false)
    SetShowRegister(false)
    SetShowLogin(false)
   }

  return (
    <div>
      <section className='landingSection'>
       <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}/>
       <div className="collectionSection"> 
         <SideBar showAddFirmHandler={showAddFirmHandler} showAddProductsHandler={showAddProductsHandler}/>
         {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
         {showRegister && <Register showLoginHandler={showLoginHandler}/>}
         {showAddFirm && <AddFirms/>}
         {showAddProducts && <AddProducts/>}
         {showWelcome && <Welcome/>}
      </div>
       
      </section>
    </div>
  )
}

export default LandingPage
