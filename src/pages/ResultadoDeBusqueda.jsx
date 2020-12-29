import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import DefaultLayout from '../layouts/DefaultLayout';
import ItemLista from '../components/ItemLista';
import urlApiMeliPath from '../config/config';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import '../assets/css/pages/resultadoDeBusqeda.scss';

const ResultadoDeBusqueda = () => {
	// Q U E R Y
	const query = useParams().query.replace(/-/g, ' '); //SEO detalle

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

	const setUrlRequest = () => {
		let posicionOffser = 0;
		if (query == queryAnterior) {
			posicionOffser = items.length;
		} else {
			posicionOffser = 0;
		}
		const data = {
			items: `${urlApiMeliPath.pathBusqueda}${query}${setParametroUrl('limit', CantidadAPedir)}${setParametroUrl(
				'offset',
				posicionOffser
			)}`,
			categorias: `https://api.mercadolibre.com/sites/MLA/domain_discovery/search?q=${query}${setParametroUrl(
				'limit',
				4
			)}`
		};

		return data;
	};

	// H O O K S
	const [queryAnterior, setQueryAnterior] = useState(query);
	const [sePuedePedirResultados, setSePuedePedirResultados] = useState(true);
	const [offset, setOffset] = useState(0); // Posición de la paginación de los resultados
	const [loading, setLoading] = useState(true);

	const [error, setError] = useState(null);
	const [errorBool, setErrorBool] = useState(false);
	const [items, setItems] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [loadingCategoria, setLoadingCategoria] = useState(false);

	// R E Q U E S T

	const cargarMasItems = () => {
		fetchItems();
	};

	const fetchCategorias = () => {
		const url = setUrlRequest().categorias;
		console.log(setUrlRequest());

		setLoadingCategoria(true);

		console.log(url);
		Axios.get(url)
			.then(function (response) {
				let data = response.data;
				setCategorias(data);
				setLoadingCategoria(false);
			})
			.catch(function (error) {
				setLoadingCategoria(false);
				setErrorBool(true);
				setError(error.error);
			});
	};

	const fetchItems = () => {
		const url = setUrlRequest();
		setLoading(true);

		Axios.get(url.items)
			.then(function (response) {
				let data = response.data;

				if (query == queryAnterior) {
					setItems(items.concat(data.results));
				} else {
					setItems(data.results);
				}

				validarPedirMas(data.paging);

				setQueryAnterior(query); // -> Mejorar

				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				setErrorBool(true);
				setError(error);
			});
	};

	useEffect(() => {
		document.title = `${query}  Mercado libre`;
		fetchCategorias();
		fetchItems();
	}, [query]);

	return (
		<DefaultLayout>
			<div className="container d-flex flex-column align-items-center">
				<div className="col col-lg-10">
					{loadingCategoria && <Skeleton count={1} />}
					{categorias.length > 0 && !loadingCategoria && (
						<div className="my-2">
							{categorias.map((categoria) => {
								return <span className="mr-3">{categoria.category_name}</span>;
							})}
						</div>
					)}
				</div>
				<div className="col col-lg-10  bg-white">
					{errorBool && <p>`Error: ${error}`</p>}
					{items.length > 0 && (
						<div className="">
							{items.map((item) => {
								return <ItemLista item={item} key={item.id} />;
							})}
						</div>
					)}

					{items.length <= 0 && offset == 0 && (
						<div className="h3 py-5 text-center">
							Para encontrar algún producto mejorá la búsqueda acortando la frase 😉
						</div>
					)}
					<div id="cargarOnScroll"></div>
				</div>
				{loading && (
					<div className="col-10">
						<SkeletonTheme count={2}>
							<div className="w-100 row alig-items-center py-2">
								<div className="col-2 d-flex flex-column align-items-center justify-content-center">
									<Skeleton circle={true} height={70} width={70} />
								</div>
								<p className="col-10">
									<Skeleton count={5} />
								</p>
							</div>
						</SkeletonTheme>
					</div>
				)}
				{!loading && (
					<button onClick={cargarMasItems} className="btn btn-secondary btn-lg my-5">
						Cargar más resultados
					</button>
				)}
			</div>
		</DefaultLayout>
	);
};

export default ResultadoDeBusqueda;
