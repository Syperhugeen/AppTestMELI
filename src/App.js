import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./assets/css/boostrap/customBoostrap.scss";
import Home from "./pages/Home";
import ResultadosDeBusqueda from "./pages/ResultadoDeBusqueda";
import Categoria from "./pages/Categoria";
import Item from "./pages/Item";

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route
					exact
					path="/items/search/:query"
					component={ResultadosDeBusqueda}
				/>
				<Route
					exact
					path="/categoria/:categoria_name/:categoria_id"
					component={Categoria}
				/>
				<Route exact path="/item/:item_name/:item_id" component={Item} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
