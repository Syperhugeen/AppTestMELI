import React, { useState, useEffect } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import ItemLista from "../components/ItemLista";
import urlApiMeliPath from "../config/config";
import { useParams } from "react-router-dom";

import "../assets/css/pages/resultadoDeBusqeda.scss";

const ResultadoDeBusqueda = () => {
	// Q U E R Y
	const { query } = useParams();

	const CantidadAPedir = 10;

	// H E L P E R S
	const setParametroUrl = (parametro, valor) => {
		return `&${parametro}=${valor}`;
	};

	const validarPedirMas = (paging) => {
		console.log(items.length, CantidadAPedir, paging.primary_results);
		if (items.length + CantidadAPedir < paging.primary_results) {
		} else {
			setSePuedePedirResultados(false);
		}
	};

	const setUrlRequest = () => {
		return `${urlApiMeliPath.pathBusqueda}${query}${setParametroUrl(
			"limit",
			CantidadAPedir
		)}${setParametroUrl("offset", offset)}`;
	};

	// H O O K S
	const [queryAnterior, setQueryAnterior] = useState(query);
	const [sePuedePedirResultados, setSePuedePedirResultados] = useState(true);
	const [offset, setOffset] = useState(0); // Posición de la paginación de los resultados
	const [loading, setLoading] = useState(false);
	const [valor, setValor] = useState(0);
	const [error, setError] = useState(null);
	const [errorBool, setErrorBool] = useState(false);
	const [items, setItems] = useState([]);

	// R E Q U E S T
	const fetchItems = async () => {
		const url = setUrlRequest();

		try {
			setLoading(true);
			const response = await fetch(url);

			if (!response.ok) {
				setLoading(false);
				setErrorBool(true);
			} else {
				const data = await response.json();

				console.log(offset);
				let cuenta = offset + CantidadAPedir;
				setOffset(cuenta);

				if (query == queryAnterior) {
					setItems(items.concat(data.results));
				} else {
					setItems(data.results);
				}

				setValor(valor + 1);

				validarPedirMas(data.paging);

				setQueryAnterior(query); // -> Mejorar

				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			setErrorBool(true);
			setError(error);
		}
	};

	useEffect(() => {
		fetchItems();
	}, [query]);

	return (
		<DefaultLayout>
			<div className="col-12 col-lg-10 p-2 bg-white">
				{errorBool && <p>`Error: ${error}`</p>}
				{items.length > 0 && (
					<div>
						{items.map((item) => {
							return <ItemLista item={item} key={item.id} />;
						})}
					</div>
				)}

				<div onClick={fetchItems} className="btn">
					Cargas más
				</div>

				{loading && <p>Loading...</p>}
			</div>
		</DefaultLayout>
	);
};

export default ResultadoDeBusqueda;
