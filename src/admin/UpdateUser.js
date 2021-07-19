import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { isAuthenticated } from '../core/helper/coreapicalls';
import { getRoles, getUser, updateUser } from './helper/adminapicalls';
import Nav from '../core/Nav';

const UpdateUser = ({match}) => {
    const [person, setPerson] = useState({})
    const [options, setOptions] = useState([])
    const [role, setRole] = useState("")
    const [loading,setLoading] = useState(false)

    const {user,token} = isAuthenticated()

    const handleChange=(e)=>{
        setRole(e.target.value)
    }

    const handleSubmit = async(e)=>{
        setLoading(true)
        e.preventDefault()
        const data = await updateUser(user._id,token,match.params.userId,role)
        if(data.error){
            setLoading(false)
            toast.error(`${data.error}`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
        }
        else{
            setLoading(false)
            toast.success(`Updated`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
            preLoad(match.params.userId)
        }
    }

    const preLoad = async(id)=>{
        const data = await getUser(user._id, token, id)
        if(data.error){
            console.log(data.error);
            console.log("Fetch User - Failed");
        }
        else{
            setPerson(data)
        }
    }

    const preLoadRoles = async()=>{
        const data = await getRoles(user._id, token)
        if(data.error){
            console.log(data.error);
            console.log("Fetch Roles - Failed");
        }
        else{
            setOptions(data)
        }
    }

    useEffect(() => {
        preLoad(match.params.userId)
        preLoadRoles()
    }, [])

    const goBack = ()=>{
        return(
            <div className="back">
                <Link className="btn text-secondary" to="/admin/users"><FaArrowLeft size={20}></FaArrowLeft></Link>
            </div>
        )
    }

    return (
        <div className="home">
        <Nav></Nav>
        <ToastContainer/>
        <div className="container ">
            <form className="row g-3 mx-auto my-5" onSubmit={handleSubmit}>
                    {goBack()}

                    <div className="card h-100 w-100">
                         
                         <div className="card-body">  
                             <p className="card-text my-0 fw-light">Name: <span className="float-end">{person.name}</span></p>
                             <p className="card-text my-0 fw-light">Email: <span className="float-end">{person.email}</span></p>
                             {(person.role)?(
                                <p className="card-text my-0 fw-light">Role: <span className="float-end fw-bold text-success">{person.role.name}</span></p> 
                             ):(
                                <p className="card-text my-0 fw-light">Role: <span className="float-end fw-bold text-danger">Unassigned</span></p> 
                             )}
                             <div className="form-group">
                                <label htmlFor="cat" className="form-label mt-2 text-dark fw-bold">Update Role</label>
                                <select
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Role"
                                required
                                >
                                <option disabled selected>Select Role</option>
                                {options && options.map((data, index)=>(
                                    <option key={index} value={data._id}>{data.name}</option>
                                ))}
                                </select>
                             </div>
                        </div>
                         </div>
                    <div className="col-12 mt-2 p-0">
                        <button type="submit" className="btn btn-success w-100">{(loading)?(<div className="spinner-border text-light" role="status"></div>):('UPDATE')}</button>
                    </div>
            </form>
        </div>
        </div>
    )
}

export default UpdateUser
