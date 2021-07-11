import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import { authenticate, isAuthenticated, signin } from "./helper/coreapicalls"
import { toast, ToastContainer } from "react-toastify"
import Nav from "./Nav"

const Signin = () => {

    const history = useHistory();

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading,setLoading] = useState(false)

    const redirect = (user)=>{
        if (user && user.role.name==="Admin") {
            return history.push("/dashboard")
        }
        else{
            return history.push("/mycharts")
        }
    }

    const handleChangemail = event => {
        setEmail(event.target.value)
    }
    const handleChangepass = event => {
        setPassword(event.target.value)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        const data = await signin({email:email, password:password})
        
        if(data.error){
            toast.error(`${data.error}`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
            setEmail("")
            setPassword("")
            setLoading(false)
        }
        else{
            try{
                authenticate(data,()=>{
                    const {user} = isAuthenticated() 
                    if (user) {
                        setEmail("")
                        setPassword("")
                        setLoading(false)
                        redirect(user)
                    }
                    else{
                        console.log("err");
                    } 
                })
            }
            catch{
                toast.error(`Authentication Failed`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
                setEmail("")
                setPassword("")  
                setLoading(false)  
            }
        }
    }

    const signInForm = ()=>{

        return(
            <form className="row g-3 mx-auto my-5" onSubmit={handleSubmit}>
                <div className="col-12 my-1 accent">
                    <h4 className="text-center m-0 text-dark fw-light">Sign In</h4>
                </div>
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="inputEmail4" className="form-label text-secondary fw-bold">Email</label>
                    <input type="email" value={email} onChange={handleChangemail} className="form-control" id="inputEmail4" required/>
                </div>
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="inputPassword4" className="form-label text-secondary fw-bold">Password</label>
                    <input type="password" value={password} onChange={handleChangepass} className="form-control" id="inputPassword4" required/>
                </div>
                <div className="col-md-6 offset-md-3 mt-4">
                    <button type="submit" className="btn btn-primary w-100">{(loading)?(<div className="spinner-border text-light" role="status"></div>):('PROCEED')}</button>
                </div>
                <p className="text-center m-0 mt-4 text-secondary fw-light">New User ? <Link to="/signup">Create Account</Link></p>
            </form>
        )
    }

    return(
        <div className="home">
        <Nav></Nav>
        <ToastContainer/>
        <div className="container"> 
            {signInForm()}
        </div>
        </div>
    )   
}

export default Signin