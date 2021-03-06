import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "../../assets/css/layouts/components/Buscador.scss";
import LupaX1 from "../../assets/Imagenes/Corporativas/ic_Search.png";

const Buscador = (props) => {
	const [query, setQuery] = useState("");

	const path = `/items/search/${query.toLowerCase().replace(/ /g, "-")}`;

	let history = useHistory();

	const onClickBuscar = () => {
		const location = {
			pathname: path,
			state: { offset: 0 },
		};
		if (query !== "") {
			history.push(location);
		} else {
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			onClickBuscar();
		}
	};

	useEffect(() => {
		window.addEventListener("keyup", handleKeyDown);

		return () => {
			window.removeEventListener("keyup", handleKeyDown);
		};
	}, [query]);

	return (
		<div className="col-9 col-lg-10 d-flex flex-row align-items-center">
			<input
				className="buscador-input"
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Buscar productos, marcas y más..."
			/>
			<button
				onKeyDown={handleKeyDown}
				onClick={onClickBuscar}
				className="buscador-boton"
				type="submit"
			>
				<img src={LupaX1} alt="Icono del buscador. Es una lupa. " />
			</button>
		</div>
	);
};

export default Buscador;
