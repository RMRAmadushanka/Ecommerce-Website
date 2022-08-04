import React, { useEffect, useState } from "react";
import {auth, googleAuthProvider} from '../../firebase'
import { useDispatch,useSelector } from "react-redux";
import {  sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";




const ForgotPassword = () => {
    const [email,setEmail] = useState('')
    const[loading,setLoading] = useState(false)
    const navigate = useNavigate()
        const {user} = useSelector((state)=>({...state}))

        useEffect(()=>{
            if(user&& user.token) navigate('/')
        },[user])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true)

        const config = {
            url: "http://localhost:3000/login",
            handleCodeInApp: true,
          };

        await sendPasswordResetEmail(auth,email,config)
        .then(()=>{
            setEmail('')
            setLoading(false)
            toast.success('Check your email for reset password ')
        }).catch((error)=>{
                setLoading(false)
                toast.error(error.message)
        })
    }

  return (
    <div className="container col-md-6 offset-md-3 p-5">
       {loading ? (<h4>Loading..</h4>):(<h4>Forgot Password</h4>)}
       <ToastContainer/>
       <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" autoFocus/>
        <br></br>
        <button className="btn btn-raised" disabled={!email}>Submit</button>
       </form>
    </div>
  )
}

export default ForgotPassword