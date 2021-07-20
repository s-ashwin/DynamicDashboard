import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../core/helper/coreapicalls'
import { getCharts } from './helper/adminapicalls'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Nav from '../core/Nav'

const ManageCharts = () => {

    const [charts, setCharts] = useState([])

    const {user, token} = isAuthenticated()

    const preLoad = async()=>{
        const data = await getCharts(user._id, token)
        if(data.error){
            console.log("Fetch Charts - Failed");
        }
        else{
            setCharts(data)
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
                    {charts && charts.map((chart, index)=>(
                         <div key={index} className="col-12 col-md-4">
                         <div className="card">
                         <div className="card-body">
                             <p className="card-text my-0 fw-light">Name: <span className="float-end">{chart.name}</span></p>
                             <span className="card-text my-0 fw-light">Roles: </span>
                             {chart.roles.map((role)=>(
                                <span><span className="card-text my-0 float-end fw-bold">{role.name}</span><br></br></span>
                             ))}
                             <div className="d-grid gap-2 btn-group">
                                <Link to={`/admin/chart/update/${chart._id}`} className="btn btn-secondary mt-2" type="button">UPDATE</Link>
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

export default ManageCharts
