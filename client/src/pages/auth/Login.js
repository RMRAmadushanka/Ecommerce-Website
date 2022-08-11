import React, { useEffect, useState } from "react";
import {auth, googleAuthProvider} from '../../firebase'
import { useDispatch, useSelector } from "react-redux";
import {  signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import axios from 'axios'
import { createOrUpdateUser } from "../../publicFucntions/auth";




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  var navigate = useNavigate();
  const {user} = useSelector((state)=>({...state}))

  useEffect(()=>{
      if(user&& user.token) navigate('/')
  },[user])
  let dispatch = useDispatch()
  
const rolebaseRedirect = (res) =>{

  if(res.data.role === 'admin'){
    navigate('/admin/dashboard')
  }else{
    navigate('/user/history')
  }
}
  const handleSubmit = async (e) => {
    e.preventDefault();
setLoading(true)
    // signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //   // Signed in 
    //   const user =userCredential.user;
      
    //   const idTokenResult =  user.getIdTokenResult()
    //   dispatch({
    //     type:'LOGGED_IN_USER',
    //     payload:{
    //       email:user.email,
    //       token:userCredential.token
    //     }
    //   })
    //   navigate('/')
    // })
    // .catch((error) => {
    //   setLoading(false)
    //   console.log(error);
    //   toast.error(error.message)
    // });


    try {
     const result = await signInWithEmailAndPassword(auth,email,password)
     const {user} = result
     const idTokenResult = await user.getIdTokenResult()
    
     createOrUpdateUser(idTokenResult.token)
     .then((res)=>{
       dispatch({
         type:'LOGGED_IN_USER',
         payload:{
           name:res.data.name,
           email:res.data.email,
           token:idTokenResult.token,
           role:res.data.role,
           _id:res.data.id
         }
       })
       rolebaseRedirect(res)
      })
     .catch(err=>console.log(err))
        
   
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      setLoading(false)
    }





  };
  
  const googlelogin = async()=>{
    signInWithPopup(auth,googleAuthProvider)
    .then(async(result)=>{
      const{user} = result
      const idTokenResult = await user.getIdTokenResult()
      createOrUpdateUser(idTokenResult.token)
      .then(res=>{
        dispatch({
          type:'LOGGED_IN_USER',
          payload:{
            name:res.data.name,
            email:res.data.email,
            token:idTokenResult.token,
            role:res.data.role,
            _id:res.data.id
          }
        })
        rolebaseRedirect(res)
      })
      .catch()


      
    })
    .catch(error=>{
      console.log(error);
      toast.error(error.message)
    })
  }
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <br />
      <input
        type="email"
        className="form-control"
        value={password}
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <br />

      <button type="submit" className="btn btn-raised" onClick={handleSubmit} disabled={!email||password.length<6}>
        Login
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
         
          <ToastContainer />
          {loading ? (
            
            <h4>loading..</h4>
          ):(<h4>Login</h4>)}
          {loginForm()}

          <button type="submit" className="btn btn-raised" onClick={googlelogin}>
        Login with google
      </button>
      <Link to="/forgot/password" className="float-right">Forgot password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
