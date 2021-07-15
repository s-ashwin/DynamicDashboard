import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../core/helper/coreapicalls'
import { FaAngleRight } from "react-icons/fa";
import { IoNavigateCircleOutline } from "react-icons/io5";
import {AiOutlineInfoCircle} from "react-icons/ai"
import Nav from '../core/Nav';

const Dash = ()=> {

    const {user:{name,email}} = isAuthenticated()

    const leftSide = ()=>{
        return (
            <div className="card">
                <h5 className="card-header text-dark"><IoNavigateCircleOutline size={25} className="me-1 my-1"></IoNavigateCircleOutline> Navigation </h5>
                <ul className=" left list-group">
                    <li className="list-group-item"><Link to="/admin/create/role">Create Role <FaAngleRight className="float-end my-1"></FaAngleRight></Link></li>
                    <li className="list-group-item"><Link to="/admin/roles">Manage Roles <FaAngleRight className="float-end my-1"></FaAngleRight></Link></li>
                    <li className="list-group-item"><Link to="/admin/users">Manage Users <FaAngleRight className="float-end my-1"></FaAngleRight></Link></li>
                    <li className="list-group-item"><Link to="/admin/charts">Manage Charts <FaAngleRight className="float-end my-1"></FaAngleRight></Link></li>
                    <li className="list-group-item"><Link to="/admin/create/chart">Create Chart <FaAngleRight className="float-end my-1"></FaAngleRight></Link></li>
                </ul>
            </div>
        )
    }

    const rightSide = ()=>{
        return (
            <div className="card">
                <h5 className="card-header text-dark"><AiOutlineInfoCircle size={24} className="me-1 my-1"></AiOutlineInfoCircle>Admin</h5>
                <ul className="list-group">
                    <li className="list-group-item fw-light"><b>Name{'\u00A0'} :</b> {'\u00A0'}{name}</li>
                    <li className="list-group-item fw-light"><b>Email{'\u00A0'}{'\u00A0'} :</b> {'\u00A0'}{email}</li>
                </ul>
            </div>  
        )
    }

    return (
        <div className="home">
        <Nav></Nav>
        <div className="container p-3">
            <div className="row g-3 w-100">
                <div className="col-lg-3 offset-lg-2">
                    {leftSide()}
                </div>
                <div className="col-lg-5">
                    {rightSide()}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Dash
