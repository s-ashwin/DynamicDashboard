import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from './core/Home'
import Signin from './core/Signin'
import Signup from './core/Signup'
import Dash from './admin/Dashboard'
import CreateRole from './admin/CreateRole'
import ManageRoles from './admin/ManageRoles'
import UpdateRole from './admin/UpdateRole'
import AdminRoutes from './routes/AdminRoutes';
import ManageUsers from './admin/ManageUsers';
import UpdateUser from './admin/UpdateUser';
import CreateChart from './admin/CreateChart';
import ManageCharts from './admin/ManageCharts';
import UpdateChart from './admin/UpdateChart';
import PrivateRoutes from './routes/PrivateRoutes';
import MyCharts from './core/MyCharts';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoutes path="/mycharts" exact component={MyCharts} />
          <AdminRoutes path="/dashboard" exact component={Dash} />
          <AdminRoutes path="/admin/create/role" exact component={CreateRole} />
          <AdminRoutes path="/admin/roles" exact component={ManageRoles} />
          <AdminRoutes path="/admin/role/update/:roleId" exact component={UpdateRole}/>
          <AdminRoutes path="/admin/users" exact component={ManageUsers} />
          <AdminRoutes path="/admin/user/update/:userId" exact component={UpdateUser}/>
          <AdminRoutes path="/admin/create/chart" exact component={CreateChart} />
          <AdminRoutes path="/admin/charts" exact component={ManageCharts} />
          <AdminRoutes path="/admin/chart/update/:chartId" exact component={UpdateChart} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
