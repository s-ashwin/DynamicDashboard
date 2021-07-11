import React from 'react'
import { Route, Redirect} from "react-router-dom"
import { isAuthenticated } from '../core/helper/coreapicalls'

const AdminRoutes = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={ props => 
                (isAuthenticated() && isAuthenticated().user.role && isAuthenticated().user.role.name === "Admin") ? (<Component {...props} />):(<Redirect to={{pathname:"/signin",state:{from: props.location}}}/>)
            }
        />
    )
}

export default AdminRoutes