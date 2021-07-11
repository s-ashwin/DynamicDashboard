import React from 'react'
import {Link, useHistory} from "react-router-dom"
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineLogin, AiOutlinePieChart } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { isAuthenticated, signout } from './helper/coreapicalls';

const Nav = () => {
    const history = useHistory();
    return (
        <nav className="navbar navbar-light navbar-expand-lg">
            <div className="container">
                <Link to="/" className="navbar-brand text-primary" >
                    Dynamic dashboard
                </Link>
                   
                    <ul className="navbar-nav ">
                       <li className="nav-item dropdown">
                            <Link className="nav-link " id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaUserAlt size={20}></FaUserAlt>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarScrollingDropdown">
                                {isAuthenticated() && (<li><Link to="/mycharts" className="dropdown-item fw-light"><AiOutlinePieChart className="me-1"></AiOutlinePieChart>My Charts</Link></li>)}
                                {isAuthenticated() && isAuthenticated().user.role.name === "Admin" && (<li><Link to="/dashboard" className="dropdown-item fw-light"><RiDashboardLine className="me-1"></RiDashboardLine>Dashboard</Link></li>)}
                                {(!isAuthenticated())&&(<li><Link to="/signin" className="dropdown-item fw-light" ><AiOutlineLogin className="me-1"></AiOutlineLogin>Sign In</Link></li>)}
                                {(!isAuthenticated())&&(<li><Link to="/signup" className="dropdown-item fw-light" ><AiOutlineLogin className="me-1"></AiOutlineLogin>Sign Up</Link></li>)}
                                {(isAuthenticated())&&(<li><Link className="dropdown-item fw-light" onClick={()=>{
                                    signout(()=>{
                                        history.push("/")
                                    })
                                }} ><AiOutlineLogout className="me-1"></AiOutlineLogout>Sign Out</Link></li>)}
                            </ul>
                        </li>
                    </ul>
                   
            </div>
            </nav>
    )
}

export default Nav