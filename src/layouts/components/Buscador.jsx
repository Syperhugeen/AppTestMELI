import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "../../assets/css/layouts/components/Buscador.scss";
import LupaX1 from "../../assets/Imagenes/Corporativas/ic_Search.png";

const Buscador = (props) => {
	const [query, setQuery] = useState("");

	const path = `/items/search/${query}`;

	let history = useHistory();

	const onClickBuscar = () => {
		if (query != "") {
			history.push(path);
		} else {
		}
	};

	return (
		<div className="col-9 col-lg-10 d-flex flex-row align-items-center">
			<input
				className="buscador-input"
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Buscar productos, marcas y más..."
			/>
			<button onClick={onClickBuscar} className="buscador-boton" type="submit">
				<img src={LupaX1} alt="Icono del buscador. Es una lupa. " />
			</button>
		</div>
	);
};

export default Buscador;
