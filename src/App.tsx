import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import Dashboard from './componentes/dashboard';
import Login from './componentes/login';

const PrivateRoute = ({ component: Component, ...rest }:any) => {
	const isAuth = useAppSelector((state) => state.auth);
	return (
		<Route
			{...rest}
			render={props =>
				isAuth ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
				)
			}
		/>
	);
}

const App = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <PrivateRoute path="/dashboard" component={Dashboard}/>
		      <Route exact path="/"><Redirect to="dashboard"/></Route>
          <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
  );
}

export default App;
