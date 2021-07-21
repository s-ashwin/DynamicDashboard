import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../core/helper/coreapicalls'
import { getUsers } from './helper/adminapicalls'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Nav from '../core/Nav'

const ManageUsers = () => {

    const [users, setUsers] = useState([])

    const {user, token} = isAuthenticated()

    const preLoad = async()=>{
        const data = await getUsers(user._id, token)
        if(data.error){
            console.log("Fetch Users - Failed");
        }
        else{
            console.log(data);
            setUsers(data)
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

    return (
        <div className="home">
            <Nav/>
            <div className="container my-4">
                <div className="row g-2 w-100">
                {goBack()}
                    {users && users.map((user, index)=>(
                         <div key={index} className="col-12 col-md-4">
                         <div className="card">
                         <div className="card-body">
                             <p className="card-text my-0 fw-light">Name: <span className="float-end">{user.name}</span></p>
                             <p className="card-text my-0 fw-light">Email: <span className="float-end">{user.email}</span></p>
                             {user.role?(
                                <p className="card-text my-0 fw-light">Role: <span className="float-end fw-bold text-success">{user.role.name}</span></p>
                             ):(
                                <p className="card-text my-0 fw-light">Role: <span className="float-end fw-bold text-danger">Unassigned</span></p>
                             )}
                             <div className="d-grid gap-2">
                                <Link to={`/admin/user/update/${user._id}`} className="btn btn-secondary mt-2" type="button">UPDATE</Link>
                             </div>                         
                        </div>
                         </div>
                     </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageUsers
