import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../core/helper/coreapicalls'
import { FaArrowLeft } from "react-icons/fa";
import { getRole, updateRole } from './helper/adminapicalls';
import { toast, ToastContainer } from 'react-toastify';
import Nav from '../core/Nav';

const UpdateRole = ({match}) => {

    const [name, setName] = useState("")
    const [loading,setLoading] = useState(false)

    const {user,token} = isAuthenticated()

    const handleChange = (e)=>{
        setName(e.target.value)
    }

    const handleSubmit = async(e)=>{
        setLoading(true)
        e.preventDefault()
        const data = await updateRole(user._id,token,match.params.roleId, {name})
        if(data.error){
            setLoading(false)
            toast.error(`${data.error}`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
        }
        else{
            setLoading(false)
            toast.success(`${data.name} - Updated`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
        }
    }

    const preLoad = async(roleId)=>{
        const data = await getRole(user._id, token, roleId)
        if(data.error){
            console.log("Fetch Role - Failed");
        }
        else{
            setName(data.name)
        }
    }

    useEffect(() => {
        preLoad(match.params.roleId)
    }, [])

    const goBack = ()=>{
        return(
            <div className="back">
                <Link className="btn text-secondary" to="/dashboard"><FaArrowLeft size={20}></FaArrowLeft></Link>
            </div>
        )
    }

    const roleForm = ()=>{
        return(
            <form className="row g-3 mx-auto my-5" onSubmit={handleSubmit}>
                    {goBack()}

                    <div className="col-12 ">
                        <label htmlFor="cat" className="form-label text-secondary fw-bold">Update Role</label>
                        <input value={name} onChange={handleChange} type="text" placeholder="Role Name" className="form-control" id="cat" required/>
                    </div>
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-success">{(loading)?(<div className="spinner-border text-light" role="status"></div>):('UPDATE')}</button>
                    </div>
            </form>
            )
    }

    return (
        <div className="home">
        <Nav/>
        <ToastContainer/>
        <div className="container">           
                {roleForm()}
        </div>
        </div>
    )
}

export default UpdateRole