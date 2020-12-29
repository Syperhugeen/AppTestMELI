import React, { useState, useEffect, useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DefaultLayout from "../layouts/DefaultLayout";
import ItemLista from "../components/ItemLista";
import urlApiMeliPath from "../config/config";
import { useParams } from "react-router-dom";

import "../assets/css/pages/resultadoDeBusqeda.scss";

const ResultadoDeBusqueda = () => {
	const prevScrollY = useRef(0);
	const [goingDown, setGoingDown] = useState(false);
	// Q U E R Y
	const query = useParams().query.replace(/-/g, " "); //SEO detalle

	const CantidadAPedir = 10;

	// H E L P E R S
	const setParametroUrl = (parametro, valor) => {
		return `&${parametro}=${valor}`;
	};

	const validarPedirMas = (paging) => {
		if (items.length + CantidadAPedir < paging.primary_results) {
			if (items.length == 0) {
				setOffset(CantidadAPedir);
			} else {
				setOffset(CantidadAPedir + offset);
			}
		} else {
			setSePuedePedirResultados(false);
		}
	};

	const clearAlCambiarLaQuery = () => {
		setOffset(0);
		setCantidadDePeticiones(0);
		setSePuedePedirResultados(true);
		setError(null);
		setErrorBool(false);
	};

	const setUrlRequest = () => {
		let posicionOffser = 0;
		if (query == queryAnterior) {
			posicionOffser = items.length;
		} else {
			posicionOffser = 0;
		}
		return `${urlApiMeliPath.pathBusqueda}${query}${setParametroUrl(
			"limit",
			CantidadAPedir
		)}${setParametroUrl("offset", posicionOffser)}`;
	};

	const handerScroll = () => {
		console.log("scroll");
	};

	// H O O K S
	const [queryAnterior, setQueryAnterior] = useState(query);
	const [sePuedePedirResultados, setSePuedePedirResultados] = useState(true);
	const [offset, setOffset] = useState(0); // Posición de la paginación de los resultados
	const [loading, setLoading] = useState(false);
	const [cantidadDePeticiones, setCantidadDePeticiones] = useState(0);
	const [error, setError] = useState(null);
	const [errorBool, setErrorBool] = useState(false);
	const [items, setItems] = useState([]);
	const [categorias, setCategorias] = useState([]);

	// R E Q U E S T

	const cargarMasItems = () => {
		fetchItems();
	};

	const fetchCategorias = () => {
		alert(`et ${offset}`);
	};

	const fetchItems = async () => {
		var url = setUrlRequest();

		try {
			setLoading(true);
			const response = await fetch(url);
			const data = await response.json();

			if (query == queryAnterior) {
				setItems(items.concat(data.results));
			} else {
				setItems(data.results);
			}

			validarPedirMas(data.paging);

			setQueryAnterior(query); // -> Mejorar

			setLoading(false);
		} catch (error) {
			setLoading(false);
			setErrorBool(true);
			setError(error);
		}
	};

	useEffect(() => {
		document.title = `${query}  Mercado libre`;

		fetchItems();
	}, [query]);

	useEffect(() => {
		const handleScroll = () => {
			console.log(loading);
			if (loading) {
				return "";
			}

			const currentScrollY = window.scrollY;
			if (prevScrollY.current > currentScrollY && goingDown) {
				setGoingDown(false);
			}
			if (prevScrollY.current < currentScrollY && !goingDown) {
				setGoingDown(true);
			}

			let scroll_top = document.documentElement.scrollTop;

			const bodyRect = document.body.getBoundingClientRect();

			const elemRect1 = document
				.getElementById("cargarOnScroll")
				.getBoundingClientRect();
			const offset1 = elemRect1.top - bodyRect.top;

			let bottomOfWindow = currentScrollY + window.innerHeight + 50 >= offset1;
			if (bottomOfWindow) {
				if (!loading) {
					fetchItems();
					window.removeEventListener("scroll", handleScroll);
				} else {
					window.addEventListener("scroll", handleScroll, { passive: true });
				}
			}

			prevScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [goingDown]);

	return (
		<DefaultLayout>
			<div className="container d-flex flex-column align-items-center">
				<div>Cargas más offset {offset}</div>
				<div className="col col-lg-10  bg-white">
					{errorBool && <p>`Error: ${error}`</p>}
					{items.length > 0 && (
						<div className="mb-4">
							{items.map((item) => {
								return <ItemLista item={item} key={item.id} />;
							})}
						</div>
					)}

					{items.length <= 0 && cantidadDePeticiones == 1 && (
						<div className="h3 py-5 text-center">
							Para encontrar algún producto mejorá la búsqueda acortando la
							frase 😉
						</div>
					)}

					{!loading && (
						<div onClick={cargarMasItems} className="btn">
							Cargas más offset {offset}
						</div>
					)}

					<div id="cargarOnScroll"></div>

					{loading && (
						<SkeletonTheme>
							<div className="w-100 row alig-items-center py-2">
								<div className="col-2 d-flex flex-column align-items-center justify-content-center">
									<Skeleton circle={true} height={70} width={70} />
								</div>
								<p className="col-10">
									<Skeleton count={3} />
								</p>
							</div>
						</SkeletonTheme>
					)}
				</div>
			</div>
		</DefaultLayout>
	);
};

export default ResultadoDeBusqueda;
