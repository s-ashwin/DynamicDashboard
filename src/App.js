import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from './core/Home'
import Signin from './core/Signin'
import Signup from './core/Signup'
import Dash from './admin/Dashboard'
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <AdminRoutes path="/dashboard" exact component={Dash} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
