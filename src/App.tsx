import { useEffect } from 'react';
import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Dashboard from './componentes/dashboard';
import Login from './componentes/login';
import { getUser } from './componentes/login/fetch';

const PrivateRoute = ({ component: Component, ...rest }:any) => {
	const authUser = useAppSelector((state) => state.authUser);
	const isUserLogadoReload = (props : any) =>{
		const token = localStorage.getItem("token");
		if(token){
			return <Component {...props} />
		}
		else{
			return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
		}
	}

	return (
		<Route
			{...rest}
			render={props =>
				authUser ? (
					<Component {...props} />
				) : (
					 isUserLogadoReload(props)
				)
			}
		/>
	);
}

const App = () => {
	const token = localStorage.getItem("token");
	const dispatch = useAppDispatch();
	useEffect(() =>{
		if(token){
			dispatch(getUser())
		}
	},[dispatch]);
	
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
