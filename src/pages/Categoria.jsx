import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DefaultLayout from "../layouts/DefaultLayout";
import ItemLista from "../components/ItemLista";
import urlApiMeliPath from "../config/config";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

import "../assets/css/pages/resultadoDeBusqeda.scss";

const Categoria = () => {
	// Q U E R Y
	const categoriaId = useParams().categoria_id.replace(/-/g, " "); //SEO detalle

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
		if (categoriaId == categoriaIdAnterior) {
			posicionOffser = items.length;
		} else {
			posicionOffser = 0;
		}
		const data = {
			items: `${
				urlApiMeliPath.pathItemsDeCategoria
			}${categoriaId}${setParametroUrl(
				"limit",
				CantidadAPedir
			)}${setParametroUrl("offset", posicionOffser)}`,
			categoria: `${urlApiMeliPath.pathCategoriaEspecifica}${categoriaId}`,
		};

		return data;
	};

	// H O O K S
	const [categoriaIdAnterior, setCategoriaIdAnterior] = useState(categoriaId);
	const [sePuedePedirResultados, setSePuedePedirResultados] = useState(true);
	const [offset, setOffset] = useState(0); // Posición de la paginación de los resultados
	const [loading, setLoading] = useState(true);

	const [error, setError] = useState(null);
	const [errorBool, setErrorBool] = useState(false);
	const [items, setItems] = useState([]);
	const [categoria, setCategoria] = useState(false);

	const [loadingCategoria, setLoadingCategoria] = useState(false);

	// R E Q U E S T

	const cargarMasItems = () => {
		fetchItems();
	};

	const fetchCategoriaPrincipal = () => {
		const url = `${setUrlRequest().categoria}`;

		setLoadingCategoria(true);

		return Axios.get(url)
			.then(function (response) {
				let data = response.data;
				setCategoria(data);
				fetchItems().then(function () {
					console.log("se piden items");
				});
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

		return Axios.get(url.items)
			.then(function (response) {
				let data = response.data;

				if (categoriaId == categoriaIdAnterior) {
					setItems(items.concat(data.results));
				} else {
					setItems(data.results);
				}

				validarPedirMas(data.paging);

				setCategoriaIdAnterior(categoriaId); // -> Mejorar

				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				setErrorBool(true);
				setError(error);
			});
	};

	useEffect(() => {
		fetchCategoriaPrincipal().then(function () {
			document.title = `${categoria.name}  Mercado libre`;
		});
	}, [categoriaId]);

	return (
		<DefaultLayout>
			<div className="container d-flex flex-column align-items-center">
				<div className="col col-lg-10">
					{loadingCategoria && <Skeleton count={1} />}
					{categoria !== false && !loadingCategoria && (
						<div>
							<div className="BreadcrumContainer">
								{categoria.path_from_root.map((categoria) => {
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
							</div>
							<h1 className="h3 BreadcrumContainer-titulo">{categoria.name}</h1>
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

				{!sePuedePedirResultados && (
					<div className="h3 py-5 text-center">
						Para encontrar algún producto mejorá la búsqueda acortando la frase
						😉
					</div>
				)}
				{!loading && sePuedePedirResultados && (
					<button
						onClick={cargarMasItems}
						className="btn btn-secondary btn-lg my-5"
					>
						Cargar más resultados
					</button>
				)}
			</div>
		</DefaultLayout>
	);
};

export default Categoria;
