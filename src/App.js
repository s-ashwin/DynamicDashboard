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

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <AdminRoutes path="/dashboard" exact component={Dash} />
          <AdminRoutes path="/admin/create/role" exact component={CreateRole} />
          <AdminRoutes path="/admin/roles" exact component={ManageRoles} />
          <AdminRoutes path="/admin/role/update/:roleId" exact component={UpdateRole}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
