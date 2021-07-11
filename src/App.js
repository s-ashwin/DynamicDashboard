import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from './core/Home'
import Signin from './core/Signin'
import Signup from './core/Signup'

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
