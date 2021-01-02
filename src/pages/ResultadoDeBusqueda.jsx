import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import DefaultLayout from "../layouts/DefaultLayout";
import ItemLista from "../components/ItemLista";
import urlApiMeliPath from "../config/config";
import { setParametroUrl } from "../helpers/functions";

import "../assets/css/pages/resultadoDeBusqeda.scss";
import "../assets/css/layouts/components/Breadcrumb.scss";

const ResultadoDeBusqueda = () => {
	// Q U E R Y
	const query = useParams().query.replace(/-/g, " "); //SEO detalle

	const CantidadAPedir = 10;

	const validarPedirMas = (paging) => {
		if (items.length + CantidadAPedir < paging.primary_results) {
			if (items.length === 0) {
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
		if (query === queryAnterior) {
			posicionOffser = items.length;
		} else {
			posicionOffser = 0;
		}
		const data = {
			items: `${urlApiMeliPath.pathBusqueda}${query}${setParametroUrl(
				"limit",
				CantidadAPedir
			)}${setParametroUrl("offset", posicionOffser)}`,
			categorias: `${
				urlApiMeliPath.pathCategoriasAlBusqueda
			}${query}${setParametroUrl("limit", 4)}`,
			categoriaPrincipal: `${urlApiMeliPath.pathCategoriaEspecifica}`,
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
	const [categoriasMenosLaPrimera, setCategoriasMenosLaPrimera] = useState([]);
	const [categoriaPrincipal, setCategoriaPrincipal] = useState(false);
	const [loadingCategoria, setLoadingCategoria] = useState(false);

	// R E Q U E S T

	const cargarMasItems = () => {
		fetchItems();
	};

	const fetchCategoriaPrincipal = (categoria) => {
		if (categoria) {
			const url = `${setUrlRequest().categoriaPrincipal}${
				categoria.category_id
			}`;

			setLoadingCategoria(true);

			return Axios.get(url)
				.then(function (response) {
					let data = response.data;
					setCategoriaPrincipal(data);
					setLoadingCategoria(false);
				})
				.catch(function (error) {
					setLoadingCategoria(false);
					setErrorBool(true);
					setError(error.error);
				});
		}
	};

	const fetchCategorias = () => {
		const url = setUrlRequest().categorias;

		setLoadingCategoria(true);

		return Axios.get(url)
			.then(function (response) {
				let data = response.data;
				setCategorias(data);
				setLoadingCategoria(false);
				fetchCategoriaPrincipal(data[0]);
				setCategoriasMenosLaPrimera(data.shift());
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

		return Axios.get(url.items)
			.then(function (response) {
				let data = response.data;

				if (query === queryAnterior) {
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
		fetchCategorias();
		fetchItems();
	}, [query]);

	useEffect(() => {
		if (items.length === 0) {
			setCategoriaPrincipal(categoriaPrincipal);
		}
	}, [items]);

	return (
		<DefaultLayout>
			<div className="container d-flex flex-column align-items-center">
				<div className="col col-lg-10">
					{loadingCategoria && <Skeleton count={2} />}

					{categoriaPrincipal != false && !loadingCategoria && (
						<div className="BreadcrumContainer">
							{categoriaPrincipal.path_from_root.map((categoria) => {
								return (
									<span>
										<span key={categoria.id} className="mr-2">
											<Link
												className="BreadcrumContainer-a"
												to={`/categoria/${categoria.name
													.toLowerCase()
													.replace(/,/g, "")
													.replace(/ /g, "-")}/${categoria.id}`}
											>
												{categoria.name}
											</Link>
										</span>
										<span className="mr-2"> > </span>
									</span>
								);
							})}

							{query}
						</div>
					)}
				</div>
				<div className="col col-lg-10  bg-white rounded">
					{errorBool && (
						<p className="text-center text-danger my-2 ">
							Upsssssss!! Tuvimos un error de conexión.
							<Link className="text-danger" to="/">
								Click aquí para solucionar
							</Link>
							.
						</p>
					)}
					{items.length > 0 && (
						<div className="">
							{items.map((item) => {
								return <ItemLista item={item} key={item.id} />;
							})}
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

				{!loading && items.length === 0 && (
					<div className="h3 py-5 text-center">
						Para encontrar algún producto mejorá la búsqueda acortando la frase
						😉
					</div>
				)}
				{!loading && items.length > 0 && (
					<button
						onClick={cargarMasItems}
						className="btn btn-secondary btn-lg my-5"
					>
						Cargar {CantidadAPedir} resultados más
					</button>
				)}
			</div>
		</DefaultLayout>
	);
};

export default ResultadoDeBusqueda;
