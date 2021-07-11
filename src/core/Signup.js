import React, {useState} from "react"
import {Link} from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { signup } from "./helper/coreapicalls"
import Nav from "./Nav"

const Signup = () => {

    const [values,setValues] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [loading,setLoading] = useState(false)

    const handleChange = name => event => {
        setValues({...values,[name]: event.target.value})
    }

    const onSubmit = async(event) => {
        event.preventDefault()
        setLoading(true)
        const data = await signup({name:values.name, email:values.email, password:values.password })
        
        if(data.error){
            toast.error(`${data.error}`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
        }
        else{
            setLoading(false)
            toast.success(`Account Created, Sign In to Continue`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
            setValues({name:"", email: "", password: ""})
        }
        
    }

    const signUpForm = ()=>{
        return(
            <form className="row g-3 mx-auto my-5 " onSubmit={onSubmit}>
                <div className="col-12 my-1 accent">
                    <h4 className="text-center m-0 text-dark fw-light">Register</h4>
                </div>
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="name" className="form-label text-secondary fw-bold">Name</label>
                    <input value={values.name} type="text" onChange={handleChange("name")} className="form-control" id="name" required/>
                </div>
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="inputEmail4" className="form-label text-secondary fw-bold">Email</label>
                    <input value={values.email} type="email" onChange={handleChange("email")} className="form-control" id="inputEmail4" required/>
                </div>
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="inputPassword4" className="form-label text-secondary fw-bold">Password</label>
                    <input value={values.password} type="password" onChange={handleChange("password")} className="form-control" id="inputPassword4" required />
                </div>
                <div className="col-md-6 offset-md-3 mt-4">
                    <button type="submit" className="btn btn-primary w-100">{(loading)?(<div className="spinner-border text-light" role="status"></div>):('REGISTER')}</button>
                </div>
                <p className="text-center m-0 mt-4 text-secondary fw-light">Already a User ? <Link to="/signin">Login</Link></p>
            </form>
        )
    }

    return(
        <div className="home">
        <Nav></Nav>
        <ToastContainer></ToastContainer>
        <div className="container"> 
            {signUpForm()}
        </div>
        </div>
    )
}

export default Signup