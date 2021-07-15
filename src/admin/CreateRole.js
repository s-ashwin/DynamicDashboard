import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../core/helper/coreapicalls'
import { FaArrowLeft } from "react-icons/fa";
import { createRole } from './helper/adminapicalls';
import { toast, ToastContainer } from 'react-toastify';
import Nav from '../core/Nav';

const CreateRole = () => {

    const [name, setName] = useState("")
    const [loading,setLoading] = useState(false)

    const {user,token} = isAuthenticated()

    const handleChange = (e)=>{
        setName(e.target.value)
    }

    const handleSubmit = async(e)=>{
        setLoading(true)
        e.preventDefault()
        const data = await createRole(user._id,token,{name})
        if(data.error){
            setLoading(false)
            toast.error(`${data.error}`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
        }
        else{
            setLoading(false)
            toast.success(`${data.name.name} - Created`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
            setName("")
        }
    }

    const goBack = ()=>{
        return(
            <div className="back">
                <Link className="btn text-secondary" to="/dashboard"><FaArrowLeft size={20}></FaArrowLeft></Link>
            </div>
        )
    }

    const RoleForm = ()=>{
        return(
            <form className="row g-3 mx-auto my-5" onSubmit={handleSubmit}>
                    {goBack()}

                    <div className="col-12 ">
                        <label htmlFor="cat" className="form-label text-secondary fw-bold">Create New Role</label>
                        <input value={name} onChange={handleChange} type="text" placeholder="Role Name" className="form-control" id="cat" required/>
                    </div>
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-success">{(loading)?(<div className="spinner-border text-light" role="status"></div>):('CREATE')}</button>
                    </div>
            </form>
            )
    }

    return (
        <div className="home">
        <Nav></Nav>
        <ToastContainer/>
        <div className="container">  
            {RoleForm()} 
        </div>
        </div>

    )
}

export default CreateRole