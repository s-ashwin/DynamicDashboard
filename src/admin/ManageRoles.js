import React, {useState, useEffect} from 'react'
import {MdEdit,MdDelete} from 'react-icons/md'
import { isAuthenticated } from '../core/helper/coreapicalls'
import { deleteRole, getRoles } from './helper/adminapicalls'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify';
import Nav from '../core/Nav'

const ManageRoles = () => {

    const [roles, setRoles] = useState([])

    const {user, token} = isAuthenticated()

    const preLoad = async()=>{
        const data = await getRoles(user._id, token)
        if(data.error){
            console.log("Fetch Roles - Failed");
        }
        else{
            setRoles(data)
        }
    }

    useEffect(() => {
        preLoad()
    }, [])

    const goBack = ()=>{
        return(
            <div className="back my-3">
                <Link className="btn text-secondary" to="/dashboard"><FaArrowLeft size={20}></FaArrowLeft></Link>
            </div>
        )
    }

    const handleDelete = async(roleId)=>{
        const data = await deleteRole(user._id, token, roleId)
        if(data.error){
            console.log("Delete Role - Failed");
            toast.error(`${data.error}`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
        }
        else{
            preLoad()
            toast.success(`Deleted`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
        }
    }

    return (
        <div className="home">
            <Nav/>
            <ToastContainer/>
            <div className="container my-4">
                <div className="row w-100 prod g-2 ">
                {goBack()}
                    {roles && roles.map((role, index)=>(
                         <div key={index} className="col-12 col-md-4">
                         <div className="cat card h-100">
                             <h6 className="m-0 fw-light ps-3">{role.name} </h6>
                             <div className="btn-group">
                             <Link to={`/admin/role/update/${role._id}`} className=" btn btn-warning"><MdEdit size={15} className="my-1"></MdEdit></Link>
                             <button className="btn btn-danger" onClick={()=>{handleDelete(role._id)}}><MdDelete size={15} className="my-1"></MdDelete></button>
                         </div>
                         </div>
                     </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageRoles
