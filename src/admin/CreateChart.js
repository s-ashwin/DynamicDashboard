import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../core/helper/coreapicalls'
import { FaArrowLeft } from "react-icons/fa";
import { createChart, getData, getRoles } from './helper/adminapicalls';
import { toast, ToastContainer } from 'react-toastify';
import Nav from '../core/Nav';

const CreateChart = () => {

    const [name, setName] = useState("")
    const [label, setLabel] = useState("")
    const [url, setUrl] = useState("")
    const [roles, setRoles] = useState([])
    const [chartrole, setChartrole] = useState([])
    const [loading,setLoading] = useState(false)

    const {user,token} = isAuthenticated()

    const handleName = (e)=>{
        setName(e.target.value)
    }
    const handleLabel = (e)=>{
        setLabel(e.target.value)
    }
    const handleUrl = (e)=>{
        setUrl(e.target.value)
    }
    const handlerole = (e)=>{
        if(e.target.checked){
            setChartrole([...chartrole,e.target.value])
        }
        else{
            setChartrole(chartrole.filter(x => x !== e.target.value))
        }
    }

    useEffect(() => {
        const preLoad = async()=>{
            const data = await getRoles(user._id, token)
            if(data.error){
                console.log("Fetch Roles - Failed");
            }
            else{
                setRoles(data)
            }
        }
        preLoad()
    }, [])

    const handleSubmit = async(e)=>{
        setLoading(true)
        e.preventDefault()
        const chartdata = await getData(url)
        const val = {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [
                {
                    label: label,
                    data: chartdata
                }
            ]
        }
        const data = await createChart(user._id,token,{name:name,data:val,url:url,roles:chartrole})
        if(data.error){
            setLoading(false)
            toast.error(`${data.error}`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
        }
        else{
            setLoading(false)
            toast.success(`${data.chart.name} - Created`,{hideProgressBar:true,position: toast.POSITION.TOP_CENTER, autoClose: 2000})
        }
    }

    const goBack = ()=>{
        return(
            <div className="back">
                <Link className="btn text-secondary" to="/dashboard"><FaArrowLeft size={20}></FaArrowLeft></Link>
            </div>
        )
    }

    const ChartForm = ()=>{
        return(
            <form className="row g-3 mx-auto my-5" onSubmit={handleSubmit}>
                    {goBack()}

                    <div className="col-md-6 offset-md-3 ">
                        <label htmlFor="chartname" className="form-label text-secondary fw-bold">Create New Chart</label>
                        <input value={name} onChange={handleName} type="text" placeholder="Chart Name" className="form-control" id="chartname" required/>
                    </div>
                    <div className="col-md-6 offset-md-3 ">
                        <input value={url} onChange={handleUrl} type="url" placeholder="API URL" className="form-control" id="api" required/>
                        <div id="Help" class="form-text">API response should be in the format of an array. Eg: [data1, data2, ...]</div>
                    </div>
                    <div className="col-md-6 offset-md-3 ">
                        <input value={label} onChange={handleLabel} type="text" placeholder="Label" className="form-control" id="lab" required/>
                    </div>
                    <div className="col-md-6 offset-md-3 ">
                        <label htmlFor="chartname" className="form-label text-secondary fw-bold">Publish to</label>
                        {roles.map((role,index)=>(
                            <div class="form-check" key={index} onChange={handlerole}>
                            <input class="form-check-input" type="checkbox" value={role._id}/>
                            <label class="form-check-label" for="flexCheckDefault">
                               {role.name}
                            </label>
                        </div>
                        ))}
                    </div>
                    <div className="col-md-6 offset-md-3 mt-4">
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
            {ChartForm()} 
        </div>
        </div>

    )
}

export default CreateChart