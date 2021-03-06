import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import { getMyCharts, isAuthenticated } from './helper/coreapicalls'
import Nav from './Nav'

const MyCharts = () => {

    const {user, token} = isAuthenticated()
    const [charts,setCharts] = useState([])
    const [isloading, setIsloading] = useState(false)

    useEffect(() => {
        const getcharts = async()=>{
            setIsloading(true)
            const data = await getMyCharts(user._id, token)
            if(data.error){
                console.log("Fetch Charts - Failed");
            }
            else{
                setCharts(data)
            }
            setIsloading(false)
        }
        getcharts()
    }, [])

    return (
        <div className="home">
            <Nav></Nav>
            {isloading?(<div className="spin text-primary spinner-grow" role="status"/>):(
                <div className="container">
                <div className="row g-3 w-100">
                    {(charts.length>0)?(
                        charts.map((chart,index)=>(
                        <div className="col-12 col-md-6 mx-auto">
                            <h6 className="fw-light text-center text-primary">{chart.name}</h6>
                            <Line key={index} data = { chart.data}/>
                        </div>
                    ))
                    ):(<h1 className="text-center fw-light">No Charts</h1>)}
                </div>
            </div>
            )}
        </div>
    )
}

export default MyCharts