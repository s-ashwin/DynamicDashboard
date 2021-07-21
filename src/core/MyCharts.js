import React, {useState, useEffect} from 'react'
import { Line, Bar } from 'react-chartjs-2';
import { getMyCharts, isAuthenticated } from './helper/coreapicalls'
import Nav from './Nav'

const MyCharts = () => {

    const {user, token} = isAuthenticated()
    const [charts,setCharts] = useState([])

    useEffect(() => {
        const getcharts = async()=>{
            const data = await getMyCharts(user._id, token)
            if(data.error){
                console.log("Fetch Users - Failed");
            }
            else{
                setCharts(data)
            }
        }
        getcharts()
    }, [])

    return (
        <div className="home">
            <Nav></Nav>
            <div className="container">
                <div className="row g-3 w-100">
                    {charts.map((chart,index)=>(
                        <div className="col-12 col-md-6 mx-auto">
                            <h6 className="fw-light text-center text-primary">{chart.name}</h6>
                            <Line key={index} data = { chart.data}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyCharts