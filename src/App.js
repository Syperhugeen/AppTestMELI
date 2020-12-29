import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/css/boostrap/customBoostrap.scss';
import Home from './pages/Home';
import ResultadosDeBusqueda from './pages/ResultadoDeBusqueda';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/items/search/:query" component={ResultadosDeBusqueda} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
